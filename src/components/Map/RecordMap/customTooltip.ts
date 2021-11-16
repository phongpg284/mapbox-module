const customTooltip = (params: any[]) => {
    let renderString = ""
    params.forEach((line) => {
        const newRenderString = `<div style="text-align: start"> <span style="font-weight: bold; font-family: sans-serif"> ${(line?.seriesName)} </span>: ${line?.value?.toFixed(2)} ${getUnit(line?.seriesName) || ""} </div> `
      renderString = renderString.concat(newRenderString)
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
    case "Quãng đường":
      return "m"
    case "Vận tốc":
      return "km/h"
    case "Độ chính xác":
      return "cm"
    default:
      break;
  }
}

export default customTooltip