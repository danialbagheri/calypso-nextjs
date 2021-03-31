import { useState, useEffect } from "react";
import BlogSlider from "../../components/blogs/blog-slider";
import ShareButton from "../../components/common/shareButton";
// import RelatedProducts from "./RelatedProducts";
import data from "../../data.json";

function Article({ blog }) {
  let blogColor = blog.backround_color_hex
    ? blog.backround_color_hex
    : "#ffb900";
  const customColor = {
    backgroundImage: `linear-gradient(to left,rgba(255, 0, 0, 0) 2%,${blogColor} 40%)`,
  };
  const content = (
    <article
      className="jumbotron top20"
      itemProp="blogPosts"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <meta name="Keywords" content={blog.focus_keyword} />
      <meta property="og:title" content={blog.title} />
      <meta property="og:url" content="https://calypsosun.com/blog/" />
      <meta property="og:image" content={blog.resized} />
      <div className="container">
        <div className="row">
          <div className="col-md-2 col-12" />
          <div className="col-md-8 col-12">
            <figure
              itemProp="image"
              itemScope
              itemType="https://schema.org/ImageObject"
            >
              <h1 className="blog-title" itemProp="name headline">
                {blog.title}
              </h1>
              <div className="blog-title-share-icon">
                <ShareButton text={blog.title} />
              </div>
              <picture>
                <img
                  itemProp="url contentUrl"
                  src={blog.resized}
                  className="blog-post-image"
                  alt={blog.alt_text}
                />
              </picture>
              <meta itemProp="width" content="640" />
              <meta itemProp="height" content="320" />
            </figure>
            <time
              className="date-blog-added"
              dateTime="2015-03-26T10:43:39Z"
              itemProp="datePublished"
            >
              {blog.date_added}
            </time>

            <div
              itemProp="articleBody"
              dangerouslySetInnerHTML={{ __html: blog.body }}
            />
            {/* <RelatedProducts products={blog.related_products} /> */}
          </div>
        </div>
      </div>

      <BlogSlider />
      <div className="top50" />
    </article>
  );
  const singleBlogPage = blog ? (
    content
  ) : (
    <div className="p-2 general-loader" />
  );
  return singleBlogPage;
}

export async function getStaticProps(context) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  //   const router = useRouter();
  //   const { slug } = router.query;
  const slug = context.params.slug;
  const baseUrl = data.apiUrl;
  const url = baseUrl + "blogs/all/" + slug + "/?resize_h=510";
  const res = await fetch(url);
  const blog = await res.json();

  return {
    props: {
      blog,
    },
    revalidate: 1,
  };
}
export async function getStaticPaths() {
  const baseUrl = data.apiUrl;
  const url = baseUrl + "blogs/all/";
  const res = await fetch(url);
  const blogs = await res.json();
  let pageNumber = 1;
  let slugPaths = blogs.results.map((item) => {
    return {
      params: {
        slug: item.slug,
      },
    };
  });

  //   do {
  //     fetch(blogs.next)
  //       .then((res) => res.json())
  //       .then((res) =>
  //         res.results.map((item) =>
  //           slugPaths.concat({ params: { slug: item.slug } })
  //         )
  //       );
  //   } while (blogs.next);
  console.log(slugPaths);
  return {
    paths: slugPaths,
    fallback: false,
  };
}
export default Article;
