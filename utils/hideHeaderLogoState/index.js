export function hideHeaderLogoState(router) {
  const pathname = router.pathname.toLowerCase()
  const hideLogo = pathname.includes('user')
  return hideLogo
}
