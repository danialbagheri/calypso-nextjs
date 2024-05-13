export function hideHeaderLogoOrInfoState(router) {
  const pathname = router.pathname.toLowerCase()
  const hideInfoBar =
    pathname.includes('user') ||
    pathname.includes('sign-in') ||
    pathname.includes('password-reset')
  return {hideInfoBar}
}
