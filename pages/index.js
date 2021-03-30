import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Calypso Sun</title>
      </Head>

      <main className={styles.main}>
        <section className="top-0">
          <HomeSlider />
          <Suspense
            fallback={
              <Loader
                type="ball-pulse"
                active={true}
                color="orange"
                size="Large"
                className="p-2 general-loader"
              />
            }
          >
            <div className="container-fluid">
              <Trending />
            </div>
          </Suspense>
          <Suspense
            fallback={
              <Loader
                type="ball-pulse"
                active={true}
                color="orange"
                size="Large"
                className="p-2 general-loader"
              />
            }
          >
            <StaySafe />
            <AsSeen />
            <BlogSlider />
            <Instagram />
          </Suspense>
        </section>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
