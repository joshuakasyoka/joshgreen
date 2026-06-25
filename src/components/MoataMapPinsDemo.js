import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MoataMapPinsDemo.css';

const MAP_VIEWS = {
  0: { center: [51.4816, -0.1448], zoom: 14.85 },
  1: { center: [51.4824, -0.1464], zoom: 15.15 },
};

const PINS = [
  { id: 'p1', initials: 'SP', lat: 51.4831, lng: -0.1438 },
  { id: 'p2', initials: 'TS', lat: 51.4809, lng: -0.1456 },
  { id: 'p3', initials: 'PK', lat: 51.4820, lng: -0.1429 },
  { id: 'p4', initials: 'JG', lat: 51.4812, lng: -0.1471 },
  { id: 'p5', initials: 'AM', lat: 51.4836, lng: -0.1462 },
  { id: 'p6', initials: 'RW', lat: 51.4804, lng: -0.1434 },
  { id: 'p7', initials: 'LH', lat: 51.4828, lng: -0.1480 },
  { id: 'p8', initials: 'NC', lat: 51.4818, lng: -0.1418 },
  { id: 'p9', initials: 'DF', lat: 51.4801, lng: -0.1468 },
  { id: 'p10', initials: 'EK', lat: 51.4839, lng: -0.1444 },
  { id: 'p11', initials: 'SP', lat: 51.4815, lng: -0.1450 },
  { id: 'p12', initials: 'TS', lat: 51.4826, lng: -0.1476 },
  { id: 'p13', initials: 'PK', lat: 51.4807, lng: -0.1422 },
  { id: 'p14', initials: 'JG', lat: 51.4833, lng: -0.1490 },
  { id: 'p15', initials: 'AM', lat: 51.4810, lng: -0.1488 },
  { id: 'p16', initials: 'RW', lat: 51.4822, lng: -0.1432 },
  { id: 'p17', initials: 'LH', lat: 51.4842, lng: -0.1458 },
  { id: 'p18', initials: 'NC', lat: 51.4798, lng: -0.1440 },
  { id: 'p19', initials: 'DF', lat: 51.4825, lng: -0.1412 },
  { id: 'p20', initials: 'EK', lat: 51.4814, lng: -0.1496 },
  { id: 'p21', initials: 'SP', lat: 51.4830, lng: -0.1470 },
  { id: 'p22', initials: 'TS', lat: 51.4806, lng: -0.1452 },
  { id: 'p23', initials: 'PK', lat: 51.4829, lng: -0.1448 },
  { id: 'p24', initials: 'JG', lat: 51.4817, lng: -0.1426 },
];

const STEPS = [
  { visibleCount: 0, mapPan: 0, duration: 900 },
  { visibleCount: 6, mapPan: 0, duration: 1200 },
  { visibleCount: 14, mapPan: 0, duration: 1400 },
  { visibleCount: 22, mapPan: 0, duration: 1400 },
  { visibleCount: 24, mapPan: 0, duration: 1100 },
  { visibleCount: 24, mapPan: 1, duration: 2200 },
  { phase: 'idle', visibleCount: 24, mapPan: 1, duration: 2200 },
];

const PIN_STAGGER_MS = 55;

const hasValidMapSize = (map) => {
  const size = map.getSize();
  return size.x > 0 && size.y > 0;
};

const toMapView = (view) => ({
  center: L.latLng(view.center[0], view.center[1]),
  zoom: view.zoom,
});

const safeRemoveMap = (map) => {
  if (!map) return;
  try {
    map.remove();
  } catch {
    // Leaflet can throw if the map pane is already gone during strict-mode teardown.
  }
};

const MapPin = ({ pin, batchStart, index, registerPinEl }) => {
  const elRef = useRef(null);
  const isNewInBatch = index >= batchStart;
  const [shown, setShown] = useState(!isNewInBatch);

  useEffect(() => {
    registerPinEl(pin.id, elRef.current);
    return () => registerPinEl(pin.id, null);
  }, [pin.id, registerPinEl]);

  useEffect(() => {
    if (!isNewInBatch) {
      setShown(true);
      return undefined;
    }

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setShown(true));
    });
    return () => cancelAnimationFrame(frame);
  }, [isNewInBatch]);

  return (
    <span
      ref={elRef}
      className={`moata-map-pins-demo__pin ${shown ? 'is-visible' : ''}`.trim()}
      style={{
        transitionDelay: isNewInBatch ? `${(index - batchStart) * PIN_STAGGER_MS}ms` : '0ms',
      }}
    >
      {pin.initials}
    </span>
  );
};

const MoataMapPinsDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const mapMountRef = useRef(null);
  const mapRef = useRef(null);
  const pinElsRef = useRef({});
  const [mapReady, setMapReady] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [running, setRunning] = useState(false);

  const step = STEPS[stepIndex];
  const visiblePins = PINS.slice(0, step.visibleCount);
  const prevVisibleCount = stepIndex > 0 ? STEPS[stepIndex - 1].visibleCount : 0;

  const syncPinPositions = useCallback(() => {
    const map = mapRef.current;
    if (!map || !hasValidMapSize(map)) return;

    PINS.forEach((pin) => {
      const el = pinElsRef.current[pin.id];
      if (!el) return;
      const point = map.latLngToContainerPoint(L.latLng(pin.lat, pin.lng));
      if (!Number.isNaN(point.x) && !Number.isNaN(point.y)) {
        el.style.left = `${point.x}px`;
        el.style.top = `${point.y}px`;
      }
    });
  }, []);

  const registerPinEl = useCallback((id, el) => {
    if (el) {
      pinElsRef.current[id] = el;
      requestAnimationFrame(() => syncPinPositions());
    } else {
      delete pinElsRef.current[id];
    }
  }, [syncPinPositions]);

  const applyMapView = useCallback((map, mapPan, animate) => {
    if (!map || mapRef.current !== map || !hasValidMapSize(map)) return false;

    const view = MAP_VIEWS[mapPan] || MAP_VIEWS[0];
    const { center, zoom } = toMapView(view);
    map.setView(center, zoom, {
      animate,
      duration: animate ? 1.6 : 0,
      easeLinearity: 0.25,
    });
    syncPinPositions();
    return true;
  }, [syncPinPositions]);

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

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(map);

    mapRef.current = map;

    let cancelled = false;
    let sizeFrame = null;

    const markReady = () => {
      if (cancelled || !mapRef.current) return;
      if (!applyMapView(map, 0, false)) {
        sizeFrame = requestAnimationFrame(markReady);
        return;
      }
      setMapReady(true);
    };

    const resizeObserver = new ResizeObserver(() => {
      if (!mapRef.current) return;
      mapRef.current.invalidateSize({ animate: false });
      syncPinPositions();
    });
    resizeObserver.observe(mapMountEl);

    map.on('move', syncPinPositions);
    map.on('zoom', syncPinPositions);
    map.on('moveend', syncPinPositions);
    map.on('zoomend', syncPinPositions);
    map.whenReady(() => {
      sizeFrame = requestAnimationFrame(markReady);
    });

    return () => {
      cancelled = true;
      if (sizeFrame) cancelAnimationFrame(sizeFrame);
      resizeObserver.disconnect();
      map.off('move', syncPinPositions);
      map.off('zoom', syncPinPositions);
      map.off('moveend', syncPinPositions);
      map.off('zoomend', syncPinPositions);
      safeRemoveMap(map);
      mapRef.current = null;
      setMapReady(false);
    };
  }, [applyMapView, syncPinPositions]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return undefined;

    applyMapView(map, step.mapPan, step.mapPan > 0);
    if (step.mapPan > 0) {
      const timer = window.setTimeout(syncPinPositions, 520);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [step.mapPan, mapReady, applyMapView, syncPinPositions]);

  useLayoutEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;
    map.invalidateSize({ animate: false });
    syncPinPositions();
  }, [mapReady, step.visibleCount, stepIndex, syncPinPositions]);

  useEffect(() => {
    if (!running) return undefined;

    const timer = window.setTimeout(() => {
      setStepIndex((current) => (current + 1) % STEPS.length);
    }, step.duration);

    return () => window.clearTimeout(timer);
  }, [stepIndex, running, step.duration]);

  return (
    <div className={`moata-map-pins-demo ${className}`.trim()} style={style}>
      <div className="moata-map-pins-demo__window" ref={containerRef}>
        <div className="moata-map-pins-demo__browser-bar">
          <span className="moata-map-pins-demo__dot moata-map-pins-demo__dot--red" />
          <span className="moata-map-pins-demo__dot moata-map-pins-demo__dot--yellow" />
          <span className="moata-map-pins-demo__dot moata-map-pins-demo__dot--green" />
          <span className="moata-map-pins-demo__url">geospatial.mottmac.com</span>
        </div>

        <div className="moata-map-pins-demo__map-stage">
          <div ref={mapMountRef} className="moata-map-pins-demo__map" aria-hidden="true" />

          <div className="moata-map-pins-demo__map-overlay" aria-hidden="true">
            {mapReady && visiblePins.map((pin, index) => (
              <MapPin
                key={pin.id}
                pin={pin}
                index={index}
                batchStart={prevVisibleCount}
                registerPinEl={registerPinEl}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoataMapPinsDemo;
