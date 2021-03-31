import React from "react";
import YouTube from "react-youtube";
import MediaQuery from "react-responsive";

export default class StaySafe extends React.Component {
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
  render() {
    const youtubeDesktop = {
      height: "390px",
      width: "640px",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      },
    };
    const youtubeMobile = {
      height: "180px",
      width: "350px",
      playerVars: {
        autoplay: 0,
      },
    };
    return (
      <div className="container-fluid yellow-background top50">
        <div className="row">
          <div className="col2 col-md-3 col-lg-3" />
          <div className="col8 col-md-6 col-lg-6">
            <img
              alt="Stay safe with Calypso"
              className="stay-safe top30"
              src={require("../../public/home-page/Stay-Safe-with-Calypso.png")}
            />
            <div className="wrapper top30">
              <MediaQuery query="(min-device-width: 500px)">
                <YouTube
                  videoId="KW2GYWJLWQs"
                  opts={youtubeDesktop}
                  onReady={this._onReady}
                />
              </MediaQuery>
              <MediaQuery query="(max-device-width: 500px)">
                <YouTube
                  videoId="KW2GYWJLWQs"
                  opts={youtubeMobile}
                  onReady={this._onReady}
                />
              </MediaQuery>
            </div>
            <h1 className="text-centre">Sun Safety Tips for Families</h1>
            <p className="text-centre">
              Unsure of how best to keep your family protected from the sun this
              summer? Watch our video to get some valuable sun care advice from
              NHS Nurse Manager and travel influencer Karen Edwards, better
              known as <span />
              <a
                href="https://travelmadmum.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Travel Mad Mum
              </a>
              , who was recently interviewed by Katy Booth on BBC Radio
              Lancashire.
            </p>
          </div>
          <div className="col2 col-md-3 col-lg-3" />
        </div>
      </div>
    );
  }
}
