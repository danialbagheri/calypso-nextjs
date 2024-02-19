import {getFavoriteProducts} from 'services'

export async function getFavoriteProductsHandler({
  setAppState,
  authFetchHandler,
}) {
  const onAuthenticatedAction = async token => {
    const favoriteProducts = await getFavoriteProducts(token)
    setAppState(prevState => ({
      ...prevState,
      favoriteProducts: favoriteProducts.results,
    }))
  }

  const onNotAuthenticatedAction = () => {
    setAppState(prevState => ({
      ...prevState,
      favoriteProducts: undefined,
      isAuthenticate: false,
    }))
  }

  await authFetchHandler({onAuthenticatedAction, onNotAuthenticatedAction})
}
