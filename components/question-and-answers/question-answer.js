import {Typography} from '@mui/material'
import {styled} from '@mui/material/styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MuiAccordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

const Accordion = styled(props => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  border: 'none',
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
  mb: 3,
}))

export default function QuestionAnswer(props) {
  const {question, answer} = props
  return (
    <Accordion>
      <AccordionSummary
        aria-controls="panel1a-content"
        expandIcon={<ExpandMoreIcon />}
        id="panel1a-header"
      >
        <Typography color="secondary" variant="h4">
          {question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div dangerouslySetInnerHTML={{__html: answer}}></div>
      </AccordionDetails>
    </Accordion>
  )
}
