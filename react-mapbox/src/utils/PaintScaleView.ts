/**
 * 
 * @param baseWidth Base width of draw line (in meters)
 * @param baseZoom Base zoom scale of map
 * @returns Paint styles for Mapbox Layer
 */
const PaintScaleView = (baseWidth: number, baseZoom: number) => {
  return {
    "line-color": "yellow",
    "line-opacity": 0.5,
    "line-width": {
      type: "exponential",
      base: 2,
      stops: [
        [0, baseWidth * Math.pow(2, 0 - baseZoom)],
        [24, baseWidth * Math.pow(2, 24 - baseZoom)],
      ],
    },
  };
};

export default PaintScaleView;
