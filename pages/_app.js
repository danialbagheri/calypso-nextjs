import "../styles/globals.css";
import Header from "../components/header";
import "../styles/bootstrap/css/bootstrap-theme.min.css";
import "../styles/bootstrap/css/bootstrap.min.css";
import Head from "next/head";
import store from "../redux/store";
import Footer from "../components/common/footer";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
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
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="theme-color" content="#000000" />
        <meta name="twitter:site" content="@calypsosuncare"></meta>
        {/* <link rel="stylesheet" href="https://use.typekit.net/kls3ash.css" /> */}
        {/* <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        /> */}
        {/* <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.0.13/css/all.css"
          integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp"
          crossorigin="anonymous"
        /> */}
      </Head>
      <Provider store={store}>
        <Header message={"message"} />
        <Component {...pageProps} />
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
