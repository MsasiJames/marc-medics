// Heuristics for spotting the bot submissions the contact form receives, e.g.
//   name "EVgGehkrkLQXFXfttawONV", subject "AeIrVsMcmjlEEJapeYUD",
//   email "u.za.q.u.r.o.h.u.ti5.7@gmail.com"
// Used by the /contact endpoint and by scripts/clean-contact-spam.js.

// One long run of letters with upper and lower case jumbled together.
// "JohnathanSmithers" has 3 case changes; the bot strings have 6-10.
function looksRandom(value) {
  const s = typeof value === 'string' ? value.trim() : '';
  if (s.length < 10 || !/^[A-Za-z]+$/.test(s)) return false;

  let caseChanges = 0;
  for (let i = 1; i < s.length; i++) {
    if (/[A-Z]/.test(s[i - 1]) !== /[A-Z]/.test(s[i])) caseChanges++;
  }
  return caseChanges >= 5;
}

// Gmail ignores dots, so bots sprinkle them to make one inbox look like many.
function hasManyDots(email) {
  const local = typeof email === 'string' ? email.split('@')[0] : '';
  return (local.match(/\./g) || []).length >= 4;
}

function spamSignals({ name, email, subject, message }) {
  const signals = [];
  if (looksRandom(name)) signals.push('random name');
  if (looksRandom(subject)) signals.push('random subject');
  if (looksRandom(message)) signals.push('random message');
  if (hasManyDots(email)) signals.push('dotted email');
  return signals;
}

// Needs two signals, so one odd field (a name typed without a space) is not enough.
function isLikelySpam(entry) {
  return spamSignals(entry).length >= 2;
}

module.exports = { spamSignals, isLikelySpam };
