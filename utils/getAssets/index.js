import {getIcons, getTopBar} from 'services'

export const assetsEndPoints = {
  checkIcon: 'check-icon',
  creatingAccountBenefits: 'creating-account-benefits',
  infoIcon: 'info-icon',
  popUpPassword: 'pop-up-password',
  popUpReferrals: 'pop-up-referrals',
  userAccountTopIcons: 'user-account-top-icons',
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
