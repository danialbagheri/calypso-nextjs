import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

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
    <Box>
      <Typography variant="body6">Quantity</Typography>
      <div className="productQuantityContainer">
        <button
          className="productQuantityButton"
          onClick={() => decrementQuantity(props.selectedQuantity)}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <div className="productQuantity">{props.selectedQuantity}</div>
        <button
          className="productQuantityButton"
          onClick={() => incrementQuantity(props.selectedQuantity)}
        >
          <FontAwesomeIcon icon={faPlus} style={{marginLeft: '-2px'}} />
        </button>
      </div>
    </Box>
  )
}
