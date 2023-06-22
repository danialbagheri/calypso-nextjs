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
        <Typography align={'center'} mb={7} variant={'h3'}>
          Your Questions Answered
        </Typography>

        {Object.values(props).map(faqDetail => (
          <Accordion disableGutters key={faqDetail.id}>
            <AccordionSummary
              aria-controls="panel1a-content"
              expandIcon={<ExpandMoreIcon color={'secondary'} />}
              id="panel1a-header"
            >
              <Typography color={'secondary'} variant={'h6'}>
                {faqDetail.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div dangerouslySetInnerHTML={{__html: faqDetail.answer}}></div>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </ScopedCssBaseline>
  )
}

export default Faq
