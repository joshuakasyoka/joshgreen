import React, { useCallback, useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MoataBlankScreenDemo.css';

const PURPLE = '#7939F7';
const MUTED = 'rgba(0, 0, 0, 0.54)';

const getRadiusMeters = (center, edge) => {
  const earthRadius = 6371000;
  const [lat1, lng1] = center;
  const [lat2, lng2] = edge;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const DRAW_CIRCLE_GEO = {
  center: [51.4821, -0.1452],
  edge: [51.4813, -0.1443],
};

const DRAW_CIRCLE_RADIUS_M = getRadiusMeters(DRAW_CIRCLE_GEO.center, DRAW_CIRCLE_GEO.edge);

const MAP_VIEWS = {
  0: { center: [51.4816, -0.1448], zoom: 15.25 },
  1: { center: [51.4820, -0.1460], zoom: 15.5 },
  2: { center: [51.4821, -0.1452], zoom: 15.25 },
  3: { center: [51.4794, -0.1508], zoom: 14.8 },
};

const COMMENT_PINS = [
  { id: 'sp', geo: [51.4823, -0.1446], initials: 'SP' },
  { id: 'jm', geo: [51.4817, -0.1451], initials: 'JM', prior: true },
  { id: 'dw', geo: [51.4826, -0.1442], initials: 'DW', prior: true },
];

const DRAW_CIRCLE_CENTER = L.latLng(DRAW_CIRCLE_GEO.center[0], DRAW_CIRCLE_GEO.center[1]);
const DRAW_CIRCLE_EDGE = L.latLng(DRAW_CIRCLE_GEO.edge[0], DRAW_CIRCLE_GEO.edge[1]);
const COMMENT_GEO = L.latLng(51.4823, -0.1446);

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

const BASE_LAYERS = [
  { id: 'mmo', name: 'Mott MacDonald Offices', checked: true },
  { id: 'editable', name: 'Editable Data', checked: false },
  {
    id: 'primary',
    name: 'Primary Structure Group',
    checked: true,
    children: [
      { id: 'hw', name: 'Highways Data', checked: false },
      { id: 'rail', name: 'Railways Data', checked: false },
      { id: 'water', name: 'Water Data', checked: false },
      { id: 'pop', name: 'Population Indices', checked: false },
    ],
  },
  { id: 'models', name: 'Example 3D Models', checked: true },
];

const TOOLBAR = [
  { id: 'select', sym: 'arrow_selector_tool' },
  { id: 'point', sym: 'fiber_manual_record' },
  { id: 'shape', sym: 'circle' },
  { id: 'draw', sym: 'draw' },
  { id: 'graphics', sym: 'image' },
  { id: 'comment', sym: 'chat_bubble', fill: 0 },
];

const STEPS = [
  { leftTab: 'layers', primaryExpanded: true, mapPan: 0, activeTool: 'select', target: 'layer-primary', duration: 2000 },
  { leftTab: 'layers', primaryExpanded: false, mapPan: 0, activeTool: 'select', target: 'layer-primary', duration: 1600 },
  { leftTab: 'layers', primaryExpanded: true, mapPan: 1, activeTool: 'select', target: 'map', duration: 2200 },
  { leftTab: 'layers', primaryExpanded: true, mapPan: 2, activeTool: 'shape', target: 'tool-shape', circleProgress: 0, duration: 1400 },
  { leftTab: 'layers', primaryExpanded: true, mapPan: 2, activeTool: 'shape', target: 'draw-circle-start', circleProgress: 0, duration: 1100 },
  { leftTab: 'layers', primaryExpanded: true, mapPan: 2, activeTool: 'shape', target: 'draw-circle-end', circleProgress: 1, drawAnimating: true, duration: 2200 },
  { leftTab: 'layers', primaryExpanded: true, mapPan: 2, activeTool: 'shape', circleProgress: 1, duration: 1800 },
  { leftTab: 'layers', primaryExpanded: true, mapPan: 2, activeTool: 'comment', target: 'tool-comment', circleProgress: 1, duration: 1400 },
  { leftTab: 'layers', primaryExpanded: true, mapPan: 2, activeTool: 'comment', target: 'comment-drop', circleProgress: 1, duration: 1200 },
  { leftTab: 'layers', primaryExpanded: true, mapPan: 2, activeTool: 'comment', circleProgress: 1, commentPlaced: true, duration: 1600 },
  { leftTab: 'layers', primaryExpanded: true, mapPan: 2, activeTool: 'select', circleProgress: 1, commentPlaced: true, showPriorComments: true, duration: 1400 },
  { leftTab: 'layers', primaryExpanded: true, mapPan: 2, activeTool: 'select', circleProgress: 1, commentPlaced: true, showPriorComments: true, target: 'map-control-pan', foreignPan: true, duration: 1200 },
  { leftTab: 'layers', primaryExpanded: true, mapPan: 3, activeTool: 'select', circleProgress: 1, commentPlaced: true, showPriorComments: true, foreignPan: true, commentsLost: true, duration: 2600 },
  { phase: 'idle', leftTab: 'layers', primaryExpanded: true, mapPan: 0, activeTool: 'select', circleProgress: 0, commentPlaced: false, duration: 1200 },
];

const Sym = ({ name, size = 18, fill = 1, color }) => (
  <span
    className="material-symbols-rounded"
    style={{
      fontSize: size,
      lineHeight: 1,
      display: 'inline-flex',
      fontVariationSettings: `'wght' 400, 'FILL' ${fill}, 'GRAD' 0, 'opsz' 20`,
      ...(color ? { color } : {}),
    }}
    aria-hidden="true"
  >
    {name}
  </span>
);

const LayerCheckbox = ({ checked }) => (
  <span className={`moata-blank-screen-demo__checkbox ${checked ? 'is-checked' : ''}`.trim()} aria-hidden="true">
    {checked && <Sym name="check" size={12} color="#fff" />}
  </span>
);

const LayerRow = ({ layer, depth, expanded, hovered, setTargetRef }) => {
  const isGroup = Boolean(layer.children);
  const showChildren = isGroup && expanded;

  return (
    <>
      <div
        ref={isGroup ? setTargetRef(`layer-${layer.id}`) : undefined}
        className={`moata-blank-screen-demo__layer-row ${hovered ? 'is-hovered' : ''}`.trim()}
        style={{ paddingLeft: `${8 + depth * 16}px` }}
      >
        {isGroup ? (
          <span className="moata-blank-screen-demo__layer-chevron">
            <Sym name={expanded ? 'expand_more' : 'chevron_right'} size={16} color={MUTED} />
          </span>
        ) : (
          <span className="moata-blank-screen-demo__layer-chevron moata-blank-screen-demo__layer-chevron--spacer" />
        )}
        <Sym name="folder" size={15} color={MUTED} />
        <span className="moata-blank-screen-demo__layer-name">{layer.name}</span>
        <LayerCheckbox checked={layer.checked} />
        <span className="moata-blank-screen-demo__layer-menu">
          <Sym name="more_vert" size={15} color={MUTED} />
        </span>
      </div>
      {showChildren && layer.children.map((child) => (
        <LayerRow
          key={child.id}
          layer={child}
          depth={depth + 1}
          expanded={expanded}
          hovered={false}
          setTargetRef={setTargetRef}
        />
      ))}
    </>
  );
};

const MoataBlankScreenDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const circleLayerRef = useRef(null);
  const drawAnimFrameRef = useRef(null);
  const targetRefs = useRef({});
  const [stepIndex, setStepIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 48, y: 48, visible: false });
  const [running, setRunning] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [mapMountEl, setMapMountEl] = useState(null);
  const [drawAnchorPx, setDrawAnchorPx] = useState({
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
  });
  const [commentPinPx, setCommentPinPx] = useState({});

  const step = STEPS[stepIndex];
  const isIdle = step.phase === 'idle';
  const leftTab = step.leftTab || 'layers';
  const primaryExpanded = step.primaryExpanded ?? true;
  const mapPan = step.mapPan ?? 0;
  const activeTool = step.activeTool || 'select';
  const circleProgress = step.circleProgress ?? 0;
  const drawAnimating = Boolean(step.drawAnimating);
  const showDrawnCircle = drawAnimating || circleProgress > 0;
  const commentPlaced = Boolean(step.commentPlaced);
  const showPriorComments = Boolean(step.showPriorComments);
  const foreignPan = Boolean(step.foreignPan);
  const commentsLost = Boolean(step.commentsLost);

  const setTargetRef = (key) => (node) => {
    if (node) targetRefs.current[key] = node;
    else delete targetRefs.current[key];
  };

  const mapRefCallback = (node) => {
    mapContainerRef.current = node;
    setTargetRef('map')(node);
    setMapMountEl(node);
  };

  const syncMapAnchors = useCallback(() => {
    const map = mapRef.current;
    if (!map || !hasValidMapSize(map)) return;

    const start = map.latLngToContainerPoint(DRAW_CIRCLE_CENTER);
    const end = map.latLngToContainerPoint(DRAW_CIRCLE_EDGE);
    const comment = map.latLngToContainerPoint(COMMENT_GEO);
    if (
      Number.isNaN(start.x) || Number.isNaN(start.y)
      || Number.isNaN(end.x) || Number.isNaN(end.y)
      || Number.isNaN(comment.x) || Number.isNaN(comment.y)
    ) {
      return;
    }

    const pinPositions = {};
    COMMENT_PINS.forEach((pin) => {
      const point = map.latLngToContainerPoint(L.latLng(pin.geo[0], pin.geo[1]));
      if (!Number.isNaN(point.x) && !Number.isNaN(point.y)) {
        pinPositions[pin.id] = { x: point.x, y: point.y };
      }
    });

    setDrawAnchorPx({
      start: { x: start.x, y: start.y },
      end: { x: end.x, y: end.y },
    });
    setCommentPinPx(pinPositions);
  }, []);

  const applyMapView = useCallback((map, view, animate, mapPanKey = 0) => {
    if (!map || mapRef.current !== map || !hasValidMapSize(map)) return false;

    if (mapPanKey === 2) {
      const bounds = L.latLngBounds(DRAW_CIRCLE_CENTER, DRAW_CIRCLE_EDGE, COMMENT_GEO).pad(0.55);
      map.fitBounds(bounds, {
        animate,
        duration: animate ? 1.8 : 0,
        maxZoom: 15.5,
        padding: [40, 48],
      });
      syncMapAnchors();
      return true;
    }

    const { center, zoom } = toMapView(view);
    map.setView(center, zoom, {
      animate,
      duration: animate ? 1.8 : 0,
      easeLinearity: 0.25,
    });
    syncMapAnchors();
    return true;
  }, [syncMapAnchors]);

  useEffect(() => {
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

    circleLayerRef.current = L.circle(DRAW_CIRCLE_CENTER, {
      radius: 0,
      color: PURPLE,
      fillColor: PURPLE,
      fillOpacity: 0.14,
      weight: 2,
    }).addTo(map);

    mapRef.current = map;

    let cancelled = false;
    let sizeFrame = null;

    const markReady = () => {
      if (cancelled || !mapRef.current) return;
      if (!applyMapView(map, MAP_VIEWS[0], false, 0)) {
        sizeFrame = requestAnimationFrame(markReady);
        return;
      }
      setMapReady(true);
    };

    const resizeObserver = new ResizeObserver(() => {
      if (!mapRef.current) return;
      mapRef.current.invalidateSize({ animate: false });
      syncMapAnchors();
    });
    resizeObserver.observe(mapMountEl);

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
      circleLayerRef.current = null;
      setMapReady(false);
    };
  }, [mapMountEl, applyMapView, syncMapAnchors]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return undefined;

    const view = MAP_VIEWS[mapPan] || MAP_VIEWS[0];
    let frame = null;
    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      if (applyMapView(map, view, mapPan !== 0, mapPan)) return;
      frame = requestAnimationFrame(run);
    };

    run();

    return () => {
      cancelled = true;
      if (frame) cancelAnimationFrame(frame);
    };
  }, [mapPan, mapReady, applyMapView]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return undefined;

    syncMapAnchors();
    map.on('move', syncMapAnchors);
    map.on('zoom', syncMapAnchors);
    map.on('zoomend', syncMapAnchors);
    map.on('moveend', syncMapAnchors);

    return () => {
      const activeMap = mapRef.current;
      if (!activeMap) return;
      activeMap.off('move', syncMapAnchors);
      activeMap.off('zoom', syncMapAnchors);
      activeMap.off('zoomend', syncMapAnchors);
      activeMap.off('moveend', syncMapAnchors);
    };
  }, [mapReady, syncMapAnchors]);

  useEffect(() => {
    const circle = circleLayerRef.current;
    if (!circle || !mapReady) return undefined;

    if (drawAnimFrameRef.current) {
      cancelAnimationFrame(drawAnimFrameRef.current);
      drawAnimFrameRef.current = null;
    }

    if (!showDrawnCircle) {
      circle.setRadius(0);
      return undefined;
    }

    if (drawAnimating) {
      const duration = step.duration;
      let startTime = null;

      const tick = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        circle.setRadius(DRAW_CIRCLE_RADIUS_M * eased);

        if (progress < 1) {
          drawAnimFrameRef.current = requestAnimationFrame(tick);
        } else {
          drawAnimFrameRef.current = null;
        }
      };

      drawAnimFrameRef.current = requestAnimationFrame(tick);

      return () => {
        if (drawAnimFrameRef.current) {
          cancelAnimationFrame(drawAnimFrameRef.current);
          drawAnimFrameRef.current = null;
        }
      };
    }

    circle.setRadius(circleProgress >= 1 ? DRAW_CIRCLE_RADIUS_M : 0);
    return undefined;
  }, [showDrawnCircle, drawAnimating, circleProgress, mapReady, step.duration]);

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
    if (!running) return undefined;

    const updateCursor = () => {
      const container = containerRef.current;
      if (!container || isIdle || !step.target) {
        setCursor((prev) => ({ ...prev, visible: false }));
        return;
      }

      const target = targetRefs.current[step.target];
      if (!target) {
        setCursor((prev) => ({ ...prev, visible: false }));
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      setCursor({
        x: targetRect.left - containerRect.left + targetRect.width * 0.55,
        y: targetRect.top - containerRect.top + targetRect.height * 0.5,
        visible: true,
      });
    };

    updateCursor();
    const layoutTimer = window.setTimeout(updateCursor, 120);
    window.addEventListener('resize', updateCursor);
    return () => {
      window.clearTimeout(layoutTimer);
      window.removeEventListener('resize', updateCursor);
    };
  }, [step, running, isIdle, drawAnchorPx, commentPinPx]);

  useEffect(() => {
    if (!running) return undefined;

    const timer = window.setTimeout(() => {
      setStepIndex((current) => (current + 1) % STEPS.length);
    }, step.duration);

    return () => window.clearTimeout(timer);
  }, [stepIndex, running, step.duration]);

  return (
    <div className={`moata-blank-screen-demo ${className}`.trim()} style={style}>
      <div className="moata-blank-screen-demo__window" ref={containerRef}>
        <div className="moata-blank-screen-demo__browser-bar">
          <span className="moata-blank-screen-demo__dot moata-blank-screen-demo__dot--red" />
          <span className="moata-blank-screen-demo__dot moata-blank-screen-demo__dot--yellow" />
          <span className="moata-blank-screen-demo__dot moata-blank-screen-demo__dot--green" />
          <span className="moata-blank-screen-demo__url">geospatial.mottmac.com</span>
        </div>

        <div className="moata-blank-screen-demo__workspace">
          <aside className="moata-blank-screen-demo__left-panel" aria-hidden="true">
            <div className="moata-blank-screen-demo__project-head">
              <span className="moata-blank-screen-demo__project-avatar">
                <Sym name="security" size={16} color="#6b7280" />
              </span>
              <div className="moata-blank-screen-demo__project-meta">
                <strong>Sample</strong>
                <span>Project Space</span>
              </div>
              <Sym name="expand_more" size={16} color={MUTED} />
              <Sym name="more_vert" size={16} color={MUTED} />
            </div>

            <div className="moata-blank-screen-demo__left-tabs">
              <span
                ref={setTargetRef('tab-layers')}
                className={`moata-blank-screen-demo__left-tab ${leftTab === 'layers' ? 'is-active' : ''}`.trim()}
              >
                Layers
              </span>
              <span
                ref={setTargetRef('tab-graphics')}
                className={`moata-blank-screen-demo__left-tab ${leftTab === 'graphics' ? 'is-active' : ''}`.trim()}
              >
                Graphics
              </span>
            </div>

            <div ref={setTargetRef('search')} className="moata-blank-screen-demo__search">
              <Sym name="search" size={15} color="#9ca3af" />
              <span className="moata-blank-screen-demo__search-placeholder">Search layers...</span>
              <span className="moata-blank-screen-demo__search-add">
                <Sym name="add" size={16} color={MUTED} />
              </span>
            </div>

            <div className="moata-blank-screen-demo__layer-list">
              {BASE_LAYERS.map((layer) => (
                <LayerRow
                  key={layer.id}
                  layer={layer}
                  depth={0}
                  expanded={layer.id === 'primary' ? primaryExpanded : false}
                  hovered={step.target === `layer-${layer.id}`}
                  setTargetRef={setTargetRef}
                />
              ))}
            </div>

            <div className="moata-blank-screen-demo__left-footer">
              <label className="moata-blank-screen-demo__toggle">
                <span className="moata-blank-screen-demo__toggle-track">
                  <span className="moata-blank-screen-demo__toggle-thumb" />
                </span>
                <span>Visible Layers Only</span>
              </label>
              <Sym name="keyboard_double_arrow_left" size={16} color={MUTED} />
            </div>
          </aside>

          <div className="moata-blank-screen-demo__map-stage">
            <div ref={mapRefCallback} className="moata-blank-screen-demo__map" aria-hidden="true" />

            <div className="moata-blank-screen-demo__map-overlay">
              <span
                ref={setTargetRef('draw-circle-start')}
                className="moata-blank-screen-demo__draw-anchor"
                style={{ left: drawAnchorPx.start.x, top: drawAnchorPx.start.y }}
              />
              <span
                ref={setTargetRef('draw-circle-end')}
                className="moata-blank-screen-demo__draw-anchor"
                style={{ left: drawAnchorPx.end.x, top: drawAnchorPx.end.y }}
              />

              <span
                ref={setTargetRef('comment-drop')}
                className="moata-blank-screen-demo__draw-anchor"
                style={{
                  left: commentPinPx.sp?.x ?? 0,
                  top: commentPinPx.sp?.y ?? 0,
                }}
              />

              {COMMENT_PINS.map((pin) => {
                const position = commentPinPx[pin.id];
                const isVisible = commentPlaced && (!pin.prior || showPriorComments);
                if (!isVisible || !position) return null;

                return (
                  <div
                    key={pin.id}
                    className={[
                      'moata-blank-screen-demo__comment-pin',
                      pin.prior ? 'is-prior' : '',
                      commentsLost ? 'is-lost' : '',
                    ].filter(Boolean).join(' ')}
                    style={{ left: position.x, top: position.y }}
                  >
                    {pin.initials}
                  </div>
                );
              })}

              {commentsLost && (
                <p className="moata-blank-screen-demo__lost-callout" aria-hidden="true">
                  Comments lost when the{' '}
                  <span className="moata-blank-screen-demo__lost-callout-highlight">shared view changes</span>
                </p>
              )}

              {foreignPan && (
                <span className="moata-blank-screen-demo__foreign-cursor" aria-hidden="true">
                  <span className="moata-blank-screen-demo__foreign-cursor-dot" />
                  <span className="moata-blank-screen-demo__foreign-cursor-label">Structures</span>
                </span>
              )}

              <div className="moata-blank-screen-demo__panel-tabs">
              <span
                ref={setTargetRef('panel-tab')}
                className={`moata-blank-screen-demo__panel-tab is-active ${step.target === 'panel-tab' ? 'is-hovered' : ''}`.trim()}
              >
                <Sym name="layers" size={15} color="#111827" />
                Layer
              </span>
              <span className="moata-blank-screen-demo__panel-tab-add">
                <Sym name="add" size={15} color={MUTED} />
              </span>
            </div>

            <div className="moata-blank-screen-demo__draw-toolbar">
              {TOOLBAR.map((tool) => (
                <span
                  key={tool.id}
                  ref={setTargetRef(`tool-${tool.id}`)}
                  className={[
                    'moata-blank-screen-demo__draw-tool',
                    activeTool === tool.id ? 'is-active' : '',
                    step.target === `tool-${tool.id}` && activeTool !== tool.id ? 'is-hovered' : '',
                  ].filter(Boolean).join(' ')}
                >
                  <Sym name={tool.sym} size={20} fill={tool.fill ?? 1} />
                </span>
              ))}
            </div>

            <div className="moata-blank-screen-demo__map-controls">
              <span className="moata-blank-screen-demo__map-control">
                <Sym name="chevron_left" size={18} color={MUTED} />
              </span>
              <span className="moata-blank-screen-demo__map-control">
                <Sym name="my_location" size={18} color={MUTED} />
              </span>
              <span
                ref={setTargetRef('map-control-pan')}
                className="moata-blank-screen-demo__map-control moata-blank-screen-demo__map-control--pan"
              >
                <Sym name="open_with" size={18} color={foreignPan ? '#374151' : MUTED} />
              </span>
            </div>
            </div>
          </div>
        </div>

        <svg
          className={`moata-blank-screen-demo__cursor ${cursor.visible ? 'is-visible' : ''}`}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
          aria-hidden="true"
        >
          <path
            d="M5.5 3.5L18 12.5L11.5 14L9.5 20.5L5.5 3.5Z"
            fill="#111"
            stroke="#fff"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default MoataBlankScreenDemo;
