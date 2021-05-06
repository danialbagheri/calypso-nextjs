import Image from "next/image";
import Styles from "../../styles/sunready.module.css";
import SpfTable from "../../public/be-sun-ready/spfTable.svg";
export default function SunFactor() {
  return (
    <div>
      <div style={{ height: "153px", backgroundColor: "#FC954D" }}></div>
      <div className={Styles.sunReadyIcons}>
        <Image
          src="/be-sun-ready/spf.png"
          height="178px"
          width="178px"
          layout="responsive"
        />
      </div>
      <div className="container">
        <h4 className={Styles.sunReadyTitle}>Choose the right SPF</h4>
        <p className="text-centre ">
          SPF stands for Sun Protection Factor. It is the measure of the
          sunscreen’s ability to filter UVB rays. You should consider your skin
          type, hair colour and location when choosing an SPF product. If you’re
          not sure what SPF to choose, consult the{" "}
          <strong>Climate Destinations Chart:</strong>
        </p>
        <div className="m-5">
          <img
            src={SpfTable}
            width="1500px"
            className="img-responsive img-center"
          />
        </div>
      </div>
    </div>
  );
}
