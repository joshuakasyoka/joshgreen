import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { BugDexPhone, TypeIcon } from './BugDexDemoShared';
import './BugDexDemoShared.css';

const MOATA_TILE_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

const PINS = [
  { id: 'ditchling', lat: 50.9042, lng: -0.1089, type: 'fire', color: '#ee6d2d', label: 'Ditchling Beacon' },
  { id: 'westmeston', lat: 50.9195, lng: -0.1612, type: 'grass', color: '#4faf52', label: 'Westmeston' },
  { id: 'bow-hill', lat: 50.895, lng: -0.182, type: 'ground', color: '#c9982d', label: 'Bow Hill' },
];

const PIN_BOUNDS = L.latLngBounds(PINS.map((pin) => [pin.lat, pin.lng]));

const fitMapToPins = (map, fullBleed = false) => {
  map.fitBounds(PIN_BOUNDS, {
    paddingTopLeft: L.point(42, fullBleed ? 48 : 56),
    paddingBottomRight: L.point(42, fullBleed ? 88 : 40),
    animate: false,
    maxZoom: 13.35,
  });
};

const LOOP_MS = 7200;

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

export default function BugDexMapDemo({ className = '' }) {
  const [cycle, setCycle] = useState(0);
  const [visiblePins, setVisiblePins] = useState([]);
  const [mapReady, setMapReady] = useState(false);
  const mapMountRef = useRef(null);
  const mapRef = useRef(null);
  const pinElsRef = useRef({});

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

  useEffect(() => {
    setVisiblePins([]);
    const pinTimers = PINS.map((_, i) =>
      setTimeout(() => setVisiblePins((v) => [...v, i]), 700 + i * 1300)
    );
    const loopTimer = setTimeout(() => setCycle((c) => c + 1), LOOP_MS);
    return () => {
      pinTimers.forEach(clearTimeout);
      clearTimeout(loopTimer);
    };
  }, [cycle]);

  useEffect(() => {
    const mapMountEl = mapMountRef.current;
    if (!mapMountEl || mapRef.current) return undefined;

    const map = L.map(mapMountEl, {
      center: PIN_BOUNDS.getCenter(),
      zoom: 13,
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

    L.tileLayer(MOATA_TILE_URL, {
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
      fitMapToPins(map, true);
      syncPinPositions();
      setMapReady(true);
    };

    const resizeObserver = new ResizeObserver(() => {
      if (!mapRef.current) return;
      mapRef.current.invalidateSize({ animate: false });
      fitMapToPins(mapRef.current, true);
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
  }, [syncPinPositions]);

  useLayoutEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;
    map.invalidateSize({ animate: false });
    fitMapToPins(map, true);
    syncPinPositions();
  }, [mapReady, visiblePins.length, cycle, syncPinPositions]);

  return (
    <BugDexPhone className={className} tab="collection" mapFull>
      <div className="bugdex-demo__map bugdex-demo__map--full">
        <div className="bugdex-demo__map-canvas bugdex-demo__map-canvas--full">
          <div ref={mapMountRef} className="bugdex-demo__map-leaflet" aria-hidden="true" />
          <div className="bugdex-demo__map-pins" aria-hidden="true">
            {mapReady && PINS.map((pin, i) => {
              const isVisible = visiblePins.includes(i);
              return (
                <div
                  key={`${cycle}-${pin.id}`}
                  ref={(el) => registerPinEl(pin.id, el)}
                  className="bugdex-demo__map-pin-group"
                >
                  {isVisible && (
                    <span
                      className="bugdex-demo__map-ripple"
                      style={{ borderColor: pin.color }}
                    />
                  )}
                  <div className={`bugdex-demo__map-pin ${isVisible ? 'is-visible' : ''}`}>
                    <div className="bugdex-demo__map-pin-bubble" style={{ borderColor: pin.color }}>
                      <TypeIcon type={pin.type} size={13} />
                    </div>
                    <div className="bugdex-demo__map-pin-stem" style={{ background: pin.color }} />
                    <div className="bugdex-demo__map-pin-label">{pin.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bugdex-demo__map-legal bugdex-demo__map-legal--full" aria-hidden="true">Maps Legal</div>
        </div>
      </div>
    </BugDexPhone>
  );
}
