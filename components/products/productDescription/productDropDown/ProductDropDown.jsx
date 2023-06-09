import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box'

import {WhereToBuy} from './whereToBuy'

export default function ProductDropDown(props) {
  const {selectedVariant, product} = props
  return (
    <Box>
      <Accordion
        sx={{
          boxShadow: 'none',
          '& .MuiButtonBase-root': {
            borderBottom: '1px solid rgba(0,0,0,0.3)',
            borderTop: '1px solid rgba(0,0,0,0.3)',
          },
          '& .MuiAccordionSummary-root.Mui-expanded': {
            borderBottom: 'none',
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Where to Buy</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <WhereToBuy
            stores={selectedVariant.where_to_buy}
            childProducts={selectedVariant.name}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
