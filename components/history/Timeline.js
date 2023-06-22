import Styles from '../../styles/timeline.module.css'

export default function Timeline() {
  // Declare a new state variable, which we'll call "count"
  const dryOilImage = '/history/dryoil-tv-ad.png'
  const afterSunRange = '/history/aftersunrange.png'
  const onceADay = '/history/once-a-day-calypso.png'
  const marieCurie = '/history/mariecurie.png'
  const pressAndProtect = '/history/pressprotect.png'
  const which = '/history/which.png'
  const tvAd = '/history/tvad.png'
  const scalp = '/history/scalp.png'
  const findTheFeeling = '/history/findthefeeling.png'
  return (
    <div className={Styles.timeline}>
      <div className={`${Styles.timelineContainer} ${Styles.left}`}>
        <div className={Styles.date}>1988</div>
        <div className={Styles.content}>
          <h2>Founding the brand</h2>
          <p>
            The first products were five sun lotions in SPF2, SPF4, SPF6, SPF8
            and SPF15, one after sun spray and a tanning oil in SPF2. The brand
            Calypso was named after the dance, as it is something fun and
            tropical and the slogan was “Sun care for all the family”. It
            positioned Calypso as a family-friendly brand in the British sun
            care market.
          </p>
        </div>
      </div>
      <div className={`${Styles.timelineContainer} ${Styles.right}`}>
        <div className={Styles.date}>2002</div>
        <div className={Styles.content}>
          <h2>Launch dry oil spray</h2>
          <a
            href="https://www.youtube.com/watch?v=Q_WNF5bYQbc"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              alt="Calypso TV advert Dry Oil"
              className="mb-2"
              src={dryOilImage}
              width="100%"
            />
          </a>
          <p>
            Calypso Dry Oil Spray was developed in 2002 and was a highly-rated
            product as it was non-greasy, quickly absorbed into the skin and
            easy to apply to difficult-to-reach areas. As part of its promotion,
            a TV advertising campaign was launched in 2003.
          </p>
        </div>
      </div>
      <div className={`${Styles.timelineContainer} ${Styles.left}`}>
        <div className={Styles.date}>2004</div>
        <div className={Styles.content}>
          <h2>Development of new after sun products</h2>
          <p>
            The After Sun Lotion with Insect Repellent, Glitter After Sun Gel
            and After Sun Hair and Body Shampoo were launched in 2004 alongside
            new packaging for the whole range. They were all revolutionary
            products for their time and were designed to give customers a wider
            variety of after sun products to choose from to meet their
            individual needs.
          </p>
          <img
            alt="Calypso First After Sun Range"
            className="mb-2 mt-3"
            src={afterSunRange}
            width="100%"
          />
        </div>
      </div>
      <div className={`${Styles.timelineContainer} ${Styles.right}`}>
        <div className={Styles.date}>2007</div>
        <div className={Styles.content}>
          <div className="row">
            <h2>Launch of Once a Day range </h2>
            <div className="col-12 col-xs-12 col-md-6">
              <p>
                In 2007 Calypso Once A Day was added to the range of sun
                protection products, offering all-day protection after one
                application. <br />
                <br />
                Due to a high-quality formulation and intelligent marketing, the
                success of Calypso Once A Day has grown over the years to make
                it the best selling range within the Calypso brand.
              </p>
            </div>
            <div className="col-12 col-xs-12 col-md-6">
              <img
                alt="Calypso Once a day"
                className="mb-2 mt-3"
                src={onceADay}
                width="100%"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={`${Styles.timelineContainer} ${Styles.left}`}>
        <div className={Styles.date}>2011</div>
        <div className={Styles.content}>
          <h2>Partnership with Marie Curie</h2>
          <p>
            Calypso created a 5-year partnership with Marie Curie in 2011, a
            charity that provides care and support through terminal illness.
            Every sale of Calypso sun protection products supported the
            fantastic work carried out by the charity.
          </p>
          <img
            alt="Calypso First After Sun Range"
            className="mb-2 mt-3"
            src={marieCurie}
            width="163px"
          />
        </div>
      </div>
      <div className={`${Styles.timelineContainer} ${Styles.right}`}>
        <div className={Styles.date}>2013</div>
        <div className={Styles.content}>
          <h2>Development of the Press and Protect range</h2>
          <img
            alt="Calypso Press and Protect"
            className="mb-2 mt-3"
            src={pressAndProtect}
            width="100%"
          />
          <p>
            Calypso’s innovative Press and Protect range was launched in 2013.
            It provides a unique Press and Protect Chart on the back of the
            packaging, which can be used as a guide to ensure you are applying
            the correct amount of sunscreen to adequately protect your skin from
            the sun.
          </p>
        </div>
      </div>
      <div className={`${Styles.timelineContainer} ${Styles.left}`}>
        <div className={Styles.date}>2014</div>
        <div className={Styles.content}>
          <h2>The Sun Lotion SPF30 won the Which? award</h2>
          <p>
            Outperforming a number of the major sun care brands, including Piz
            Buin, Hawaiian Tropic and Malibu, Which? not only voted it a Best
            Buy after passing strict British standards but also awarded it the
            Great Value logo, after being the lowest priced sunscreen tested at
            £1.20 per 100ml.
          </p>
          <img
            alt="Calypso Press and Protect which magazine award"
            className="mb-2 mt-3"
            src={which}
            width="156px"
          />
        </div>
      </div>
      <div className={`${Styles.timelineContainer} ${Styles.right}`}>
        <div className={Styles.date}>2016</div>
        <div className={Styles.content}>
          <h2>Launch of Scalp Protection</h2>
          <div className="row">
            <div className="col-12 col-xs-12 col-md-6">
              <p>
                The Scalp Protection SPF30 was launched in 2016 and quickly
                became one of Calypso’s most popular products.
                <br />
                <br />
                It provides instant protection for the hair and scalp from
                harmful UVA and UVB rays and can be sprayed directly through the
                hair onto the scalp.
              </p>
            </div>
            <div className="col-12 col-xs-12 col-md-6">
              <img
                alt="Calypso Press and Protect which magazine award"
                className="mb-2 mt-3"
                src={scalp}
                width="100%"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={`${Styles.timelineContainer} ${Styles.left}`}>
        <div className={Styles.date}>2017/18</div>
        <div className={Styles.content}>
          <h2>START OF 2-year TV ad campaign</h2>
          <a
            href="https://www.youtube.com/watch?v=2AVCGz4VUHo"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              alt="Calypso Press and Protect which magazine award"
              className="mb-2 mt-3"
              src={tvAd}
              width="100%"
            />
          </a>
          <p>
            Calypso launched a survey in 2016 asking the public for their
            feedback on the Once A Day products, and based on its successful
            results they decided to create a TV ad. <br />
            <br />
            The ad showed two women reading the same book on a beach, but one
            finished the book quicker as she was using Once A Day, so she didn’t
            need to reapply her sunscreen. The ad was aired on national TV
            channels in the UK and Ireland in 2017 and 2018.
          </p>
        </div>
      </div>
      <div className={`${Styles.timelineContainer} ${Styles.right}`}>
        <div className={Styles.date}>2018</div>
        <div className={Styles.content}>
          <h2>Received the Ethical Award </h2>
          <p>
            Calypso has been awarded Ethical Accreditation from the Ethical
            Company Organisation every year since 2018. <br />
            <br />
            Not only did the products pass the strict ethical audit, but they
            also received an impressive Ethical Company Index (ECI) score of 92
            out of 100 in the organisation’s Good Shopping Guide.
            <br />
            <br />
            Calypso was listed as one of the top five most ethical sun
            protection brands in the world alongside Green People, Honesty,
            Cabana Sun and incognito.
          </p>
        </div>
      </div>
      <div className={`${Styles.timelineContainer} ${Styles.left}`}>
        <div className={Styles.date}>2019</div>
        <div className={Styles.content}>
          <h2>Find the feeling campaign</h2>
          <img
            alt="Calypso Billboard campaign find the feeling"
            className="mb-2 mt-3"
            src={findTheFeeling}
            width="100%"
          />
          <p>
            Calypso launched its Find the Feeling campaign in 2019, which aimed
            to trigger holiday memories from all those unforgettable family
            moments in the sunshine.
            <br />
            <br />
            The campaign consisted of radio, digital and outdoor advertising in
            the UK, reaching an audience of almost 30,000,000.
          </p>
        </div>
      </div>
    </div>
  )
}
