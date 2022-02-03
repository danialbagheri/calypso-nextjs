import { useShopify } from "../../hooks";

export default function AddToBasket(props) {
  const { addVariant, checkoutState, openCart } = useShopify();

  function addToBasket(variantId, quantity) {
    const lineItemsToAdd = [
      {
        variantId: variantId,
        quantity: parseInt(quantity, 10),
      },
    ];
    addVariant(checkoutState.id, lineItemsToAdd);
    openCart();
  }

  return (
    <div style={divStyle.container}>
      <button
        style={divStyle.button}
        onClick={() => {
          addToBasket(props.variantId, props.quantity);
        }}
      >
        ADD TO CART
      </button>
    </div>
  );
}

const divStyle = {
  container: {
    display: "block",
    marginTop: "1rem",
  },
  button: {
    backgroundColor: "#ff6b00",
    color: "#fff",
    border: "none",
    fontSize: "14px",
    padding: "8px 8px",
  },
};
