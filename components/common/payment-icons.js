import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCcVisa,
  faCcMastercard,
  faApplePay,
  faGooglePay,
  faCcPaypal,
} from "@fortawesome/free-brands-svg-icons";

export default function PaymentIcons() {
  return (
    <div>
      <FontAwesomeIcon icon={faCcVisa} className="payment-icon" />
      <FontAwesomeIcon icon={faCcMastercard} className="payment-icon" />
      <FontAwesomeIcon icon={faCcPaypal} className="payment-icon" />
      <FontAwesomeIcon icon={faGooglePay} className="payment-icon" />
      <FontAwesomeIcon icon={faApplePay} className="payment-icon" />
    </div>
  );
}
