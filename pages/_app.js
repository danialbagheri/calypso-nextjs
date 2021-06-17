import "../styles/globals.css";
import Header from "../components/header";
import "../styles/bootstrap/css/bootstrap-theme.min.css";
import "../styles/bootstrap/css/bootstrap.min.css";
import Head from "next/head";
import store from "../redux/store";
import Footer from "../components/common/footer";
import { Provider } from "react-redux";
import CookieConsent from "react-cookie-consent";

function MyApp({ Component, pageProps }) {
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
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="theme-color" content="#000000" />
        <meta name="twitter:site" content="@calypsosuncare"></meta>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
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
      <Provider store={store}>
        <Header />
        <Component {...pageProps} />
        <CookieConsent
        // onAccept={() => {
        //   alert("Accept was triggered by clicking the Accept button");
        // }}
        >
          We use cookies to ensure that we give you the best experience on our
          website.
        </CookieConsent>

        <Footer />
      </Provider>
    </>
  );
}

export async function getServerSideProps(context) {
  // const res = await fetch("https://api.github.com/repos/vercel/next.js");
  // const json = await res.json();
  // // if (!data) {
  // //   return {
  // //     notFound: true,
  // //   };
  // // }
  // return {
  //   props: { message: "test22" }, // will be passed to the page component as props
  // };
}

export default MyApp;
