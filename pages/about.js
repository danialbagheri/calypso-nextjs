import { Component } from "react";
// import Past from "../components/about/Past";
// import Future from "../components/about/Future";
// import AboutUsBanner from "../components/about/AboutUsBanner";
// import Introduction from "../components/about/Introduction";
// import Testimonials from "../components/about/Testimonials";
// import GetInTouch from "../components/about/GetInTouch";
// import OurValues from "../components/about/OurValues";
// import logo from "./logo.svg";
class About extends Component {
  componentDidMount() {
    // Fix the scrolling issue when navigating
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div>
        test
        {/* <AboutUsBanner />
        <Introduction />
        <Past />
        <Future />
        <div className="top50" />
        <div className="pt-5" />
        <Testimonials />
        <OurValues />
        <GetInTouch />
        <div className="top50" /> */}
      </div>
    );
  }
}

export default About;
