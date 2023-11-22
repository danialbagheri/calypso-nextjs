export function hexToRgba(hex, alpha) {
  // Remove the hash (#) if it exists
  hex = hex.replace(/^#/, '')

  // Parse the hex value into separate RGB components
  const bigint = parseInt(hex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  // Calculate the alpha value (opacity)
  const normalizedAlpha = alpha >= 0 && alpha <= 1 ? alpha : 1

  // Return the RGBA value as a string
  return `rgba(${r}, ${g}, ${b}, ${normalizedAlpha})`
}
