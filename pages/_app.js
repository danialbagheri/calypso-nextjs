import * as React from 'react'

import {SessionProvider} from 'next-auth/react'
import {Provider} from 'react-redux'
import CookieConsent from 'react-cookie-consent'

import RefreshTokenHandler from '../services/refreshTokenHandler'
import '../styles/globals.css'
import Header from '../components/header'
import '../styles/bootstrap/css/bootstrap-theme.min.css'
import '../styles/bootstrap/css/bootstrap.min.css'
import Head from 'next/head'
import store from '../redux/store'
import Footer from '../components/common/footer/footer'
import InfoBar from '../components/general/InforBar'
import {AppProvider} from 'components/appProvider'
import {MailjetSignUp} from 'components'

function MyApp({Component, pageProps}) {
  const [interval, setInterval] = React.useState(0)

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=1"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#da532c" />
        <link rel="stylesheet" href="https://use.typekit.net/kls3ash.css" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="theme-color" content="#000000" />
        <meta name="twitter:site" content="@calypsosuncare"></meta>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        {/* <!-- Google Tag Manager --> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5WH5SJG');`,
          }}
        />
        {/* <!-- End Google Tag Manager --> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
      <AppProvider>
        <SessionProvider session={pageProps.session} refetchInterval={interval}>
          <Provider store={store}>
            {/* <!-- Google Tag Manager (noscript) --> */}
            <noscript
              dangerouslySetInnerHTML={{
                __html: `
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5WH5SJG"
            height="0"
            width="0"
            style="display:none;visibility:hidden"
          ></iframe>`,
              }}
            />
            <Header />
            <MailjetSignUp />

            <InfoBar />
            <Component {...pageProps} />
            <CookieConsent
              containerClasses="cookie-css"
              contentClasses="cookie-text disableBlur"
              // buttonWrapperClasses="disableBlur"
              // buttonClasses="disableBlur bg-calypso"
              // onAccept={() => {
              //   alert("Accept was triggered by clicking the Accept button");
              // }}
            >
              <div className="cookie-background"> </div>
              We use cookies to ensure that we give you the best experience on
              our website.
            </CookieConsent>

            <Footer />
            <RefreshTokenHandler setInterval={setInterval} />
          </Provider>
        </SessionProvider>
      </AppProvider>
    </>
  )
}

export default MyApp
