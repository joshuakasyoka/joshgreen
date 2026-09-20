// CARTO basemap tile URLs for the Leaflet demos. Without a key CARTO stamps
// "API KEY REQUIRED" across every tile. The key comes from
// REACT_APP_CARTO_API_KEY (.env.local locally, project env vars on Vercel)
// and ends up in the client bundle, so restrict it to your domains in CARTO.
const CARTO_KEY = process.env.REACT_APP_CARTO_API_KEY;

const cartoTiles = (style) =>
  `https://{s}.basemaps.cartocdn.com/${style}/{z}/{x}/{y}{r}.png${CARTO_KEY ? `?key=${CARTO_KEY}` : ''}`;

export const CARTO_POSITRON_TILES = cartoTiles('light_all');
export const CARTO_VOYAGER_TILES = cartoTiles('rastertiles/voyager');
