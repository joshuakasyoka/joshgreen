import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Briefcase,
  Calendar,
  Cloud,
  Compass,
  Download,
  Edit3,
  Maximize2,
  MessageSquare,
  Minus,
  Navigation,
  Pencil,
  Pin,
  Play,
  Plus,
  Printer,
  Ruler,
  Search,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Share2,
  GitBranch,
  SlidersHorizontal,
  TrendingUp,
  X,
} from 'lucide-react';
import './MoataGisToolsShared.css';

export const ICONS = {
  measure: Ruler,
  street_view: Navigation,
  editor: Edit3,
  draw: Pencil,
  spatial_query: Search,
  profile: TrendingUp,
  advanced_search: SlidersHorizontal,
  linear_referencing: GitBranch,
  time_slider: Calendar,
  atmospheric: Cloud,
  presentation: Play,
};

export const TOOL_LIST = [
  { id: 'measure', label: 'Measure', icon: 'measure' },
  { id: 'street_view', label: 'Street View', icon: 'street_view' },
  { id: 'editor', label: 'Editor', icon: 'editor' },
  { id: 'draw', label: 'Draw', icon: 'draw' },
  { id: 'spatial_query', label: 'Spatial Query', icon: 'spatial_query' },
  { id: 'profile', label: 'Profile', icon: 'profile' },
  { id: 'advanced_search', label: 'Advanced Search', icon: 'advanced_search' },
  { id: 'linear_referencing', label: 'Linear Referencing', icon: 'linear_referencing' },
  { id: 'time_slider', label: 'Time Slider', icon: 'time_slider' },
  { id: 'atmospheric', label: '3D Atmospheric Conditions', icon: 'atmospheric' },
  { id: 'presentation', label: 'Presentation', icon: 'presentation' },
];

export const GRAPHICS_LIST = [
  'Polygon-300626-1123161',
  'Polygon-090626-1229572',
  'Point-020626-1414458',
  'Point-020626-1414426',
  'Point-020626-1414400',
  'Circle-230426-1257233',
  'Polyline-310326-1518335',
  'Polygon-310326-1517207',
  'Polygon-310326-1517070',
  'Circle-190326-1426364',
  'Circle-190326-1423459',
];

const MAP_VIEW = { center: [53.482, -2.242], zoom: 12.4 };

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

export const GisToolsLeafletMap = () => {
  const mountRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const mountEl = mountRef.current;
    if (!mountEl || mapRef.current) return undefined;

    const map = L.map(mountEl, {
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

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
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
    };

    const resizeObserver = new ResizeObserver(() => {
      if (!mapRef.current) return;
      mapRef.current.invalidateSize({ animate: false });
    });
    resizeObserver.observe(mountEl);

    map.whenReady(() => {
      sizeFrame = requestAnimationFrame(markReady);
    });

    return () => {
      cancelled = true;
      if (sizeFrame) cancelAnimationFrame(sizeFrame);
      resizeObserver.disconnect();
      safeRemoveMap(mapRef.current);
      mapRef.current = null;
    };
  }, []);

  return <div ref={mountRef} className="moata-gis-tools__leaflet-map" aria-hidden="true" />;
};

export const DemoCursor = ({ x, y, visible }) => (
  <svg
    className={`moata-gis-tools__cursor ${visible ? 'is-visible' : ''}`}
    width="22"
    height="22"
    viewBox="0 0 24 24"
    style={{ transform: `translate(${x}px, ${y}px)` }}
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
);

export const useDemoAnimation = (steps, containerRef) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [cursor, setCursor] = useState({ x: 40, y: 40, visible: false });
  const targetRefs = useRef({});

  const setTargetRef = (key) => (node) => {
    if (node) targetRefs.current[key] = node;
    else delete targetRefs.current[key];
  };

  const step = steps[stepIndex];

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting),
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [containerRef]);

  useEffect(() => {
    if (!running) return undefined;

    const updateCursor = () => {
      const container = containerRef.current;
      if (!container || !step.target) {
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
        x: targetRect.left - containerRect.left + targetRect.width * 0.5,
        y: targetRect.top - containerRect.top + targetRect.height * 0.5,
        visible: true,
      });
    };

    const frame = requestAnimationFrame(updateCursor);
    const lateFrame = window.setTimeout(updateCursor, 200);
    window.addEventListener('resize', updateCursor);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(lateFrame);
      window.removeEventListener('resize', updateCursor);
    };
  }, [step, running, containerRef]);

  useEffect(() => {
    if (!running) return undefined;
    const timer = window.setTimeout(() => {
      setStepIndex((current) => (current + 1) % steps.length);
    }, step.duration);
    return () => window.clearTimeout(timer);
  }, [stepIndex, running, step.duration, steps.length]);

  return { step, cursor, setTargetRef };
};

