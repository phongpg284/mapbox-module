// @ts-ignore
export async function getTrackingData(
  lastIndex: number,
  url: string,
  drawData: any
) {
  let data;
  try {
    data = await fetch(`${url}=${lastIndex}`, {
      method: "GET",
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
  if (data) {
    const pointsData = data.track[0].points;
    if (pointsData.length !== 0) {
      const nextIndex = pointsData[pointsData.length - 1].index + 1;
      drawData(data.track);
      getTrackingData(nextIndex, url, drawData);
    } else {
      setTimeout(() => {
        getTrackingData(lastIndex, url, drawData);
      }, 500);
    }
  }
}
