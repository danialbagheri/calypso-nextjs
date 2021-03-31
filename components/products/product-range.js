import React from "react";
import { connect } from "react-redux";
import data from "../../data.json";

class ProductRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      products: [],
      childProducts: [],
      variantId: "",
      selectedPrice: "",
    };
    this.addToBasket = this.addToBasket.bind(this);
  }
  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts() {
    const baseUrl = data.apiUrl;
    const type = this.props.type;
    const finalUrl = baseUrl + `products/product/?type=${type}`;
    fetch(finalUrl)
      .then(function (response) {
        return response.json();
      })
      .then(
        (result) => {
          let jsonData = result.results;
          this.setState({
            isLoaded: true,
            products: jsonData,
            childProducts: jsonData[0].variants,
            variantId: jsonData[0].variants[0].shopify_variant_id,
            // selectedPrice: result.products[0].price
            // images: result[0].products[0].images[0]
          });
        },
        (error) => {
          this.setState({
            isLoaded: false,
            error,
          });
        }
      );
  }
  addToBasket(variantId, quantity) {
    const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10) }];
    const checkoutId = this.props.shopify.checkout.id;
    this.props.addVariantToCart(checkoutId, lineItemsToAdd);
  }
  render() {
    const { products } = this.state;
    let product;
    if (products.length >= 1) {
      product = products.map((product) => {
        return (
          <div
            key={product.id}
            className="col-md-3 col-sm-6 col-xs-12 col-lg-3 col-6 productPageSingle"
          >
            <a href={`/products/${product.slug}`}>
              <div className="productPageImageHolder">
                <img
                  className="ProductPageImage"
                  src={product.main_image}
                  alt={product.name}
                />
              </div>
              <p className="textCenter productPageTitle">{product.name}</p>
              <p className="textCenter" style={{ marginTop: 3 }}>
                {product.second_title}
              </p>
            </a>
          </div>
        );
      });
    } else {
      product = <p>there was a problem</p>;
    }
    return <div className="row">{product}</div>;
  }
}

export default ProductRange;

// <button
//   onClick={() => {
//     this.addToBasket(shopifyVariantId, 1);
//   }}
// >
//   BUY NOW
// </button>;