const WINDOW_WIDTH = 860;

export const GisToolsWindow = ({ containerRef, cursor, className = '', style, children }) => {
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [naturalHeight, setNaturalHeight] = useState(null);

  useEffect(() => {
    const win = containerRef.current;
    if (!win) return undefined;
    // offsetHeight reflects layout size, unaffected by the CSS `transform:
    // scale()` applied below — so this stays accurate regardless of scale.
    const measureHeight = () => {
      if (win.offsetHeight > 0) setNaturalHeight(win.offsetHeight);
    };
    measureHeight();
    const observer = new ResizeObserver(measureHeight);
    observer.observe(win);
    return () => observer.disconnect();
  }, [containerRef]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;
    const measureScale = () => {
      const wrapWidth = wrap.getBoundingClientRect().width;
      if (wrapWidth > 0) setScale(Math.min(1, wrapWidth / WINDOW_WIDTH));
    };
    measureScale();
    const observer = new ResizeObserver(measureScale);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`moata-gis-tools ${className}`.trim()} style={style} ref={wrapRef}>
      <div
        className="moata-gis-tools__scale-frame"
        style={scale < 1 && naturalHeight ? { height: naturalHeight * scale } : undefined}
      >
        <div
          className="moata-gis-tools__window"
          ref={containerRef}
          style={{
            width: WINDOW_WIDTH,
            transform: scale < 1 ? `scale(${scale})` : undefined,
            transformOrigin: 'top left',
          }}
        >
          <div className="moata-gis-tools__browser-bar">
            <span className="moata-gis-tools__dot moata-gis-tools__dot--red" />
            <span className="moata-gis-tools__dot moata-gis-tools__dot--yellow" />
            <span className="moata-gis-tools__dot moata-gis-tools__dot--green" />
            <span className="moata-gis-tools__url">geospatial.mottmac.com/project</span>
          </div>
          {children}
          <DemoCursor x={cursor.x} y={cursor.y} visible={cursor.visible} />
        </div>
      </div>
    </div>
  );
};

export const GisToolsHeader = () => (
  <div className="moata-gis-tools__header">
    <div className="moata-gis-tools__brand">
      <span className="moata-gis-tools__brand-mark">M</span>
      <span className="moata-gis-tools__brand-name">Test Map</span>
    </div>
    <div className="moata-gis-tools__nav">
      <span className="moata-gis-tools__nav-item is-active">Map</span>
      <span className="moata-gis-tools__nav-item">Geospatial Manager</span>
      <span className="moata-gis-tools__nav-item">ArcGIS Apps</span>
    </div>
    <div className="moata-gis-tools__header-icons">
      <MessageSquare size={15} />
      <Printer size={15} />
      <Share2 size={15} />
      <Settings size={15} />
      <Download size={15} />
    </div>
  </div>
);

export const GisToolsSidebar = () => (
  <aside className="moata-gis-tools__sidebar">
    <div className="moata-gis-tools__sidebar-project">
      <span className="moata-gis-tools__sidebar-project-icon" aria-hidden="true" />
      <span>
        <strong>Test Map</strong>
        <span className="moata-gis-tools__sidebar-project-sub">Project Space</span>
      </span>
    </div>
    <div className="moata-gis-tools__sidebar-tabs">
      <span className="moata-gis-tools__sidebar-tab">Layers</span>
      <span className="moata-gis-tools__sidebar-tab is-active">Graphics</span>
    </div>
    <div className="moata-gis-tools__sidebar-draw">Click here to draw</div>
    <div className="moata-gis-tools__sidebar-group">Live Graphics</div>
    <div className="moata-gis-tools__sidebar-list">
      {GRAPHICS_LIST.map((name) => (
        <div key={name} className="moata-gis-tools__sidebar-row">
          <span>{name}</span>
        </div>
      ))}
    </div>
  </aside>
);

