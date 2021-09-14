// @ts-ignore
export async function getTrackingData(
  lastIndex: number,
  url: string,
  drawData: any,
  deviceId: number,
  mapbox: any,
  markers: any
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
      drawData(data.track[0].points, deviceId, mapbox, markers);
      getTrackingData(nextIndex, url, drawData, deviceId, mapbox, markers);
    } else {
      setTimeout(() => {
        getTrackingData(lastIndex, url, drawData, deviceId, mapbox, markers);
      }, 700);
    }
  }
}
