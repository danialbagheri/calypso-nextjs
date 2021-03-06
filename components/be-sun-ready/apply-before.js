import Image from "next/image";
import Link from "next/link";
import Styles from "../../styles/sunready.module.css";
import ApplyIcon from "../../public/be-sun-ready/svgs/apply.svg";

export default function ApplyBefore({ blogs }) {
  const blogRow = blogs.map((blog) => {
    return (
      <div className="col-12 col-md-4 col-sm-4 col-xs-12">
        <Link href={`/advice/${blog.item.slug}`}>
          <a className="disableLink text-centre">
            <div className="blog-card bg-white">
              <div className="blog-image">
                <Image
                  src={blog.item.resized || "/advice/placeholder.png"}
                  alt={blog.item.image_alt_text}
                  layout="responsive"
                  height={blog.item.image_height}
                  width={blog.item.image_width}
                />
              </div>
              <div className="card-body mt-2">
                <p className="card-title text-centre">{blog.item.title}</p>
                <p className="read-more">
                  <small>Read Now</small>
                </p>
              </div>
            </div>
          </a>
        </Link>
      </div>
    );
  });

  return (
    <div className="mt-4 mb-4">
      <div style={{ height: "153px", backgroundColor: "#FC954D" }}></div>
      <div className={Styles.sunReadyIcons}>
        <img
          src={ApplyIcon}
          alt="Apply sunscreen before going out icon"
          height="178px"
          width="178px"
          layout="responsive"
        />
      </div>
      <div className="container">
        <h4 className={Styles.sunReadyTitle}>
          Apply sunscreen before going out
        </h4>
        <p className="text-centre m-5">
          You should always apply sunscreen to clean, dry skin at least 20-30
          minutes before sun exposure. Remember to stay out of direct sunlight
          between 11am to 3pm when the sun’s UV rays are strongest. Make sure
          you particularly apply sunscreen on the easily forgotten areas such as
          the back of your neck, your ears and the top of your feet.
        </p>
      </div>
      <div className="container">
        <div className="row">{blogRow}</div>
      </div>
    </div>
  );
}
