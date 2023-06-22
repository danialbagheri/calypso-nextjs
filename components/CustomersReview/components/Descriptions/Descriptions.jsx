import {Reviews} from './components'
import Grid from '@mui/material/Grid'

function Descriptions() {
  return (
    <Grid item md={8} xs={12}>
      {/*TO DO::: After implementing Review search and filters these components should be used*/}
      {/*<SearchBox />*/}
      {/*<ReviewFilters />*/}
      <Reviews />
    </Grid>
  )
}

export default Descriptions
