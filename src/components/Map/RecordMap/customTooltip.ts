import dayjs from 'dayjs'

const customTooltip = (params: any[]) => {
    let renderString = ''
    params.forEach((line) => {
        if (line?.seriesName === 'Thời gian') {
            console.log(line?.value)
            const newRenderString = `<div style="text-align: start"> <span style="font-weight: bold; font-family: sans-serif"> ${line?.seriesName} </span>: ${dayjs
                .utc(line?.value, 'DDMMYYHHmmss')
                .local()
                .format('DD/MM/YY HH:mm:ss')} </div> `

            renderString = renderString.concat(newRenderString)
        } else {
            const newRenderString = `<div style="text-align: start"> <span style="font-weight: bold; font-family: sans-serif"> ${line?.seriesName} </span>: ${line?.value?.toFixed(
                2
            )} ${getUnit(line?.seriesName) || ''} </div> `
            renderString = renderString.concat(newRenderString)
        }
    })
    return renderString
}

// const getBrand = (key: string) => {
//   switch (key) {
//     case "distance":
//       return "Quãng đường"
//     case "speed":
//       return "Vận tốc"
//     case "accuracy":
//       return "Độ chính xác"
//     default:
//       break;
//   }
// }

const getUnit = (key: string) => {
    switch (key) {
        case 'Quãng đường':
            return 'm'
        case 'Vận tốc':
            return 'km/h'
        case 'Độ chính xác':
            return 'cm'
        default:
            break
    }
}

export default customTooltip
