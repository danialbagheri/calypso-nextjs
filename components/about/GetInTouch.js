export default function GetInTouch() {
  // Declare a new state variable, which we'll call "count"
  return (
    <section className="container">
      <h1 className="text-centre">Interested in our latest chapter?</h1>
      <h5 className="text-centre">
        {/* eslint-disable-next-line */}
        <a className="calypso-orange-text" href="/products/">
          Shop
        </a>
        <span className="calypso-orange-text"> / </span>
        <a
          className="calypso-orange-text"
          href="https://facebook.com/calypsosuncare/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Follow
        </a>
        <span className="calypso-orange-text"> / </span>
        <a className="calypso-orange-text" href="mailto:hello@calypsosun.com">
          Email us
        </a>
      </h5>
    </section>
  )
}
