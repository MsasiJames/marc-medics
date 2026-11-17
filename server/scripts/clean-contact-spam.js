// One-off cleanup: removes bot submissions from contactForms.json in Cloud Storage.
// Run from the server folder:
//   node scripts/clean-contact-spam.js           lists what would be removed, changes nothing
//   node scripts/clean-contact-spam.js --apply   backs up the file, then removes them
const path = require('path');
const { Storage } = require('@google-cloud/storage');
const { spamSignals, isLikelySpam } = require('../spamFilter');

const BUCKET_NAME = 'xenon-lyceum-442506-i4.appspot.com';
const CUSTOMER_FILE_NAME = 'contactForms.json';

async function main() {
  const apply = process.argv.includes('--apply');
  const storage = new Storage({
    keyFilename: path.join(__dirname, '../credentials/creds.json')
  });
  const bucket = storage.bucket(BUCKET_NAME);

  // Pin the version we read, so the save fails instead of wiping out
  // a message that arrives while this script is running
  const [metadata] = await bucket.file(CUSTOMER_FILE_NAME).getMetadata();
  const file = bucket.file(CUSTOMER_FILE_NAME, { generation: metadata.generation });
  const [data] = await file.download();
  const entries = JSON.parse(data.toString('utf-8'));

  const spam = entries.filter(isLikelySpam);
  const keep = entries.filter(entry => !isLikelySpam(entry));

  for (const entry of spam) {
    console.log(`- ${entry.submittedAt}  ${entry.name} <${entry.email}>  [${spamSignals(entry).join(', ')}]`);
  }
  console.log(`\n${spam.length} of ${entries.length} entries look like spam. ${keep.length} would be kept.`);

  if (!apply) {
    console.log('Nothing changed. Check the list above, then re-run with --apply to remove them.');
    return;
  }
  if (spam.length === 0) return;

  const backupName = `contactForms.backup-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
  await file.copy(bucket.file(backupName));
  console.log(`Backed up the original to gs://${BUCKET_NAME}/${backupName}`);

  await bucket.file(CUSTOMER_FILE_NAME).save(JSON.stringify(keep, null, 2), {
    contentType: 'application/json',
    preconditionOpts: { ifGenerationMatch: metadata.generation }
  });
  console.log(`Removed ${spam.length} spam entries.`);
}

main().catch(error => {
  if (error.code === 412) {
    console.error('A new message arrived while this was running. Nothing was removed; run it again.');
  } else {
    console.error('Cleanup failed:', error.message);
  }
  process.exit(1);
});
