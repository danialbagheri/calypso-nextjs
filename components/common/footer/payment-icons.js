import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faApplePay,
  faCcMastercard,
  faCcPaypal,
  faCcVisa,
  faGooglePay,
} from '@fortawesome/free-brands-svg-icons'

export default function PaymentIcons() {
  return (
    <div>
      <FontAwesomeIcon className="payment-icon" icon={faCcVisa} />
      <FontAwesomeIcon className="payment-icon" icon={faCcMastercard} />
      <FontAwesomeIcon className="payment-icon" icon={faCcPaypal} />
      <FontAwesomeIcon className="payment-icon" icon={faGooglePay} />
      <FontAwesomeIcon className="payment-icon" icon={faApplePay} />
    </div>
  )
}
