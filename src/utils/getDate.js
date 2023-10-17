export default () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDay()

  return `${year}${month >= 10 ? month : `0${month}`}${day >=10 >= 10 ? day : `0${day}`}`
}