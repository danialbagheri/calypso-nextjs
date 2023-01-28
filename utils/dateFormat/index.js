const dateFormat = date => {
  const month = {
    jan: 'January',
    feb: 'February',
    mar: 'March',
    apr: 'April',
    may: 'May',
    jun: 'June',
    jul: 'July',
    aug: 'August',
    sep: 'September',
    oct: 'October',
    nov: 'November',
    dec: 'December',
  }

  const dateArr = date.split(' ')
  return `${dateArr[0]} ${month[dateArr[1].toLowerCase()]} ${
    +dateArr[2] + 2000
  }`
}

export {dateFormat}
