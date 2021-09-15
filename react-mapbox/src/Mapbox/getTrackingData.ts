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
    data = await fetch(`${url}=${lastIndex}&track_id=${deviceId}&short=true`, {
      method: "GET",
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
  if (data) {
    const pointsData = data.track[0].points;
    const startPoint = data.track[0].start_point;
    const multiplier = data.track[0].multiplier;
    if (pointsData.length !== 0) {
      const nextIndex = data.track[0].last_index;

      let convertData: any[] = [];

      for (let i = 0; i < pointsData.length; i+=2) {
        const pair = [
          pointsData[i + 1] * multiplier + startPoint[1],
          pointsData[i] * multiplier + startPoint[0],
        ];
        convertData.push(pair)
      }

      // const convertData = pointsData.for((coordinate: number, index: number) => [
      //   if(index%2===1)
      //   return
      //   coordinate.x * multiplier + startPoint[0],
      //   coordinate.y * multiplier + startPoint[1],
      // ]);

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
      getTrackingData(nextIndex, url, drawData, deviceId);
    } else {
      setTimeout(() => {
        getTrackingData(lastIndex, url, drawData, deviceId);
      }, 700);
    }
  }
}
