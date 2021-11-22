function SecondFormat(d: any) {
    d = Number(d)
    var h = Math.floor(d / 3600)
    var m = Math.floor((d % 3600) / 60)
    var s = Math.floor((d % 3600) % 60)
    var hDisplay = h > 0 ? h + (h === 1 ? 'h' : 'h') + (m > 0 || s > 0 ? ' ' : '') : ''
    var mDisplay = m > 0 ? m + (m === 1 ? 'm' : 'm') + (s > 0 ? ' ' : '') : ''
    var sDisplay = s > 0 ? s + (s === 1 ? 's' : 's') : ''
    return hDisplay + mDisplay + sDisplay
}

export default SecondFormat
