import * as React from 'react'
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline'
import Box from '@mui/material/Box'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

function Faq(props) {
  return (
    <ScopedCssBaseline>
      <Box
        sx={{
          padding: {xs: '60px 36px', md: '80px 150px', lg: '80px 300px'},
          '& .MuiAccordion-root': {
            boxShadow: 'none',
          },
        }}
      >
        <Typography align={'center'} variant={'h3'} mb={7}>
          Your Questions Answered
        </Typography>

        {Object.values(props).map(faqDetail => (
          <Accordion key={faqDetail.id} disableSpacing disableGutters>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color={'secondary'} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant={'h6'} color={'secondary'}>
                {faqDetail.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant={'body1'}>{faqDetail.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </ScopedCssBaseline>
  )
}

export default Faq
