import { useState } from "react";
import BreadCrumb from "../../components/common/breadcrumb";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Styles from "../../styles/adviceIndex.module.css";
import _ from "lodash";
// import BlogFilters from "../../components/blogs/blog-filters";

export default function Advice({ posts, count }) {
  const [blogs, setBlogs] = useState(posts);
  const [limit, setLimit] = useState(10);
  const [maxLimit, setMaxLimit] = useState(false);

  function loadMore() {
    const newLimit = limit + 10;
    if (newLimit >= blogs.length) {
      setLimit(blogs.length);
      setMaxLimit(true);
    } else {
      setLimit(newLimit);
    }
  }

  let thumbnail;
  const breadcrumbPath = [
    { name: "Home", url: "/" },
    { name: "Articles", url: "/articles" },
  ];
  if (!blogs) {
    thumbnail = <div> Loading...</div>;
  } else {
    thumbnail = blogs.slice(0, limit).map((blog, index) => {
      return (
        <div className="col-12 col-md-4 col-sm-6 mb-2 " key={index}>
          <Link href={`/advice/${blog.slug}`} className="disableLink">
            <div className="blog-card bg-white">
              <div className="blog-image">
                <Image
                  src={blog.resized || "/advice/placeholder.png"}
                  alt={blog.image_alt_text}
                  layout="fill"
                  objectFit="cover"
                  // height={blog.image_height}
                  // width={blog.image_width}
                />
              </div>
              <div className={Styles.CardBody}>
                <p className="card-title">{blog.title}</p>
                <small>
                  {blog.read_time} • {blog.publish_date}
                </small>
              </div>
              <div className="card-footer">
                <div className="read-more">Read More</div>
              </div>
            </div>
          </Link>
        </div>
      );
    });
  }
  return (
    <div className="container-fluid bg-secondary mt-0">
      <div className="CalypsoOrange">
        <h1 className="text-centre mt-4">Advice</h1>
        <div className="blogBreadCrumbs">
          <BreadCrumb breadcrumbs={breadcrumbPath} />
        </div>
        {/* <BlogFilters /> */}
      </div>
      <div className="container">
        <Head>
          <title>Calypso Advice</title>
          <meta
            name="description"
            content="Advice about Sun Care, Skin Care, Holiday and every in between."
          />
        </Head>
        <div className="row">{thumbnail}</div>
        <div className="text-centre">
          {maxLimit ? null : (
            <button
              className="text-centre btn btn-outline-calypso mb-3"
              onClick={(evt) => {
                loadMore(evt);
              }}
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
async function getAllPages(pageCount, url) {
  let pageNumber = 1;
  let blogResult = [];
  for (pageNumber; pageNumber <= pageCount; pageNumber++) {
    let paginatedUrl = url + `&page=${pageNumber}`;
    const res = await fetch(paginatedUrl);
    const product = await res.json();
    blogResult.push(product.results);
  }
  return blogResult;
}

export async function getStaticProps() {
  const baseUrl = process.env.API_URL;
  const endpoint = "blogs/all/?resize_w=500";
  const finalUrl = baseUrl + endpoint;
  const res = await fetch(finalUrl);
  const articles = await res.json();
  const pageCount = Math.ceil(articles.count / 10);
  let blogResult = await getAllPages(pageCount, finalUrl);

  if (!articles) {
    return {
      notFound: true,
      isLoaded: false,
    };
  }

  return {
    props: {
      posts: blogResult.flat(),
      isLoaded: true,
    }, // will be passed to the page component as props
    revalidate: 120,
  };
}
