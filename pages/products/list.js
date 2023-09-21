import 'react-tabs/style/react-tabs.css'
import Head from 'next/head'

function Products(props) {
  const products = props.products

  const productList = products.map((product, index) => {
    const variants = product.variants.map(variant => {
      return (
        <tr key={index} style={styles.TableRow}>
          <td>{variant.id}</td>
          <td>{product.name}</td>
          <td>{product.sub_title}</td>
          <td>
            {product.types[0]}
            {product.types[1] && ', ' + product.types[1]}
          </td>
          <td>{variant.sku}</td>
          <td>{product.review_average_score}</td>
          <td>£{variant.price}</td>
          <td>€{variant.euro_price}</td>
          <td>{variant.name}</td>
          <td>{variant.size}</td>
          <td>{variant.inventory_quantity}</td>
          <td>{variant.barcode}</td>
        </tr>
      )
    })

    return <>{variants}</>
  })

  return (
    <div>
      <Head>
        <title>
          Calypso Products range - Sun Protection, After Sun, Kids products,
          Tanning and Health care
        </title>
        <meta
          content="From scalp protection to insect repellent, we have everything you need to stay protected in the sun both at home and abroad. Our products are available to buy from some of the biggest UK grocery chains as well as some independent pharmacies, and online on Amazon."
          name="description"
        />
      </Head>
      <section className="container-fluid top20">
        <table style={styles.Table}>
          <tr style={styles.TableHead}>
            <th>#</th>
            <th>Product Name</th>
            <th>Sub title</th>
            <th>Category</th>
            <th>SKU</th>
            <th>Review score</th>
            <th>Price</th>
            <th>Euro Price</th>
            <th>Type</th>
            <th>Size</th>
            <th>Inventory Quantity</th>
            <th>Barcode</th>
          </tr>
          {productList}
        </table>
      </section>
    </div>
  )
}

const styles = {
  Table: {
    width: '100%',
    maxWidth: '100%',
    // textAlign: "center",
  },
  TableHead: {
    height: '4rem',
    backgroundColor: '#FF5E2B',
    color: 'white',
  },

  TableRow: {
    height: '4rem',
    backgroundColor: 'white',
    borderBottom: '1px solid #FF5E1F',
  },
}

async function getAllPages(pageCount, url) {
  let pageNumber = 1
  const productResult = []
  for (pageNumber; pageNumber <= pageCount; pageNumber++) {
    const paginatedUrl = url + `?page=${pageNumber}`
    const res = await fetch(paginatedUrl)
    const product = await res.json()
    productResult.push(product.results)
  }
  return productResult
}
export async function getStaticProps() {
  const baseUrl = process.env.API_URL
  const endpoint = 'products/product/'
  const finalUrl = baseUrl + endpoint
  const res = await fetch(finalUrl)
  const products = await res.json()
  const pageCount = Math.ceil(products.count / 10)
  const productResult = await getAllPages(pageCount, finalUrl)
  // Now we will get the staff picked articles

  if (!productResult) {
    return {
      notFound: true,
      isLoaded: false,
    }
  }

  return {
    props: {products: productResult.flat(), isLoaded: true},
    revalidate: 120, // will be passed to the page component as props
  }
}

export default Products
