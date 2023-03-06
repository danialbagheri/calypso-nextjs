import {useState, useEffect} from 'react'
import Image from 'next/image'
import Styles from './MailChimp.module.css'

export default function MailChimpSignUp() {
  const [showPopUp, setShowPopUp] = useState('NU')
  const [scrollTop, setScrollTop] = useState(0)

  useEffect(() => {
    const mailChimpPopUp = localStorage.getItem('mailChimpPopUp')
    if (mailChimpPopUp) {
      setShowPopUp(mailChimpPopUp)
    } else {
      localStorage.setItem('mailChimpPopUp', 'NU')
    }
  }, [])

  useEffect(() => {
    const onScroll = e => {
      setScrollTop(e.target.documentElement.scrollTop)
    }
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [scrollTop])

  function setShowPopUpSetting() {
    let state
    showPopUp === 'NU' || showPopUp === 'No' ? (state = 'YES') : (state = 'No')
    localStorage.setItem('mailChimpPopUp', state)

    setShowPopUp(state)
  }

  function shouldShow() {
    if (showPopUp === 'YES') {
      return true
    } else if (showPopUp === 'NU' && scrollTop >= 400) {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      <div
        className={shouldShow() ? Styles.ModalbackgroundShown : Styles.ModalbackgroundHidden}
        onClick={() => setShowPopUpSetting()}
      />
      <div className={shouldShow() ? Styles.NewsLetterContainerOpen : Styles.NewsLetterContainerClose}>
        <div className={Styles.OfferContainer} onClick={() => setShowPopUpSetting()}>
          <i className={Styles.ToggleIcon} />
          <div className={Styles.Offer}>GET 10% OFF</div>
        </div>
        <div className={Styles.Content}>
          <div className={Styles.ImageContainer} onClick={() => setShowPopUpSetting()}>
            <Image
              src={require('../../public/home-page/calypso-newsletter-subscription.jpg')}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className={Styles.signUpFormContainer}>
            <h5>Sign up to get 10% off your first order</h5>
            <ul>
              <li>Exclusive offers</li>
              <li>New product launches</li>
              <li>Sun advice</li>
            </ul>
            <form
              action="https://lincocare.us14.list-manage.com/subscribe/post?u=421f0bb9a595c039a66840b25&amp;id=c458361e44"
              method="POST"
              name="mc-embedded-subscribe-form"
              className="validate subscribe-form"
              target="_blank"
            >
              <input type="hidden" name="u" value="a123cd45678ef90g7h1j7k9lm" />
              <input type="hidden" name="id" value="ab2c468d10" />
              <input className={Styles.EmailInput} type="email" name="MERGE0" placeholder="Email Address" />

              <button className={Styles.subscribeButton} type="submit">
                SUBSCRIBE
              </button>
              <p className={Styles.smallText}>
                By entering your email, you are opting in to receiving emails from Calypso. You can opt out anytime.
                Privacy policy
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
