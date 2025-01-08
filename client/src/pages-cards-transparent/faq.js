/* eslint-disable no-unused-vars */
import React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import { Box, Typography, Sheet, Accordion, AccordionDetails, AccordionSummary, Container, AccordionGroup, accordionSummaryClasses, accordionDetailsClasses } from '@mui/joy';
// import { ChevronDown } from 'lucide-react';

import Header from '../components/topNavBar copy';

// background image
import dna from '../images/dna.png';

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: '#e8f5fe',
          100: '#b9e2fc',
          200: '#8acefa',
          300: '#5bbaf8',
          400: '#2ca6f6',
          500: '#0d93e3',
          600: '#0a72b1',
          700: '#07527f',
          800: '#04324d',
          900: '#01121b',
        },
        background: {
          body: '#ffffff',
          surface: '#f8fafc',
        },
      },
    },
  },
  fontFamily: {
    body: "'Roboto', sans-serif",
    display: "'Montserrat', sans-serif",
  },
});

const faqs = [
  {
    question: "What are stem cells for?",
    answer: "Stem cells are the basic building blocks of life, the basic cells from which our bodies are made. They are formed at conception and develop to become all the different tissues of the body. They are known as progenitor cells that enable the creation of new cells. They are in essence regenerative in nature."
  },
  {
    question: "When do MARC use stem cells?",
    answer: "MARC uses your own body's stem cells, harvested from your own body fat for repair or replacement of injured or diseased tissue. Unfortunately, your natural reserve is limited and as it becomes depleted by aging, the regenerative power of our body decreases. Stem cell therapies are based on replacing the depleted cells."
  },
  {
    question: "What are the sources of stem cells in the body?",
    answer: "There are three sources of stem cells from your that can be used in our therapies; bone marrow, peripheral blood and fat (adipose tissue). MARC concentrates on the latter and least invasive of these routes."
  },
  {
    question: "What is the best place to harvest stem cells from and why?",
    answer: "The best source to harvest stem cells from one's body is the 'FAT' also known as Adipose Tissue. It is rich in mesenchymal stem cells and 100x more stem cells can be harvested from fat as compared to bone marrow for example."
  },
  {
    question: "What is adipose stem cell treatment?",
    answer: "It is the harvesting of dormant stem cells from only 100-200cc of a patient's fat through a process called mini-liposuction. The harvested dormant stem cells are isolated from the fat and activated with the patient's growth factors. The cells are then reintroduced to the patient intravenously (IV drip). If you have chosen to have specific areas treated then the cells are reintroduced directly into those areas by the specialist doctor who is supervising that part of the treatment. The entire procedure takes about 4-5 hours and is conducted on an out-patient basis under local anesthesia. It takes approximately an hour to harvest the cells, 3 hours to activate and stimulate them properly with a patented laser and then infuse them back into the patient. We also put the cells through a cutting edge cell counting machine so we can tell you exactly what the live load of cells was reintroduced. Otherwise how would we know that what we were putting back into you would have an effect? We harvest from the most abundant source of stem cells, located within your own fat cells, avoiding the need to manipulate and multiply cells, thus helping to ensure their survival."
  },
  {
    question: "How soon until I see results?",
    answer: "Each condition and patient is unique, and there is no guarantee of what results will be achieved or how quickly they may be observed. Most patients report the results become apparent over 1-3 months, but it can take as long as 6-9 months."
  },
  {
    question: "What are the potential side effects?",
    answer: "Less than 10% of patients develop a minor fever, headache, or nausea, however these side effects typically last no longer than 24 hours and are usually happen to people with a sensitivity to mild anesthesia. There may be minor swelling, bruising and redness at the procedure site as with any minor procedure. No long-term negative side effects have been reported."
  },
  {
    question: "Are there any moral or ethical issues?",
    answer: "Several religious denominations have stated that your own adult stem cells are not encumbered by any ethical or moral dilemmas. The issues which apply to fetal and embryonic stem cells do not apply to adult stem cells. The Catholic Church has actually encouraged research and the use of adult stem cells in the treatment of human disease, as an ethically acceptable alternative to the use of fetal and embryonic stem cells."
  }
];

export default function FAQ() {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${dna})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 10%',
          zIndex: -1,
        },
      }}>
        {/* Header */}
        <Header />

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
          {/* <Typography level="h2" component="h2" sx={{ mb: 4, fontFamily: 'display', color: 'primary.400', textAlign: 'center' }}>
            Frequently Asked Questions
          </Typography> */}
          
          <AccordionGroup
            variant="outlined"
            transition="0.5s"
            sx={{
              maxWidth: '90%',
              backdropFilter: 'blur(20px)',
              height: '100%',
              borderRadius: 'lg',
              [`& .${accordionSummaryClasses.button}`]: {
                '&:hover': {
                  backgroundColor: 'transparent !important', // Force transparency
                },
              },
            }}
          >
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                sx={{
                  backgroundColor: 'transparent !important', // Ensure no default background
                  boxShadow: 'none !important', // Ensure no shadow by default
                  '&:hover': {
                    backgroundColor: 'transparent !important', // Disable background highlight
                    boxShadow: 'none !important', // Remove shadow on hover
                  },
                  '&.Mui-expanded': {
                    backgroundColor: 'transparent !important', // No highlight when expanded
                  },
                }}
              >
                <AccordionSummary
                  sx={{
                    '&:hover': {
                      backgroundColor: 'transparent !important', // Disable hover highlight
                    },
                    '&.Mui-expanded': {
                      backgroundColor: 'transparent !important', // No highlight when expanded
                    },
                  }}
                >
                  <Typography level="h6" sx={{ fontFamily: 'display', color: 'white' }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  variant="soft"
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0) !important', // Ensure transparency
                  }}
                >
                  <Typography sx={{ color: 'white' }}>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionGroup>



        </Container>

        {/* Footer */}
        <Sheet
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            bgcolor: 'rgba(255, 255, 255, 0)',
            // backdropFilter: 'blur(8px)',
          }}
        >
          <Container maxWidth="lg">
            <Typography textAlign="center" sx={{ color: 'white' }}>
              © 2023 MARC Medical. All rights reserved.
            </Typography>
          </Container>
        </Sheet>
      </Box>
    </CssVarsProvider>
  );
}

