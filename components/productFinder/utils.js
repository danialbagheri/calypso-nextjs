export const renderChoiceBtnColor = (text, title, isChosen) => {
  if (isChosen) {
    return '#F5AF3F'
  }
  const lowerCaseText = text.toLowerCase()
  const lowerCaseTitle = title.toLowerCase()

  if (lowerCaseTitle.includes('skin tone')) {
    if (lowerCaseText.includes('pale')) {
      return '#FFF8F3'
    } else if (lowerCaseText.includes('fair')) {
      return '#FFEDDF'
    } else if (lowerCaseText.includes('olive')) {
      return '#F9D1B4'
    } else if (lowerCaseText.includes('medium')) {
      return '#D8AE7E'
    }
    return '#766149'
  }
  return '#FFF'
}

export const renderFontColor = (text, title, isChosen) => {
  if (isChosen) {
    return '#FFF'
  }
  if (
    text.toLowerCase().includes('dark skin') &&
    title.toLowerCase().includes('skin tone')
  ) {
    return '#FFF'
  }
  return '#000'
}

export const renderChoiceBtnVariant = (text, title, isChosen) => {
  if (isChosen) {
    return 'contained'
  }
  if (
    text.toLowerCase().includes('skin') &&
    title.toLowerCase().includes('skin tone')
  ) {
    return 'contained'
  }
  return 'outlined'
}
