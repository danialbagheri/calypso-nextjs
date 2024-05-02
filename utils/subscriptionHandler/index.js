import {userSubscription} from 'services'

export const SUBSCRIPTION_STATE = 'subscriptionState'
export const SUBSCRIBED = 'subscribed'
export const NOT_SUBSCRIBED = 'not_subscribed'
export const PREVIOUSLY_SUBBED = 'PREVIOUSLY_SUBBED'

export const subscriptionHandler = async ({
  email,
  setLoading = () => {},
  setAppState,
}) => {
  try {
    const subscriptionData = await userSubscription({email})

    if (subscriptionData?.status === 'PREVIOUSLY_SUBBED') {
      return {state: false, message: 'This email is subscribed already.'}
    }
    localStorage.setItem(SUBSCRIPTION_STATE, SUBSCRIBED)
    setAppState(prev => ({...prev, [SUBSCRIPTION_STATE]: SUBSCRIBED}))
    return {state: true, message: subscriptionData?.status}
  } catch (err) {
    console.error(err)
    return {status: false, message: err?.statusText}
  } finally {
    setLoading(false)
  }
}
