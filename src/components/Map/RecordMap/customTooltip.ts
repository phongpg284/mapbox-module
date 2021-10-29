const customTooltip = (params: any[]) => {
    let renderString = ""
    params.forEach((line) => {
      console.log(line)
        const newRenderString = `<div style="text-align: start"> <span style="font-weight: bold"> ${line?.seriesName} </span>: ${line?.value} ${getUnit(line?.seriesName) || ""} </div> `
      renderString = renderString.concat(newRenderString)
    })
    return renderString
}

const getUnit = (key: string) => {
  switch (key) {
    case "distance":
      return "km"
    case "speed":
      return "km/h"
    case "accuracy":
      return "cm"
    default:
      break;
  }
}

export default customTooltip