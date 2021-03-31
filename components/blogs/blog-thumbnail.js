// import { connect } from "react-redux";
// import { fetchProducts } from "../redux/actions/fetchProduct";
import React from "react";
import blogCurve from "../../public/blogCurve.svg";
class BlogThumbnail extends React.Component {
  render() {
    const { altText } = this.props;
    const imageStyle = {
      backgroundImage: 'url("' + this.props.blogImage + '")',
      backgroundSize: "cover",
      backgroundColor: "#cccccc",
      height: 252,
      borderRadius: "7px",
    };
    const flipTopImage = this.props.flipImage
      ? "blogcurve topImage flipTopImage"
      : "blogcurve topImage";
    return (
      <div className="blogThumbnail bot40">
        <div className="thumbnailHolder">
          <div className="blog-thumbnail-image" style={imageStyle} />
          <img className={flipTopImage} src={blogCurve} alt={altText} />
        </div>
        <p className="blog-thumbnail-title">{this.props.title}</p>
        <p className="blog-thumbnail-link">{this.props.button}</p>
      </div>
    );
  }
}

export default BlogThumbnail;
