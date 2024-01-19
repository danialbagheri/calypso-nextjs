export function hideHeaderLogoOrInfoState(router) {
  const pathname = router.pathname.toLowerCase()
  const hideLogo = pathname.includes('user')
  const hideInfoBar =
    pathname.includes('user') ||
    pathname.includes('sign-in') ||
    pathname.includes('password-reset')
  return {hideLogo, hideInfoBar}
}
