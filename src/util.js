export const dateFormat = (time, fmt = 'YYYY-MM-DD') => {
  let date = new Date(time);
  var o = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours() % 12 === 0 ?
      12 :
      date.getHours() % 12,
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  var week = {
    '0': '\u65e5',
    '1': '\u4e00',
    '2': '\u4e8c',
    '3': '\u4e09',
    '4': '\u56db',
    '5': '\u4e94',
    '6': '\u516d'
  }
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ?
      (RegExp.$1.length > 2 ?
        '\u661f\u671f' :
        '\u5468') :
      '') + week[date.getDay() + ''])
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ?
        (o[k]) :
        (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

export const timestampFormat = function(timestamp){
  var date =  new Date()

  date.setTime(Number.parseInt(timestamp) * 1000)

  var year = date.getFullYear()
  var month = "0" + (date.getMonth()+1)
  var hours = "0" + date.getHours()
  var minutes = "0" + date.getMinutes()
  var second = "0" + date.getSeconds()
  var date = "0" + date.getUTCDate()
  

  return year + '-' + 
    month.substr(-2) + '-' + 
    date.substr(-2) + ' ' + "      " +
    hours.substr(-2) + ":" + 
    minutes.substr(-2) + ":" + second.substr(-2)
}
