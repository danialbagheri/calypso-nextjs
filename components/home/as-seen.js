import React from 'react'

export default class AsSeen extends React.Component {
  render() {
    return (
      <div className="row top50 mb-4">
        <h1 className="textCenter">As seen in</h1>
        <div className="container top30">
          <div className="col-lg-3 col-md-3 col-xs-6 top15">
            <img
              className="asSeenImage"
              alt="Closer Magazine"
              src={'/asSeenLogo/closerlogo.png'}
            />
          </div>
          <div className="col-lg-3 col-md-3 col-xs-6 top15">
            <img
              className="asSeenImage"
              alt="Best"
              src={'/asSeenLogo/bestlogo.png'}
            />
          </div>
          <div className="col-lg-3 col-md-3 col-xs-6 top15">
            <img
              className="asSeenImage"
              alt="Daily Record"
              src={'/asSeenLogo/dailyrecordlogo.png'}
            />
          </div>
          <div className="col-lg-3 col-md-3 col-xs-6 top15">
            <img
              className="asSeenImage"
              alt="Evening Stand"
              src={'/asSeenLogo/eveningstandardlogo.png'}
            />
          </div>
        </div>
        <div className="container top30">
          <div className="col-lg-3 col-md-3 col-xs-6 top15">
            <img
              className="asSeenImage"
              alt="Metro"
              src={'/asSeenLogo/metrologo.png'}
            />
          </div>
          <div className="col-lg-3 col-md-3 col-xs-6 top15">
            <img
              className="asSeenImage"
              alt="RealPeople Magazine"
              src={'/asSeenLogo/realpeoplelogo.png'}
            />
          </div>
          <div className="col-lg-3 col-md-3 col-xs-6 top15">
            <img
              className="asSeenImage"
              alt="Reveal"
              src={'/asSeenLogo/reveallogo.png'}
            />
          </div>
          <div className="col-lg-3 col-md-3 col-xs-6 top15">
            <img
              className="asSeenImage"
              alt="Woman Magazine"
              src={'/asSeenLogo/womanlogo.png'}
            />
          </div>
        </div>
        <span className="top30" />
      </div>
    )
  }
}
