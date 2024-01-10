export function hideHeaderLogoOrInfoState(router) {
  const pathname = router.pathname.toLowerCase()
  const hideLogo = pathname.includes('user')
  const hideInfoBar = pathname.includes('user') || pathname.includes('sign-in')
  return {hideLogo, hideInfoBar}
}
