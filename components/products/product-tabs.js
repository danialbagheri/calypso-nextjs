import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import TabPanel from 'components/common/tabs/TabPanel'
import WhereToBuy from './where-to-buy'
import Benefits from './benefits'

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function ProductTabs(props) {
  const {benefits, ingredients, childProducts, selectedChild, stores} = props
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{width: '100%'}}>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Benefits" value={0} {...a11yProps(0)} />
          <Tab label="Where to buy" value={1} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Benefits benefits={benefits} ingredients={ingredients} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WhereToBuy
          stores={stores}
          childProducts={childProducts}
          selectedChild={selectedChild}
        />
      </TabPanel>
    </Box>
  )
}
