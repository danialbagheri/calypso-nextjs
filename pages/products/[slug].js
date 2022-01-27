import { useState, useEffect } from "react";
import data from "../../data.json";
import BreadCrumb from "../../components/common/breadcrumb";
import ProductPageImage from "../../components/products/product-page-image";
import ProductDescription from "../../components/products/product-description";
import ProductTabs from "../../components/products/product-tabs";
import Head from "next/head";
import RelatedProduct from "../../components/products/related-products";
import ProductReviews from "../../components/reviews/product-reviews";
import QuestionAndAnswerRow from "../../components/question-and-answers/question-and-answers-row";
import { useShopify } from "../../components/hooks";
import ProductSchema from "../../components/seo/product-schema";

function Product(props) {
  const product = props.productData;
  const childProducts = props.productData.variants;
  const [variantId, setShopifyVariantId] = useState(
    props.productData.variants[0].shopify_storefront_variant_id
  );
  const [selectedPrice, setPrice] = useState(
    props.productData.variants[0].price
  );
  const [pricePer100ml, setPricePer100ml] = useState(
    props.productData.variants[0].price_per_100ml
  );
  const [selectedChildVariation, setSelectedChildVariation] = useState(
    props.productData.variants[0].name
  );
  const [selectedVariant, setSelectedVariant] = useState(
    props.productData.variants[0]
  );
  const [selectedChild, setChild] = useState(props.productData.variants[0].sku);
  const [stores, setWheretoBuyStores] = useState(
    props.productData.variants[0].where_to_buy
  );
  const [shopifyState, setShopifyState] = useState(null);

  const { fetchProductByQuery } = useShopify();

  useEffect(() => {
    const query = {
      query: `variant:[slug:${selectedChild}]`,
    };
    const f = fetchProductByQuery(query);
    f.then((f) => setShopifyState(f[0]));
  }, [selectedChild]);

  const handleChange = (e) => {
    e.preventDefault();
    const selectedProduct = childProducts.find(
      (product) => product.sku === e.target.value
    );
    setSelectedVariant(selectedProduct);
    setShopifyVariantId(selectedProduct.shopify_storefront_variant_id);
    setPrice(selectedProduct.price);
    setPricePer100ml(selectedProduct.price_per_100ml);
    setWheretoBuyStores(selectedProduct.where_to_buy);
    setChild(selectedProduct.sku);
    setSelectedChildVariation(selectedProduct.name);
  };

  const breadCrumbPath = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products/" },
    {
      name: product.types[0],
      url: `/products/?category=${encodeURIComponent(product.types[0])}`,
    },
    { name: product.slug, url: `/products/${product.slug}` },
  ];
  let imageList = [];

  let child = null;

  if (childProducts.length === 1) {
    child = childProducts.map((child, index) => {
      imageList = imageList.concat(child.image_list);
      return <p key={index}>{child.name}</p>;
    });
  } else {
    let options = childProducts.map((child, index) => {
      imageList = imageList.concat(child.image_list);
      return (
        <option value={child.sku} key={index}>
          {child.name}
          {"    "}
          {child.size}
        </option>
      );
    });
    child = (
      <select
        className="ProductOptionSelector"
        onChange={(e) => handleChange(e)}
      >
        {options}
      </select>
    );
  }

  const productDescription = (
    <ProductDescription
      productName={product.name}
      secondTitle={product.sub_title}
      price={selectedPrice}
      pricePer100ml={pricePer100ml}
      description={product.description}
      direction={product.direction_of_use}
      child={child}
      variantId={variantId}
      shopifyState={shopifyState}
      averageReviewScore={product.review_average_score}
      reviewCount={product.total_review_count}
    />
  );
  return (
    <div>
      <ProductSchema product={product} />
      <Head>
        <title>
          Calypso - {product.name} - {product.sub_title}
        </title>
        <meta name="description" content={product.description} />
        <meta name="twitter:card" content="product" />
        <meta name="twitter:description" content={product.description} />
        <meta property="og:image" content={imageList[0].resized} />
        <meta name="twitter:image" content={imageList[0].resized} />
        <meta property="og:price:amount" content={selectedPrice} />
        <meta property="og:price:currency" content="GBP" />
      </Head>
      <div className="container-fluid">
        <div className="row productContainer">
          <div className="col-md-6 col-sm-6 col-xs-12">
            <BreadCrumb breadcrumbs={breadCrumbPath} />
            <ProductPageImage
              imageList={imageList}
              selectedVariant={selectedVariant}
            />
          </div>
          <div className="col-md-6 col-sm-6 col-xs-12">
            {productDescription}
          </div>
        </div>
      </div>
      <section className="row product-second-row">
        <div className="container">
          <ProductTabs
            benefits={product.tags}
            ingredients={product.ingredients}
            stores={stores}
            childProducts={selectedChildVariation}
            selectedChild={selectedChild}
          />
        </div>
      </section>
      <section className="faq-container">
        <QuestionAndAnswerRow
          productSlug={product.slug}
          faq={product.faq_list}
        />
      </section>
      <RelatedProduct related={product.related_products} />
      <div id="readReviews" />
      <ProductReviews
        productSlug={product.slug}
        ProductName={product.name}
        childProducts={childProducts}
        productReviews={product.reviews}
        totalReviewCount={product.total_review_count}
        reviewAverageScore={product.review_average_score}
      />
    </div>
  );
}

export async function getStaticProps(context) {
  const slug = context.params.slug;
  const baseUrl = data.apiUrl;
  const url = baseUrl + `products/single/${slug}/?resize_w=375`;
  const res = await fetch(url);
  const productData = await res.json();
  // key is needed here
  return {
    props: {
      // key: productData.id,
      productData,
    },
    revalidate: 120,
  };
}

async function getAllPages(pageCount, url) {
  let pageNumber = 1;
  let productResult = [];
  for (pageNumber; pageNumber <= pageCount; pageNumber++) {
    let paginatedUrl = url + `?page=${pageNumber}`;
    const res = await fetch(paginatedUrl);
    const products = await res.json();
    productResult.push(products.results);
  }
  return productResult;
}

export async function getStaticPaths() {
  const baseUrl = data.apiUrl;
  const url = baseUrl + `products/product/`;
  const res = await fetch(url);
  const products = await res.json();
  const pageCount = Math.ceil(products.count / 10);
  let productResult = await getAllPages(pageCount, url);
  let slugPaths = [];
  for (let i = 0; i < productResult.length; i++) {
    let slugs = productResult[i].map((item) => {
      return {
        params: {
          slug: item.slug,
        },
      };
    });
    Array.prototype.push.apply(slugPaths, slugs);
  }
  return {
    paths: slugPaths,
    fallback: false,
  };
}

export default Product;
