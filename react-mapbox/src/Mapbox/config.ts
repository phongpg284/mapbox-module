// mapbox access token
export const accessToken =
  "pk.eyJ1IjoidHB3Mjg0IiwiYSI6ImNrc2VrYnk0bjExaWIybnJveGFtOGV0eDAifQ.pSJ4eAaCbdrjhzmqXMRK_A";

// default zoom and center
export const defaultCenter: [number, number] = [-91.874, 42.76];
export const defaultZoom: [number] = [12];

// default polygon fill color when drawing
export const polygonFillColor = "#00fd90";
export const polygonFillOpacity = 0.7;

// default line color when drawing
export const lineColor = "#ff5050";
export const lineWidth = 3.5;

// default polygon color when display data on map
export const showFieldDisplay = true
export const fillPaint = {
  "fill-color": polygonFillColor,
  "fill-opacity": polygonFillOpacity,
};

// default line color when display data on map
export const showLineDisplay = false
export const linePaint = {
  "line-color": lineColor,
  "line-width": lineWidth,
};
