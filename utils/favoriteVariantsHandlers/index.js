import {getFavoriteVariants} from 'services'

export async function getFavoriteVariantsHandler({
  setAppState,
  authFetchHandler,
}) {
  const onAuthenticatedAction = async token => {
    const favoriteProducts = await getFavoriteVariants(token)

    setAppState(prevState => ({
      ...prevState,
      favoriteVariants: favoriteProducts.results,
      isAuthenticate: true,
    }))
  }

  const onNotAuthenticatedAction = () => {
    setAppState(prevState => ({
      ...prevState,
      favoriteVariants: undefined,
      isAuthenticate: false,
    }))
  }

  await authFetchHandler({onAuthenticatedAction, onNotAuthenticatedAction})
}
