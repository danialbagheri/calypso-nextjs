import * as React from 'react'

import styles from './descriptions.module.css'
import {ReviewFilters, Reviews, SearchBox} from './components'
import Grid from '@mui/material/Grid'

function Descriptions() {
  return (
    <Grid item xs={12} md={8}>
      <SearchBox />
      <ReviewFilters />
      <Reviews />
    </Grid>
  )
}

export default Descriptions
