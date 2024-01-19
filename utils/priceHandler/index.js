export const priceHandler = ({price, currency}) => {
  const properPrice = Number(price)

  const formattedAmount = properPrice.toLocaleString('en-GB', {
    style: 'currency',
    currency: currency,
  })
  return formattedAmount
}
