// mapbox access token
export const defaultAccessToken =
  "pk.eyJ1IjoidHB3Mjg0IiwiYSI6ImNrc2VrYnk0bjExaWIybnJveGFtOGV0eDAifQ.pSJ4eAaCbdrjhzmqXMRK_A";

// default zoom and center
export const defaultCenter: [number, number] = [-91.874, 42.76];
export const defaultZoom: [number] = [12];

// default polygon fill color when drawing
export const defaultPolygonFillColor = "#00fd90";
export const defaultPolygonFillOpacity = 0.7;

// default line color when drawing
export const defaultLineColor = "#ff5050";
export const defaultLineWidth = 3.5;

// default polygon color when display data on map
export const defaultShowFieldDisplay = true
export const defaultFillPaint = {
  "fill-color": defaultPolygonFillColor,
  "fill-opacity": defaultPolygonFillOpacity,
};

// default line color when display data on map
export const defaultShowLineDisplay = false
export const defaultLinePaint = {
  "line-color": defaultLineColor,
  "line-width": defaultLineWidth,
};
