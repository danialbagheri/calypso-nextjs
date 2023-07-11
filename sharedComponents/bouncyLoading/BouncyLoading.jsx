import {Box} from '@mui/material'
import styles from './style.module.css'

function BouncyLoading({sx = {}}) {
  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between', ...sx}}>
      <Box bgcolor={'primary.main'} className={styles.pl1__a} />
      <Box bgcolor={'primary.main'} className={styles.pl1__b} />
      <Box bgcolor={'primary.main'} className={styles.pl1__c} />
    </Box>
  )
}

export default BouncyLoading
