import {Component} from 'react'
import AboutUsBanner from '../../components/about/AboutUsBanner'
import Introduction from '../../components/about/Introduction'
import Past from '../../components/about/Past'
import Future from '../../components/about/Future'
import Testimonials from '../../components/about/Testimonials'
import OurValues from '../../components/about/OurValues'
import GetInTouch from '../../components/about/GetInTouch'
// import logo from "./logo.svg";
class About extends Component {
  componentDidMount() {
    // Fix the scrolling issue when navigating
    window.scrollTo(0, 0)
  }
  render() {
    return (
      <div>
        <AboutUsBanner />
        <Introduction />
        <Past />
        <Future />
        <div className="top50" />
        <div className="pt-5" />
        <Testimonials />
        <OurValues />
        <GetInTouch />
        <div className="top50" />
      </div>
    )
  }
}

export default About
