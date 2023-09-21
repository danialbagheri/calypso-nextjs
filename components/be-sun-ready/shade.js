import Image from 'next/image'
import Styles from '../../styles/sunready.module.css'
import shadeIcon from '../../public/be-sun-ready/svgs/shade.svg'

export default function Shade() {
  return (
    <div className="mt-4 mb-4">
      <div style={{height: '153px', backgroundColor: '#FC954D'}}></div>
      <div className={Styles.sunReadyIcons}>
        <Image
          alt="shade and water icon"
          height="178"
          src={shadeIcon}
          width="178"
        />
      </div>
      <div className="container">
        <h4 className={Styles.sunReadyTitle}>Shade & Water</h4>
        <p className="text-centre m-5">
          Seek shade whenever possible - this will help to cool you down and
          also protect your skin on a hot day. This can also help to prevent
          other symptoms of overexposure to the sun such as nausea,
          lightheadedness and dehydration. When your body is hot you begin to
          sweat, which evaporates allowing your body to cool off efficiently so
          that you don’t overheat. That’s why it is vital to drink lots of water
          to prevent dehydration or heat stroke.
        </p>
      </div>
    </div>
  )
}
