// mapbox access token
export const defaultAccessToken =
  "pk.eyJ1IjoidHB3Mjg0IiwiYSI6ImNrc2VrYnk0bjExaWIybnJveGFtOGV0eDAifQ.pSJ4eAaCbdrjhzmqXMRK_A";

// default zoom and center
export const defaultCenter: [number, number] = [105.75701933333332, 20.977847833333332];
export const defaultZoom: [number] = [16];

//WORK AREA
// default polygon fill color when of work area
export const workAreaPolygonFillColor = "#00fd90";
export const workAreaPolygonFillOpacity = 0.7;

// default line color when drawing
export const workAreaLineColor = "blue";
export const workAreaLineWidth = 3.5;

// default polygon color when display data on map
export const workAreaShowFieldDisplay = false
export const workAreaFillPaint = {
  "fill-color": workAreaPolygonFillColor,
  "fill-opacity": workAreaPolygonFillOpacity,
};

// default line color when display data on map
export const workAreaShowLineDisplay = true
export const workAreaLinePaint = {
  "line-color": workAreaLineColor,
  "line-width": workAreaLineWidth,
};


// CROPS
// default polygon fill color when of crops
export const cropsPolygonFillColor = "#00fd90";
export const cropsPolygonFillOpacity = 0.7;

// default line color when drawing
export const cropsLineColor = "#ff5050";
export const cropsLineWidth = 3.5;

// default polygon color when display data on map
export const cropsShowFieldDisplay = true
export const cropsFillPaint = {
  "fill-color": cropsPolygonFillColor,
  "fill-opacity": cropsPolygonFillOpacity,
};

// default line color when display data on map
export const cropsShowLineDisplay = true
export const cropsLinePaint = {
  "line-color": cropsLineColor,
  "line-width": cropsLineWidth,
};