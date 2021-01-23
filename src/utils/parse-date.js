module.exports = function (mode, date) {
  const y = String(date.getFullYear())
  const m = String(date.getMonth() + 1)
  const d = String(date.getDate())
  let result = null
  switch (mode) {
    case 'y-m-d':
      result = `${y}-${m}-${d}`
      break
    case '2y-2m-2d':
      result = `${y.substring(2)}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`
      break
    case '4y-2m-2d':
      result = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`
      break
  }
  return result
}
