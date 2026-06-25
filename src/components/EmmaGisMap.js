import { useCallback, useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MAP_VIEWS = {
  0: { center: [53.482, -2.242], zoom: 12 },
  1: { center: [53.488, -2.258], zoom: 12.25 },
};

const CORRIDOR_CENTER = L.latLng(53.482, -2.242);
const SPATIAL_BUFFER_M = 3200;

const TRANSPORT_TILES =
  'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}';

const RAIL_TILES = 'https://a.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png';

const ADDED_LAYER_OPACITY = 0.1;

const hasValidMapSize = (map) => {
  const size = map.getSize();
  return size.x > 0 && size.y > 0;
};

const safeRemoveMap = (map) => {
  if (!map) return;
  try {
    map.remove();
  } catch {
    // Leaflet can throw during strict-mode teardown.
  }
};

const EmmaGisMap = ({ pan = 0, mode = 'default' }) => {
  const mountRef = useRef(null);
  const mapRef = useRef(null);
  const transportRef = useRef(null);
  const railRef = useRef(null);
  const ecologyRef = useRef(null);
  const bufferRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  const applyView = useCallback((map, panKey, animate) => {
    if (!map || !hasValidMapSize(map)) return false;

    const view = MAP_VIEWS[panKey] || MAP_VIEWS[0];
    map.setView(L.latLng(view.center[0], view.center[1]), view.zoom, {
      animate,
      duration: animate ? 1.6 : 0,
      easeLinearity: 0.25,
    });
    return true;
  }, []);

  const syncOverlays = useCallback((map, nextMode) => {
    if (!map) return;

    if (transportRef.current) {
      map.removeLayer(transportRef.current);
      transportRef.current = null;
    }
    if (railRef.current) {
      map.removeLayer(railRef.current);
      railRef.current = null;
    }
    if (ecologyRef.current) {
      map.removeLayer(ecologyRef.current);
      ecologyRef.current = null;
    }
    if (bufferRef.current) {
      map.removeLayer(bufferRef.current);
      bufferRef.current = null;
    }

    if (nextMode === 'transport' || nextMode === 'spatial') {
      transportRef.current = L.tileLayer(TRANSPORT_TILES, {
        opacity: ADDED_LAYER_OPACITY,
        maxZoom: 19,
      }).addTo(map);
    }

    if (nextMode === 'transport') {
      railRef.current = L.tileLayer(RAIL_TILES, {
        opacity: ADDED_LAYER_OPACITY,
        maxZoom: 19,
      }).addTo(map);
    }

    if (nextMode === 'bundle') {
      ecologyRef.current = L.circle(CORRIDOR_CENTER, {
        radius: 1800,
        color: '#16a34a',
        fillColor: '#22c55e',
        fillOpacity: 0.18,
        weight: 2,
      }).addTo(map);
    }

    if (nextMode === 'spatial') {
      bufferRef.current = L.circle(CORRIDOR_CENTER, {
        radius: SPATIAL_BUFFER_M,
        color: '#6b7280',
        fillColor: '#9ca3af',
        fillOpacity: 0.1,
        weight: 2,
        dashArray: '6 4',
      }).addTo(map);
    }
  }, []);

  useEffect(() => {
    const mountEl = mountRef.current;
    if (!mountEl || mapRef.current) return undefined;

    const map = L.map(mountEl, {
      center: MAP_VIEWS[0].center,
      zoom: MAP_VIEWS[0].zoom,
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
      boxZoom: false,
      keyboard: false,
      tap: false,
      zoomSnap: 0.25,
      zoomDelta: 0.25,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(map);

    mapRef.current = map;

    let cancelled = false;
    let sizeFrame = null;

    const markReady = () => {
      if (cancelled || !mapRef.current) return;
      if (!applyView(map, 0, false)) {
        sizeFrame = requestAnimationFrame(markReady);
        return;
      }
      syncOverlays(map, 'default');
      setMapReady(true);
    };

    const resizeObserver = new ResizeObserver(() => {
      if (!mapRef.current) return;
      mapRef.current.invalidateSize({ animate: false });
    });
    resizeObserver.observe(mountEl);

    map.whenReady(() => {
      map.invalidateSize({ animate: false });
      markReady();
    });

    return () => {
      cancelled = true;
      if (sizeFrame) cancelAnimationFrame(sizeFrame);
      resizeObserver.disconnect();
      safeRemoveMap(mapRef.current);
      mapRef.current = null;
      transportRef.current = null;
      railRef.current = null;
      ecologyRef.current = null;
      bufferRef.current = null;
      setMapReady(false);
    };
  }, [applyView, syncOverlays]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return undefined;

    let frame = null;
    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      if (applyView(map, pan, pan !== 0)) return;
      frame = requestAnimationFrame(run);
    };

    run();

    return () => {
      cancelled = true;
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pan, mapReady, applyView]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;
    syncOverlays(map, mode);
  }, [mode, mapReady, syncOverlays]);

  return <div ref={mountRef} className="emma-gis-demo__leaflet-map" aria-hidden="true" />;
};

export default EmmaGisMap;
