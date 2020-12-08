/* glob clientWindow*/
export function getQueryVariable(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var arr = window.location.href.split('?')
  var r = arr[1].match(reg)
  if (r != null) return unescape(r[2])
  return null
}
export function formentTime(date) {
  var s
  let data = new Date(parseInt(date))
  var hours = data.getHours()
  var minutes = data.getMinutes()
  s =
    (hours < 10 ? '0' + hours : hours) +
    ':' +
    (minutes < 10 ? '0' + minutes : minutes)
  return s
}
export function getPlane() {
  var u = navigator.userAgent
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  if (isiOS) {
    return true
  } else {
    return false
  }
}
