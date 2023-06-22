import {Component} from 'react'
import Lottie from 'lottie-react'
import AnimationStyle from '../styles/animation.module.css'
import errorAnimation from '../public/assets/animations/errorAnimation.json'

class Custom404 extends Component {
  render() {
    return (
      <div className="mt-20">
        <div syle={{marginTop: '40px !important'}}>
          <Lottie
            animationData={errorAnimation}
            className={AnimationStyle.ErrorAnimation}
            style={{margin: '20px auto', width: '500px'}}
          />
        </div>
        <div style={{textAlign: 'center'}}>
          <h3 className="h2">Looks like you&rsquo;re lost</h3>

          <p>
            the page you are looking for not available!
            {/* eslint-disable-next-line  */}
            <a href="/search/">try searching for it here</a>
          </p>
        </div>
      </div>
    )
  }
}

export default Custom404
