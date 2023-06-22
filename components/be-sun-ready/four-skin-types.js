import Image from 'next/image'
import Styles from '../../styles/sunready.module.css'

export default function FourSkinTypes() {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-sm-6 col-6 col-xs-6">
          <div className={Styles.SkinColorHolder}>
            <Image height="307" src="/be-sun-ready/pale.png" width="307" />
            <h4 className={Styles.SkinColorTitle}>
              Very pale, white skin, freckles, red hair
            </h4>
            <ul className={Styles.bulletList}>
              <li>You burn easily in the sun</li>
              <li>You have highly sensitive and delicate skin</li>
              <li>You never tan</li>
            </ul>

            <h4 className={Styles.RecommendedSpf}>
              Recommended SPF:
              <br />
              50+
            </h4>
          </div>
        </div>

        <div className="col-md-3 col-sm-6 col-6 col-xs-6">
          <div className={Styles.SkinColorHolder}>
            <Image height="307" src="/be-sun-ready/white.png" width="307" />
            <h4 className={Styles.SkinColorTitle}>
              Fair, white skin, blonde or auburn hair
            </h4>
            <ul className={Styles.bulletList}>
              <li>You burn easily in the sun</li>
              <li>You have very sensitive skin</li>
              <li>You are able to tan</li>
            </ul>

            <h4 className={Styles.RecommendedSpf}>
              Recommended SPF:
              <br />
              30 - 50+
            </h4>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 col-6 col-xs-6">
          <div className={Styles.SkinColorHolder}>
            <Image height="307" src="/be-sun-ready/brunette.png" width="307" />
            <h4 className={Styles.SkinColorTitle}>
              Medium skin tone, brunette hair
            </h4>
            <ul className={Styles.bulletList}>
              <li>You can burn in strong sunlight</li>
              <li>Your skin has a low-level of sensitivity</li>
              <li>You tan well in the sun</li>
            </ul>

            <h4 className={Styles.RecommendedSpf}>
              Recommended SPF:
              <br />
              20 - 30
            </h4>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 col-6 col-xs-6">
          <div className={Styles.SkinColorHolder}>
            <Image height="307" src="/be-sun-ready/dark.png" width="307" />
            <h4 className={Styles.SkinColorTitle}>Dark Skin, Dark hair</h4>
            <br />
            <br />
            <ul className={Styles.bulletList}>
              <li>You rarely burn</li>
              <li>Your skin is sun-tolerant</li>
              <li>You tan easily in the sun</li>
            </ul>

            <h4 className={Styles.RecommendedSpf}>
              Recommended SPF:
              <br />
              15 - 20
            </h4>
          </div>
        </div>
      </div>
    </div>
  )
}
