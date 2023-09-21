import Styles from '../../styles/sunready.module.css'
import SpfTable from '../../public/be-sun-ready/spfTable.svg'
import spfCircle from '../../public/be-sun-ready/svgs/SPF-CALYPSO.svg'
export default function SunFactor() {
  return (
    <div id="sun-factor">
      <div style={{height: '153px', backgroundColor: '#FC954D'}}></div>
      <div className={Styles.sunReadyIcons}>
        <img height={178} src={spfCircle} width={178} />
      </div>
      <div className="container">
        <h4 className={Styles.sunReadyTitle}>Choose the right SPF</h4>
        <p className="text-centre ">
          SPF stands for Sun Protection Factor. It is the measure of the
          sunscreen’s ability to filter UVB rays. You should consider your skin
          type, hair colour and location when choosing an SPF product. If you’re
          not sure what SPF to choose, consult the{' '}
          <strong>Climate Destinations Chart:</strong>
        </p>
        <div className="m-5">
          <img
            className="img-responsive img-center"
            src={SpfTable}
            width="1500px"
          />
        </div>
      </div>
    </div>
  )
}