export const GisToolsMapArea = ({
  toolboxOpen,
  toolboxRef,
  pinnedTools = [],
  children,
}) => (
  <div className="moata-gis-tools__map-shell">
    <GisToolsLeafletMap />
    <div className="moata-gis-tools__map-top-left">
      <span ref={toolboxRef} className={`moata-gis-tools__icon-btn ${toolboxOpen ? 'is-active' : ''}`.trim()}>
        <Briefcase size={16} />
      </span>
      {pinnedTools.map((toolId) => {
        const Icon = ICONS[toolId];
        if (!Icon) return null;
        return (
          <span key={toolId} className="moata-gis-tools__icon-btn moata-gis-tools__icon-btn--pinned">
            <Icon size={16} />
          </span>
        );
      })}
    </div>
    {children}
    <div className="moata-gis-tools__map-controls">
      <span className="moata-gis-tools__map-control"><ChevronLeft size={14} /></span>
      <span className="moata-gis-tools__map-control"><Maximize2 size={13} /></span>
      <span className="moata-gis-tools__map-control"><Compass size={14} /></span>
    </div>
    <div className="moata-gis-tools__zoom-controls">
      <span className="moata-gis-tools__icon-btn"><ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} /></span>
      <span className="moata-gis-tools__icon-btn"><Plus size={15} /></span>
      <span className="moata-gis-tools__icon-btn"><Minus size={15} /></span>
    </div>
  </div>
);

export const ToolboxPanel = ({ visible, highlightId, hoverId, pinnedId, pinHoverId, setRowRef }) => (
  <div className={`moata-gis-tools__toolbox ${visible ? 'is-visible' : ''}`.trim()}>
    <div className="moata-gis-tools__toolbox-head">
      <Briefcase size={16} />
      <strong>Toolbox</strong>
      <X size={15} className="moata-gis-tools__toolbox-close" />
    </div>
    <div className="moata-gis-tools__toolbox-promo">
      Access all tools and pin them to your custom toolbar...
      <span className="moata-gis-tools__toolbox-beta">Beta</span>
    </div>
    <div className="moata-gis-tools__toolbox-list">
      {TOOL_LIST.map((tool) => {
        const Icon = ICONS[tool.icon];
        const isPinned = tool.id === pinnedId;
        const showPin = tool.id === hoverId || isPinned;
        return (
          <div
            key={tool.id}
            ref={setRowRef ? setRowRef(`row-${tool.id}`) : undefined}
            className={[
              'moata-gis-tools__toolbox-row',
              tool.id === highlightId ? 'is-selected' : '',
              tool.id === hoverId ? 'is-hovered' : '',
            ].filter(Boolean).join(' ')}
          >
            <Icon size={15} />
            <span>{tool.label}</span>
            {showPin && (
              <Pin
                ref={setRowRef ? setRowRef(`pin-${tool.id}`) : undefined}
                size={13}
                className={[
                  'moata-gis-tools__toolbox-pin',
                  isPinned ? 'is-pinned' : '',
                  tool.id === pinHoverId ? 'is-pin-hovered' : '',
                ].filter(Boolean).join(' ')}
                fill={isPinned ? 'currentColor' : 'none'}
              />
            )}
          </div>
        );
      })}
    </div>
  </div>
);

export const ToolsPanel = ({ title, visible, children }) => (
  <aside className={`moata-gis-tools__panel ${visible ? 'is-visible' : ''}`.trim()}>
    <div className="moata-gis-tools__panel-head">
      <ChevronRight size={14} className="moata-gis-tools__panel-collapse" />
      <span className="moata-gis-tools__panel-tab">Tools</span>
      <X size={15} className="moata-gis-tools__panel-close" />
    </div>
    <div className="moata-gis-tools__panel-title">{title}</div>
    <div className="moata-gis-tools__panel-body">{children}</div>
  </aside>
);

export const PanelField = ({ label, children }) => (
  <div className="moata-gis-tools__field">
    <label>{label}</label>
    {children}
  </div>
);

export { ChevronDown };
