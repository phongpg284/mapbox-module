// @ts-ignore
import * as turf from "@turf/turf";

export async function getTrackingData(
  lastIndex: number,
  url: string,
  drawData: any,
  deviceId: number
) {
  let data;
  try {
    data = await fetch(`${url}=${lastIndex}&track_id=${deviceId}`, {
      method: "GET",
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
  if (data) {
    const pointsData = data.track[0].points;
    if (pointsData.length !== 0) {
      const nextIndex = pointsData[pointsData.length - 1].index;
      
      const convertData = pointsData.map((coordinate: any) => [
        coordinate.y,
        coordinate.x,
      ]);
      
      drawData((prevState: any) => {
        if(prevState) {
          return {
            type: "geojson",
            data: turf.lineString(prevState?.data.geometry.coordinates.concat(convertData))
          }
        }
        else 
        return {
          type: "geojson",
          data: turf.lineString(convertData)
        }
      });
      getTrackingData(nextIndex, url, drawData, deviceId);
    } else {
      setTimeout(() => {
        getTrackingData(lastIndex, url, drawData, deviceId);
      }, 1000);
    }
  }
}
