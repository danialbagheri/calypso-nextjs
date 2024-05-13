import {BlogSlider} from 'components'
import ShareButton from 'components/common/shareButton/ShareButton'
import Image from 'next/image'
import data from '../../data.json'
import Head from 'next/head'
import {Box} from '@mui/system'

function Article({blog}) {
  const content = (
    <article
      className="jumbotron top20"
      itemProp="blogPosts"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <meta content={blog.focus_keyword} name="Keywords" />
      <meta content={blog.title} property="og:title" />
      <meta content="https://calypsosun.com/blog/" property="og:url" />
      <meta content={blog.resized} property="og:image" />
      <Head>
        <title>{blog.title} by Calypso Sun</title>
        <meta content={blog.excerpt} name="description" />
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
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '400px',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <Image
                  alt={blog.alt_text}
                  className="blog-post-image"
                  fill={true}
                  itemProp="url contentUrl"
                  sizes="100vw"
                  src={blog.image || '/advice/placeholder.png'}
                  style={{objectFit: 'cover'}}
                  // height={blog.image_height}
                  // width={blog.image_width}
                />
              </Box>

              <meta content="640" itemProp="width" />
              <meta content="320" itemProp="height" />
            </figure>
            <time
              className="date-blog-added"
              dateTime="2015-03-26T10:43:39Z"
              itemProp="datePublished"
            >
              {blog.date_added}
            </time>

            <div
              dangerouslySetInnerHTML={{__html: blog.body}}
              itemProp="articleBody"
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
  const blogsResult = []
  for (pageNumber; pageNumber <= pageCount; pageNumber++) {
    const paginatedUrl = url + `?page=${pageNumber}`
    const res = await fetch(paginatedUrl)
    const blogs = await res.json()
    blogsResult.push(blogs.results)
  }
  return blogsResult
}

export async function getStaticPaths() {
  // const baseUrl = data.apiUrl;
  const baseUrl = 'https://service.calypsosun.com/api/'
  const url = baseUrl + 'blogs/all/'
  const res = await fetch(url)
  const blogs = await res.json()
  const pageCount = Math.ceil(blogs.count / 10)
  const blogsResult = await getAllPages(pageCount, url)
  const slugPaths = []
  for (let i = 0; i < blogsResult.length; i++) {
    const slugs = blogsResult[i].map(item => {
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
