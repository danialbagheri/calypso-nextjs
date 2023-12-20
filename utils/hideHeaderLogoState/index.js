export function hideHeaderLogoState(router) {
  const pathname = router.pathname.toLowerCase()
  const hideLogo = pathname.includes('login')
  return hideLogo
}
