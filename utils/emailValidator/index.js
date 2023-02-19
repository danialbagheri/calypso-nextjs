function validateEmail(input) {
  const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  return validRegex.test(input)
}

export {validateEmail}
