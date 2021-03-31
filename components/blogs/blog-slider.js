import React from "react";
import BlogThumbnail from "./blog-thumbnail";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MediaQuery from "react-responsive";
import data from "../../data.json";

export default class BlogSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      blogs: [],
    };
  }
  componentDidMount() {
    this.fetchBlogs();
  }

  fetchBlogs() {
    const baseUrl = data.apiUrl;
    const url = baseUrl + "blogs/all/?resize_w=450";
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            blogs: result.results,
          });
        },
        (error) => {
          this.setState({
            isLoaded: false,
            error,
          });
        }
      );
  }

  render() {
    const { isLoaded, error, blogs } = this.state;
    const settings = {
      arrows: true,
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
    };
    const mobileSettings = {
      arrows: true,
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    let flipState = true;
    let thumbnail = null;
    if (!isLoaded) {
      thumbnail = <div> Loading...</div>;
    } else {
      thumbnail = blogs.map((blog) => {
        flipState = !flipState;
        return (
          <a
            href={`/advice/${blog.slug}/`}
            className="textCenter disableLink"
            key={blog.id}
          >
            <BlogThumbnail
              blogImage={blog.image}
              altText={blog.image_alt_text}
              flipImage={flipState}
              title={blog.title}
              button="Read More"
            />
          </a>
        );
      });
    }

    return (
      <div className="container">
        <h1 className="textCenter">EDITOR'S PICKS</h1>
        <MediaQuery query="(min-device-width: 500px)">
          <Slider {...settings} className="blogSlider top50">
            {thumbnail}
          </Slider>
        </MediaQuery>
        <MediaQuery query="(max-device-width: 500px)">
          <Slider {...mobileSettings} className="blogSlider top50">
            {thumbnail}
          </Slider>
        </MediaQuery>
      </div>
    );
  }
}
