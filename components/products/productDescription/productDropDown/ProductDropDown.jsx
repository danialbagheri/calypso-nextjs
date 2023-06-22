import * as React from 'react'

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import {WhereToBuy} from './whereToBuy'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons'

export default function ProductDropDown(props) {
  const [expanded, setExpanded] = React.useState(false)

  const {selectedVariant} = props
  return (
    <Box>
      <Accordion
        onChange={(e, isExpanded) => setExpanded(isExpanded)}
        sx={{
          boxShadow: 'none',
          '& .MuiButtonBase-root': {
            borderBottom: '1px solid black',
            borderTop: '1px solid black',
          },
          '& .MuiAccordionSummary-root.Mui-expanded': {
            borderBottom: 'none',
          },
          '& .Mui-expanded': {
            margin: '10px 0',
          },
          '& .MuiCollapse-entered': {borderBottom: '1px solid black'},
        }}
      >
        <AccordionSummary
          aria-controls="panel1a-content"
          expandIcon={
            <FontAwesomeIcon
              color="#FF6B00"
              icon={expanded ? faMinus : faPlus}
            />
          }
          id="panel1a-header"
        >
          <Typography>Where to Buy</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <WhereToBuy
            childProducts={selectedVariant.name}
            stores={selectedVariant.where_to_buy}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
