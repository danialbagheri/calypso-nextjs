import React from "react";
import BlogThumbnail from "./blog-thumbnail";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MediaQuery from "react-responsive";
import data from "../../data.json";
import Link from "next/link";

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
    const url = baseUrl + "blogs/collections/staff-picked/?resize_w=450";
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            blogs: result.items,
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
      thumbnail = blogs.map((blog, index) => {
        flipState = !flipState;
        return (
          <Link href={`/advice/${blog.item.slug}/`} key={index}>
            <a className="textCenter disableLink">
              <BlogThumbnail
                blogImage={blog.item.image}
                altText={blog.item.image_alt_text}
                flipImage={flipState}
                title={blog.item.title}
                button="Read More"
              />
            </a>
          </Link>
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
