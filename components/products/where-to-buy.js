import React from "react";

export default class WhereToBuy extends React.Component {
  render() {
    const { stores, childProducts } = this.props;

    let thisProductStore;
    if (stores.length >= 1) {
      thisProductStore = stores.map((store, index) => {
        return (
          <li key={index}>
            <a href={store.url} target="_blank" rel="noopener noreferrer">
              <img src={store.stockist.logo} alt={store.stockist.name} />
            </a>
          </li>
        );
      });
    } else {
      thisProductStore = <li>All good pharmacies.</li>;
    }
    let products;

    products = <p>{childProducts} is available from:</p>;

    return (
      <div>
        <div className="childProduct">{products}</div>
        <ul className="stores">{thisProductStore}</ul>
      </div>
    );
  }
}
