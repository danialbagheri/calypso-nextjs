import {Typography} from '@mui/material'

function AsSeen() {
  return (
    <div className="row top50 mb-4">
      <Typography textAlign={'center'} variant="h2">
        As seen in
      </Typography>
      <div className="container top30">
        <div className="col-lg-3 col-md-3 col-xs-6 top15">
          <img
            alt="Closer Magazine"
            className="asSeenImage"
            src={'/asSeenLogo/closerlogo.png'}
          />
        </div>
        <div className="col-lg-3 col-md-3 col-xs-6 top15">
          <img
            alt="Best"
            className="asSeenImage"
            src={'/asSeenLogo/bestlogo.png'}
          />
        </div>
        <div className="col-lg-3 col-md-3 col-xs-6 top15">
          <img
            alt="Daily Record"
            className="asSeenImage"
            src={'/asSeenLogo/dailyrecordlogo.png'}
          />
        </div>
        <div className="col-lg-3 col-md-3 col-xs-6 top15">
          <img
            alt="Evening Stand"
            className="asSeenImage"
            src={'/asSeenLogo/eveningstandardlogo.png'}
          />
        </div>
      </div>
      <div className="container top30">
        <div className="col-lg-3 col-md-3 col-xs-6 top15">
          <img
            alt="Metro"
            className="asSeenImage"
            src={'/asSeenLogo/metrologo.png'}
          />
        </div>
        <div className="col-lg-3 col-md-3 col-xs-6 top15">
          <img
            alt="RealPeople Magazine"
            className="asSeenImage"
            src={'/asSeenLogo/realpeoplelogo.png'}
          />
        </div>
        <div className="col-lg-3 col-md-3 col-xs-6 top15">
          <img
            alt="Reveal"
            className="asSeenImage"
            src={'/asSeenLogo/reveallogo.png'}
          />
        </div>
        <div className="col-lg-3 col-md-3 col-xs-6 top15">
          <img
            alt="Woman Magazine"
            className="asSeenImage"
            src={'/asSeenLogo/womanlogo.png'}
          />
        </div>
      </div>
      <span className="top30" />
    </div>
  )
}

export default AsSeen
