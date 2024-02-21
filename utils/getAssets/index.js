import {getIcons, getTopBar} from 'services'

/* --------------------------- USER ACCOUNT ICONS --------------------------- */
export const WISH_LIST_FILL_ICON_ID = 22
export const WISH_LIST_OUTLINED_ICON_ID = 23
export const LOG_OUT_ICON_ID = 24
export const USER_LOGGED_IN_ICON_ID = 25
export const USER_LOGGED_OUT_ICON_ID = 26
export const CART_ICON_ID = 27
export const REMOVE_ICON_ID = 28
export const SEARCH_ICON_ID = 30
export const BURGER_ICON_ID = 31
/* -------------------------------------------------------------------------- */

/* ----------------------------- INFO BAR ICONS ----------------------------- */
export const MADE_IN_UK_ICON_ID = 19
export const FREE_DELIVERY_ICON_ID = 20
export const STAR_RATE_ICON_ID = 21
/* -------------------------------------------------------------------------- */

export const assetsEndPoints = {
  checkIcon: 'check-icon',
  creatingAccountBenefits: 'creating-account-benefits',
  infoIcon: 'info-icon',
  popUpPassword: 'pop-up-password',
  popUpReferrals: 'pop-up-referrals',
  userAccountTopIcons: 'user-account-top-icons',
  userAccount: 'user-account',
  infoBar: 'info-bar',
}

/**
 *
 * @param {*} props: an array of strings as keys of the above endpoints object
 * props is an array of strings that represent the assets you want to get
 * @returns
 * returns an object with the assets you requested
 */

export async function getAssets(props = []) {
  const promises = []
  const assets = {}

  props.forEach(prop => {
    switch (prop) {
      /* ------------------------------ Get Icons API ----------------------------- */
      case assetsEndPoints.checkIcon:
        promises.push(getIcons(prop))
        break
      case assetsEndPoints.infoIcon:
        promises.push(getIcons(prop))
        break
      case assetsEndPoints.userAccountTopIcons:
        promises.push(getIcons(prop))
        break
      case assetsEndPoints.userAccount:
        promises.push(getIcons(prop))
        break
      case assetsEndPoints.infoBar:
        promises.push(getIcons(prop))
        break
      /* -------------------------------------------------------------------------- */

      /* ----------------------------- Get Top Bar API ---------------------------- */
      case assetsEndPoints.creatingAccountBenefits:
        promises.push(getTopBar(prop))
        break
      case assetsEndPoints.popUpPassword:
        promises.push(getTopBar(prop))
        break
      case assetsEndPoints.popUpReferrals:
        promises.push(getTopBar(prop))
        break
      /* -------------------------------------------------------------------------- */

      default:
        console.error("Asset doesn't exist")
        break
    }
  })

  const results = await Promise.allSettled(promises)

  props.forEach((prop, index) => {
    assets[prop] =
      results[index].status === 'fulfilled' ? results[index].value : null
  })

  return assets
}
