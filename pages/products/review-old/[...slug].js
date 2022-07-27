import { useState, useEffect } from "react";
import Head from "next/head";
import data from "../../../data.json";
import BreadCrumb from "../../../components/common/breadcrumb";
import ReviewForm from "../../../components/reviews/ReviewForm";

function Product(props) {
  const product = props.productData;
  const variants = props.productData.variants;

  const breadCrumbPath = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products/" },
    { name: "Review", url: "/products/review/" },
    { name: product.name, url: `/products/review/${product.slug}` },
  ];

  return (
    <div>
      <Head>
        <title>
          Calypso - {product.name} - {product.sub_title}
        </title>
        <meta name="description" content={product.plain_description} />
        <meta name="twitter:card" content="product" />
        <meta name="twitter:description" content={product.plain_description} />

        <meta property="og:price:currency" content="GBP" />
      </Head>
      <div className="container">
        <div className="row">
          <BreadCrumb breadcrumbs={breadCrumbPath} />
          <ReviewForm product={product} variants={variants} />
        </div>
      </div>
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
