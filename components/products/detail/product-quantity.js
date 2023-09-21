import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

export default function ProductQuantity(props) {
  function incrementQuantity(quantity) {
    props.setQuantity(quantity + 1)
  }
  function decrementQuantity(quantity) {
    if (quantity > 1) {
      props.setQuantity(quantity - 1)
    }
  }

  return (
    <ButtonGroup
      aria-label="Disabled elevation buttons"
      disableElevation
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#5F5F5F',
        height: '52px',
        width: '240px',
        gap: 4,
        borderRadius: '10px',
        border: '1px solid #707070',

        '& button': {
          height: '100%',
          width: '50%',
        },
      }}
      variant="outline"
    >
      <Button onClick={() => decrementQuantity(props.selectedQuantity)}>
        <FontAwesomeIcon icon={faMinus} />
      </Button>
      <Typography fontSize={18}>{props.selectedQuantity}</Typography>
      <Button onClick={() => incrementQuantity(props.selectedQuantity)}>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </ButtonGroup>
  )
}
