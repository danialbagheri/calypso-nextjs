import { useState, useEffect } from "react";
import BreadCrumb from "../../components/common/breadcrumb";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Advice({ posts, count, baseUrl }) {
  const [blogs, setBlogs] = useState(posts);
  const [page, setPage] = useState(2);
  const [moreToLoad, setMoreToLoad] = useState(true);
  function getMoreBlogs() {
    const endpoint = `${baseUrl}blogs/all/?resize_w=500&page=${page}`;
    fetch(endpoint)
      .then((res) => res.json())
      .then((res) => {
        let result = res.results;
        let postCopy = posts;
        Array.prototype.push.apply(postCopy, result);
        setBlogs(postCopy);
      });
  }

  useEffect(() => {
    getMoreBlogs();
  }, [blogs]);
  function loadMore(evt) {
    evt.preventDefault();
    console.log(page);
    const maxPageCount = Math.ceil(count / 10);
    if (page <= maxPageCount) {
      let newPage = page + 1;
      setPage(newPage);
      getMoreBlogs();
    } else {
      setMoreToLoad(false);
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
    thumbnail = blogs.map((blog, index) => {
      return (
        <div className="col-12 col-md-4 col-sm-6 mb-2 " key={index}>
          <Link href={`/advice/${blog.slug}`} className="disableLink">
            <div className="blog-card bg-white">
              <div className="blog-image">
                <Image
                  src={blog.resized || "/advice/placeholder.png"}
                  alt={blog.image_alt_text}
                  layout="responsive"
                  height={blog.image_height}
                  width={blog.image_width}
                />
              </div>
              <div className="card-body">
                <p className="card-title">{blog.title}</p>
                <p>{blog.publish_date}</p>
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
          {moreToLoad ? (
            <button
              className="text-centre btn btn-outline-calypso mb-3"
              onClick={(evt) => {
                loadMore(evt);
              }}
            >
              Load More
            </button>
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const baseUrl = process.env.API_URL;
  const endpoint = "blogs/all/?resize_w=500";
  const finalUrl = baseUrl + endpoint;
  const res = await fetch(finalUrl);
  const articles = await res.json();

  if (!articles) {
    return {
      notFound: true,
      isLoaded: false,
    };
  }

  return {
    props: {
      baseUrl: baseUrl,
      posts: articles.results,
      isLoaded: true,
      count: articles.count,
    }, // will be passed to the page component as props
  };
}
