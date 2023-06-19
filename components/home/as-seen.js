import {Typography} from '@mui/material'

function AsSeen() {
  return (
    <div className="row top50 mb-4">
      <Typography variant="h2" textAlign={'center'}>
        As seen in
      </Typography>
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

export default AsSeen
