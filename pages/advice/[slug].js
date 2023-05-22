import BlogSlider from '../../components/blogs/blog-slider'
import ShareButton from '../../components/common/shareButton'
import Image from 'next/image'
import data from '../../data.json'
import Head from 'next/head'

function Article({blog}) {
  let blogColor = blog.backround_color_hex
    ? blog.backround_color_hex
    : '#ffb900'
  const customColor = {
    backgroundImage: `linear-gradient(to left,rgba(255, 0, 0, 0) 2%,${blogColor} 40%)`,
  }
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
      <Head>
        <title>{blog.title} by Calypso Sun</title>
        <meta name="description" content={blog.excerpt} />
      </Head>
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
              <div className="d-flex">
                <div className="blog-title-share-icon">
                  <ShareButton text={blog.title} />
                </div>
                <p className="flatRight">{blog.read_time}</p>
              </div>
              <picture>
                <Image
                  itemProp="url contentUrl"
                  src={blog.image || '/advice/placeholder.png'}
                  className="blog-post-image"
                  alt={blog.alt_text}
                  height={blog.image_height}
                  width={blog.image_width}
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
              dangerouslySetInnerHTML={{__html: blog.body}}
            />
            {/* <RelatedProducts products={blog.related_products} /> */}
          </div>
        </div>
      </div>

      <BlogSlider />
      <div className="top50" />
    </article>
  )
  const singleBlogPage = blog ? content : <div className="p-2 general-loader" />
  return singleBlogPage
}

export async function getStaticProps(context) {
  const slug = context.params.slug
  const baseUrl = data.apiUrl
  const url = baseUrl + 'blogs/all/' + slug + '/?resize_h=510'
  const res = await fetch(url)
  const blog = await res.json()

  return {
    props: {
      blog,
    },
    revalidate: 120,
  }
}

async function getAllPages(pageCount, url) {
  let pageNumber = 1
  let blogsResult = []
  for (pageNumber; pageNumber <= pageCount; pageNumber++) {
    let paginatedUrl = url + `?page=${pageNumber}`
    const res = await fetch(paginatedUrl)
    const blogs = await res.json()
    blogsResult.push(blogs.results)
  }
  return blogsResult
}

export async function getStaticPaths() {
  // const baseUrl = data.apiUrl;
  const baseUrl = 'https://service.calypsosun.com/api/'
  const url = baseUrl + `blogs/all/`
  const res = await fetch(url)
  const blogs = await res.json()
  const pageCount = Math.ceil(blogs.count / 10)
  let blogsResult = await getAllPages(pageCount, url)
  let slugPaths = []
  for (let i = 0; i < blogsResult.length; i++) {
    let slugs = blogsResult[i].map(item => {
      return {
        params: {
          slug: item.slug,
        },
      }
    })
    Array.prototype.push.apply(slugPaths, slugs)
  }
  return {
    paths: slugPaths,
    fallback: false,
  }
}
export default Article
