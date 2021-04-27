import { useState, useEffect } from "react";
import data from "../../data.json";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BreadCrumb from "../../components/common/breadcrumb";
import ProductTabs from "../../components/products/product-tabs";
import ProductDescription from "../../components/products/product-description";
import Head from "next/head";
import Image from "next/image";
import ProductReviews from "../../components/reviews/product-reviews";

function Product({ productData }) {
  const [product, setProduct] = useState(productData);
  const [childProducts, setChildProducts] = useState(productData.variants);
  const [variantId, setShopifyVariantId] = useState(
    productData.variants[0].shopify_storefront_variant_id
  );
  const [selectedPrice, setPrice] = useState(productData.variants[0].price);
  const [selectedChildVariation, setselectedChildVariation] = useState(
    productData.variants[0].name
  );
  const [selectedChild, setChild] = useState(productData.variants[0].sku);
  const [stores, setWheretoBuyStores] = useState(
    productData.variants[0].where_to_buy
  );
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let slider1 = [];
  let slider2 = [];
  const productCategoryName = productData.name;
  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, [slider1, slider2]);

  const handleChange = (e) => {
    e.preventDefault();
    const selectedProduct = childProducts.find(
      (product) => product.sku === e.target.value
    );
    setShopifyVariantId(selectedProduct.shopify_storefront_variant_id);
    setPrice(selectedProduct.price);
    setWheretoBuyStores(selectedProduct.where_to_buy);
    setChild(selectedProduct.sku);
    setselectedChildVariation(selectedProduct.name);
  };

  const breadCrumbPath = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products/" },
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

  let images = imageList.map((image, index) => {
    return (
      <div className="thumbnail-holder" key={index}>
        <Image
          // className="SingleProductPageImage"
          src={image.image}
          alt={image.alternate_text}
          layout="responsive"
          width={image.width}
          height={image.height}
        />
      </div>
    );
  });

  const productDescription = (
    <ProductDescription
      productName={product.name}
      secondTitle={product.sub_title}
      price={selectedPrice}
      description={product.description}
      direction={product.direction_of_use}
      child={child}
      variantId={variantId}
      averageReviewScore={product.review_average_score}
      reviewCount={product.total_review_count}
    />
  );
  const productPictures = (
    <div className="product-photo-holder">
      <Slider
        asNavFor={nav2}
        ref={(slider) => (slider1 = slider)}
        className="product-page-main-image top20"
      >
        {images}
      </Slider>

      <Slider
        className="product-image-thumbnail"
        asNavFor={nav1}
        ref={(slider) => (slider2 = slider)}
        slidesToShow={6}
        infinite={false}
        swipeToSlide={true}
        focusOnSelect={true}
        lazyLoad={true}
      >
        {images}
      </Slider>
    </div>
  );
  return (
    <div>
      <Head>
        <title>
          Calypso - {product.name} - {product.sub_title}
        </title>
        <meta name="description" content={product.description} />
      </Head>
      <div className="container-fluid">
        <div className="row productContainer">
          <div className="col-md-6 col-sm-6 col-xs-12">
            <BreadCrumb breadcrumbs={breadCrumbPath} />
            {productPictures}
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
        {/* <QuestionAndAnswerRow productSlug={productCategorySlug} /> */}
      </section>

      <div id="readReviews" />
      <ProductReviews
        productSlug={product.slug}
        ProductName={product.name}
        childProducts={childProducts}
        productReviews={product.reviews}
        totalReviewCount={product.total_review_count}
        reviewAverageScore={product.review_average_score}
      />
      {/* <RelatedProducts products={childProducts} /> */}
    </div>
  );
}

export async function getStaticProps(context) {
  const slug = context.params.slug;
  const baseUrl = data.apiUrl;
  const url = baseUrl + `products/single/${slug}/?resize_w=375`;
  const res = await fetch(url);
  const productData = await res.json();

  return {
    props: {
      productData,
    },
    revalidate: 1,
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
