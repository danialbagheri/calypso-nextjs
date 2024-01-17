export const validateMobileNumber = mobileNumber => {
  const mobileNumberRegex = /^(?:(?:00)?44|0)7(?:[45789]\d{2}|624)\d{6}$/
  const amendedNumber = mobileNumber.replace(/\D/g, '')

  return mobileNumberRegex.test(amendedNumber)
}

export const validateEmail = email => {
  //eslint-disable-next-line
  const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return validRegex.test(email)
}

export const validateName = name => {
  const validRegex = /^[a-zA-Z ]{2,30}$/
  return validRegex.test(name)
}
