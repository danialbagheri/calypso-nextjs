import React from "react";

export default class AsSeen extends React.Component {
  render() {
    return (
      <div className="row top50">
        <h1 className="textCenter">As seen in</h1>
        <div className="container top30">
          <div className="col-lg-3 col-md-3 col-xs-6 top15">
            <img
              className="asSeenImage"
              alt="Closer Magazine"
              src={require("../../public/asSeenLogo/closerlogo.png")}
            />
          </div>
          <div className="col-lg-3 col-md-3 col-xs-6 top15">
            <img
              className="asSeenImage"
              alt="Best"
              src={require("../../public/asSeenLogo/bestlogo.png")}
            />
          </div>
          <div className="col-lg-3 col-md-3 col-xs-6 top15">
            <img
              className="asSeenImage"
              alt="Daily Record"
              src={require("../../public/asSeenLogo/dailyrecordlogo.png")}
            />
          </div>
          <div className="col-lg-3 col-md-3 col-xs-6 top15">
            <img
              className="asSeenImage"
              alt="Evening Stand"
              src={require("../../public/asSeenLogo/eveningstandardlogo.png")}
            />
          </div>
        </div>
        <div className="container top30">
          <div className="col-lg-3 col-md-3 col-xs-6 top15">
            <img
              className="asSeenImage"
              alt="Metro"
              src={require("../../public/asSeenLogo/metrologo.png")}
            />
          </div>
          <div className="col-lg-3 col-md-3 col-xs-6 top15">
            <img
              className="asSeenImage"
              alt="RealPeople Magazine"
              src={require("../../public/asSeenLogo/realpeoplelogo.png")}
            />
          </div>
          <div className="col-lg-3 col-md-3 col-xs-6 top15">
            <img
              className="asSeenImage"
              alt="Reveal"
              src={require("../../public/asSeenLogo/reveallogo.png")}
            />
          </div>
          <div className="col-lg-3 col-md-3 col-xs-6 top15">
            <img
              className="asSeenImage"
              alt="Woman Magazine"
              src={require("../../public/asSeenLogo/womanlogo.png")}
            />
          </div>
        </div>
        <span className="top30" />
      </div>
    );
  }
}
