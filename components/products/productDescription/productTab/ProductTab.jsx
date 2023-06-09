import * as React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import {Benefits} from './benefits'

function TabPanel(props) {
  const {children, value, index, ...other} = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const ProductTab = props => {
  const {product, selectedVariant} = props

  const [value, setValue] = React.useState(0)

  const handleChange = (e, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{width: '100%'}}>
      <Box sx={{borderBottom: 1, borderColor: 'rgba(255, 94, 43, 0.4)'}}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
          sx={{
            borderColor: 'blue',
            '& .Mui-selected': {
              fontWeight: 700,
              color: 'inherit',
            },
            '& button': {
              fontSize: 14,
              textTransform: 'unset',
              color: 'gray',
            },
          }}
        >
          <Tab label="Directions" {...a11yProps(0)} />
          <Tab label="Benefits" {...a11yProps(1)} />
          <Tab label="Ingredients" {...a11yProps(2)} />
        </Tabs>
      </Box>

      {value === 0 ? (
        <div
          dangerouslySetInnerHTML={{
            __html: product.direction_of_use,
          }}
        />
      ) : null}

      {value === 1 ? <Benefits tags={product.tags} /> : null}

      <TabPanel value={value} index={2}>
        {selectedVariant.ingredients.join(', ')}
      </TabPanel>
    </Box>
  )
}

export default ProductTab
