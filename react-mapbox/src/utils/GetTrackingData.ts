// @ts-ignore
import * as turf from "@turf/turf";
/**
 * 
 * @param lastIndex Last index fetch from api
 * @param url URL
 * @param drawData update drawData state
 * @param deviceId deviceID 
 */
async function GetTrackingData(
  lastIndex: number,
  url: string,
  drawData: any,
  deviceId: number
) {
  let data;
  try {
    data = await fetch(`${url}=${lastIndex}&track_id=${deviceId}&short=true`, {
      method: "GET",
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
  if (data) {
    const pointsData = data.track[0]?.points;
    const startPoint = data.track[0]?.start_point;
    const multiplier = data.track[0]?.multiplier;
    if (pointsData && pointsData?.length !== 0) {
      const nextIndex = data.track[0]?.last_index;

      let convertData: any[] = [];

      for (let i = 0; i < pointsData.length; i+=2) {
        const pair = [
          pointsData[i + 1] * multiplier + startPoint[1],
          pointsData[i] * multiplier + startPoint[0],
        ];
        convertData.push(pair)
      }

      drawData((prevState: any) => {
        if (prevState) {
          return {
            type: "geojson",
            data: turf.lineString(
              prevState?.data.geometry.coordinates.concat(convertData)
            ),
          };
        } else
          return {
            type: "geojson",
            data: turf.lineString(convertData),
          };
      });
      GetTrackingData(nextIndex, url, drawData, deviceId);
    } else {
      setTimeout(() => {
        GetTrackingData(lastIndex, url, drawData, deviceId);
      }, 700);
    }
  }
}

export default GetTrackingData
