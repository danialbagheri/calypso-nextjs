import {userSubscription} from 'services'

export const SUBSCRIPTION_STATE = 'subscriptionState'
export const SUBSCRIBED = 'subscribed'

export const subscriptionHandler = async ({
  email,
  setLoading = () => {},
  setAppState,
}) => {
  try {
    await userSubscription({email})
    localStorage.setItem(SUBSCRIPTION_STATE, SUBSCRIBED)
    setAppState(prev => ({...prev, [SUBSCRIPTION_STATE]: SUBSCRIBED}))
    return true
  } catch (err) {
    console.error(err)
    return false
  } finally {
    setLoading(false)
  }
}
