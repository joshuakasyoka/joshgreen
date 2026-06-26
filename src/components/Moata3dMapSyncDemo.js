import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ModelViewport } from './moata3dPanelShared';
import './Moata3dMapSyncDemo.css';

const MAP_VIEW = { center: [51.4816, -0.1448], zoom: 16.2 };

const STEPS = [
  { showModel: false, duration: 900 },
  { showModel: true, duration: 4200 },
];

const hasValidMapSize = (map) => {
  const size = map.getSize();
  return size.x > 0 && size.y > 0;
};

const safeRemoveMap = (map) => {
  if (!map) return;
  try {
    map.remove();
  } catch {
    // Leaflet can throw if the map pane is already gone during strict-mode teardown.
  }
};

const Moata3dMapSyncDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const mapMountRef = useRef(null);
  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [running, setRunning] = useState(false);

  const step = STEPS[stepIndex];

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting),
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mapMountEl = mapMountRef.current;
    if (!mapMountEl || mapRef.current) return undefined;

    const map = L.map(mapMountEl, {
      center: MAP_VIEW.center,
      zoom: MAP_VIEW.zoom,
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
      boxZoom: false,
      keyboard: false,
      tap: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(map);

    mapRef.current = map;

    let cancelled = false;
    let sizeFrame = null;

    const markReady = () => {
      if (cancelled || !mapRef.current) return;
      if (!hasValidMapSize(map)) {
        sizeFrame = requestAnimationFrame(markReady);
        return;
      }
      map.setView(MAP_VIEW.center, MAP_VIEW.zoom, { animate: false });
      setMapReady(true);
    };

    const resizeObserver = new ResizeObserver(() => {
      if (!mapRef.current) return;
      mapRef.current.invalidateSize({ animate: false });
    });
    resizeObserver.observe(mapMountEl);

    map.whenReady(() => {
      sizeFrame = requestAnimationFrame(markReady);
    });

    return () => {
      cancelled = true;
      if (sizeFrame) cancelAnimationFrame(sizeFrame);
      resizeObserver.disconnect();
      safeRemoveMap(map);
      mapRef.current = null;
      setMapReady(false);
    };
  }, []);

  useEffect(() => {
    if (!running) return undefined;

    const timer = window.setTimeout(() => {
      setStepIndex((current) => (current + 1) % STEPS.length);
    }, step.duration);

    return () => window.clearTimeout(timer);
  }, [stepIndex, running, step.duration]);

  const setTargetRef = () => () => {};

  return (
    <div className={`moata-3d-map-sync-demo ${className}`.trim()} style={style}>
      <div className="moata-3d-map-sync-demo__window" ref={containerRef}>
        <div className="moata-3d-map-sync-demo__browser-bar">
          <span className="moata-3d-map-sync-demo__dot moata-3d-map-sync-demo__dot--red" />
          <span className="moata-3d-map-sync-demo__dot moata-3d-map-sync-demo__dot--yellow" />
          <span className="moata-3d-map-sync-demo__dot moata-3d-map-sync-demo__dot--green" />
          <span className="moata-3d-map-sync-demo__url">geospatial.mottmac.com/sample</span>
        </div>

        <div className="moata-3d-map-sync-demo__stage">
          <div ref={mapMountRef} className="moata-3d-map-sync-demo__map" aria-hidden="true" />

          <div
            className={`moata-3d-map-sync-demo__viewport-anchor ${mapReady && step.showModel ? 'is-visible' : ''}`.trim()}
            aria-hidden="true"
          >
            {mapReady && (
              <ModelViewport
                visible={['v1', 'v2', 'v3']}
                rotating={step.showModel}
                setTargetRef={setTargetRef}
                cameraPosition={[0, 22, 0.01]}
                fov={32}
                interactive={false}
              />
            )}
          </div>

          <div className={`moata-3d-map-sync-demo__badge ${mapReady && step.showModel ? 'is-visible' : ''}`.trim()}>
            <span className="moata-3d-map-sync-demo__badge-dot" />
            ACC model synced to map
          </div>
        </div>
      </div>
    </div>
  );
};

export default Moata3dMapSyncDemo;
