import ProductRange from "../../components/products/product-range";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Head from "next/head";
import Image from "next/image";
function Products(props) {
  const styles = {
    textAlign: "center",
    width: "auto",
  };
  const tabStyles = {
    color: "#fff !important",
  };

  return (
    <div>
      <Head>
        <title>
          Calypso Products range - Sun Protection, After Sun, Kids products,
          Tanning and Health care
        </title>
        <meta
          name="description"
          content="From scalp protection to insect repellent, we have everything you need to stay protected in the sun both at home and abroad. Our products are available to buy from some of the biggest UK grocery chains as well as some independent pharmacies, and online on Amazon."
        />
      </Head>
      <section className="container-fluid top20">
        <div className="row">
          <div className="col-lg-7 col-md-9 col-xs-12">
            <div className="product-page-banner-image">
              <Image
                alt="Calypso Product Clear Protection"
                src="/product-page/banner-spain.jpg"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="col-lg-5 col-md-3 col-xs-12 m2">
            <h2 className="text-right CalypsoOrangeText">SUN</h2>
            <p className="text-right">
              From scalp protection to insect repellent, we have everything you
              need to <span className="CalypsoOrangeText">stay protected</span>{" "}
              in the sun both at home and abroad. Our products are available to
              buy from some of the biggest UK grocery chains as well as some
              independent pharmacies, and online on Amazon.
            </p>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="top50" />
        <div style={styles} className="productPageTab">
          <Tabs
            activeTab={{
              id: "tab1",
            }}
          >
            <TabList>
              <Tab styles={tabStyles}>Sun Protection</Tab>
              <Tab styles={tabStyles}>After Sun</Tab>
              <Tab styles={tabStyles}>Kids</Tab>
              <Tab styles={tabStyles}>Tanning</Tab>
              <Tab styles={tabStyles}>Health Care</Tab>
            </TabList>
            <TabPanel id="tab1" title="Sun Protection" styles={tabStyles}>
              <div style={{ padding: 10 }}>
                <ProductRange
                  type="sun%20protection"
                  products={props.products}
                />
              </div>
            </TabPanel>
            <TabPanel id="tab2" title="After Sun" styles={tabStyles}>
              <div style={{ padding: 10 }}>
                <ProductRange type="after%20sun" products={null} />
              </div>
            </TabPanel>
            <TabPanel id="tab3" title="Kids" styles={tabStyles}>
              <div style={{ padding: 10 }}>
                <ProductRange type="Kids" products={null} />
              </div>
            </TabPanel>
            <TabPanel id="tab4" title="Tanning" styles={tabStyles}>
              <div style={{ padding: 10 }}>
                <ProductRange type="tanning" products={null} />
              </div>
            </TabPanel>
            <TabPanel id="tab5" title="Health Care" styles={tabStyles}>
              <div style={{ padding: 10 }}>
                <ProductRange type="health%20care" products={null} />
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
export async function getStaticProps(context) {
  const baseUrl = process.env.API_URL;
  const endpoint = `products/product/?type=sun%20protection`;
  const finalUrl = baseUrl + endpoint;
  const res = await fetch(finalUrl);
  const products = await res.json();

  // Now we will get the staff picked articles

  if (!products) {
    return {
      notFound: true,
      isLoaded: false,
    };
  }

  return {
    props: { products: products.results, isLoaded: true }, // will be passed to the page component as props
  };
}
export default Products;
