import Image from 'next/image'
import Styles from '../../styles/sunready.module.css'
import Animation from '../../styles/animation.module.css'
import coverUpIcon from '../../public/be-sun-ready/svgs/coverup.svg'

export default function CoverUp() {
  return (
    <div className="mt-4 mb-4">
      <div style={{height: '153px', backgroundColor: '#FC954D'}}></div>
      <div className={Styles.sunReadyIcons}>
        <Image alt="cover up" height={178} src={coverUpIcon} width={178} />
      </div>
      <div className="container">
        <h4 className={Styles.sunReadyTitle}>Cover Up</h4>
        <p className="text-centre m-5">
          Sunscreen is very important but sometimes we require additional
          protection from the sun’s powerful rays. You should always wear a pair
          of high-quality sunglasses that block 100 per cent of UV rays. It is
          also important to wear loose clothing and a wide brimmed hat.
        </p>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Image
                alt="kids beach"
                className={Animation.slideFromLeft}
                height="928"
                src="/be-sun-ready/kids-beach.png"
                width="695"
              />
            </div>
            <div className="col-md-6">
              <div className="mt-3 p-2">
                <h6>T-shirt</h6>
                <p>
                  Protect your shoulders, chest and back by wearing loose
                  clothing while out in the sun; these areas are often prone to
                  sun overexposure so try to limit the amount of sun they
                  receive.
                </p>
                <h6>Sunglasses</h6>
                <p>
                  UV rays can damage your skin but they can also damage your
                  eyes and affect your vision if you don’t take the proper
                  precautions to stay safe in the sun. It’s important to wear
                  sunglasses that absorb UVA and UVB rays.
                </p>
                <h6>Hat</h6>
                <p>
                  Wear a wide-brimmed hat such as a bucket hat to protect your
                  face, neck, and ears. These areas of the body are exposed to
                  the sun more than any other part so it’s important to protect
                  them whenever possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
