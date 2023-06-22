import Image from 'next/image'
export default function Future() {
  // Declare a new state variable, which we'll call "count"

  return (
    <section className="container-fluid mt-5 mb-5">
      <div className="row">
        <div className="col-6 col-md-6 text-centre col-sm-12 our-history-row-text">
          <div className="our-future-row-text">
            <h5 className="text-centre calypso-orange-text">
              PRESENT AND FUTURE
            </h5>
            <hr className="short-line" />
            <p className="text-centre mb-4">
              Calypso has changed a lot over the last 30 years, but it has
              stayed true to its original mission of developing innovative sun
              protection products that are affordable and suitable for the whole
              family.
            </p>
            <a
              className="btn bt-round btn-round-calypso mt-4"
              href="https://lincocare.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              OUR COMPANY
            </a>
          </div>
        </div>
        <div className="col-6 col-md-6 col-sm-12 col-xs-12 pt-3 mt-2 future-images">
          <div className="col-6 col-md-6 col-sm-6 col-xs-6">
            <Image
              alt="Calypso 1999 to 2019 products"
              height={440}
              src="/about-us/future-1.png"
              width={388}
              // objectFit="contain"
            />
          </div>
          <div className="col-6 col-md-6 col-sm-6 col-xs-6">
            <Image
              alt="Calypso 1999 to 2019 products"
              height={440}
              src="/about-us/future-2.png"
              width={388}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
