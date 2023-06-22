import * as React from 'react'

import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import TuneIcon from '@mui/icons-material/Tune'

import {Filters} from './Filters'

function FilterDialog(props) {
  const {onClose, open} = props

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Filters</DialogTitle>
      <Box>
        <Filters />
      </Box>
    </Dialog>
  )
}

export default function ReviewFilters() {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box mt={10}>
      <Box sx={{display: {sm: 'none', md: 'block'}}}>
        <Filters />
      </Box>
      <Button
        color={'secondary'}
        onClick={handleClickOpen}
        startIcon={<TuneIcon />}
        sx={{borderRadius: 5, display: {sm: 'flex', md: 'none'}}}
        variant="outlined"
      >
        More filters
      </Button>
      <FilterDialog onClose={handleClose} open={open} />
    </Box>
  )
}
