import React from 'react';
import {
  ArrowUp,
  Check,
  Circle,
  CircleDot,
  Copy,
  Download,
  FileText,
  Image as ImageIcon,
  Layers,
  Map as MapIcon,
  MessageCircle,
  MessageSquare,
  Moon,
  MousePointer2,
  PanelLeft,
  Pencil,
  Plus,
  SquarePlus,
  Wrench,
  X,
} from 'lucide-react';
import { DemoCursor } from './EmmaGisDemoShared';
import EmmaGisMap from './EmmaGisMap';
import './EmmaArtefactsDemoShared.css';

// Building blocks for the EMMA "Artefacts" demos - the standalone EMMA app
// where replies can produce artefacts (maps, command runs, tables) that open
// in a workspace panel beside the conversation. Modelled on the EMMA motion
// reference (emma-animation-documentation.vercel.app).

const ICON = '#666';
const ico = (Icon, size = 16, color = ICON) => <Icon size={size} color={color} strokeWidth={1.8} aria-hidden="true" />;

export const EmmaMark = ({ state = 'idle', size = 22 }) => (
  <span className={`emma-art__mark is-${state}`} style={{ width: size, height: size }} aria-hidden="true">
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#101223" />
      <g className="emma-art__mark-glyph">
        <path d="M7.35 16.95L10.5 13.8C11.4 12.9 11.4 11.1 10.5 10.2L7.32 7.05L6 8.4L8.7 11.1H5.1V12.9H8.7L6 15.6L7.35 16.95Z" fill="#fff" />
        <path d="M18.73 13.62L14.43 12.46C13.2 12.13 11.64 13.03 11.31 14.26L10.17 18.59L12 19.06L12.99 15.37L14.79 18.49L16.35 17.59L14.55 14.47L18.24 15.46L18.73 13.62Z" fill="#fff" />
        <path d="M10.16 5.43L11.31 9.74C11.64 10.97 13.2 11.87 14.43 11.54L18.74 10.36L18.23 8.54L14.55 9.53L16.35 6.41L14.79 5.51L12.99 8.63L12 4.94L10.16 5.43Z" fill="#fff" />
      </g>
    </svg>
  </span>
);

export const ArtefactWindow = ({ containerRef, cursor, children, panel, className = '' }) => (
  <div className={`emma-art ${className}`.trim()}>
    <div className="emma-art__window" ref={containerRef}>
      <div className="emma-art__browser-bar">
        <span className="emma-art__dot emma-art__dot--red" />
        <span className="emma-art__dot emma-art__dot--yellow" />
        <span className="emma-art__dot emma-art__dot--green" />
        <span className="emma-art__url">emma.mottmac.com</span>
      </div>
      <div className="emma-art__app">
        <div className="emma-art__main">
          <div className="emma-art__header">
            <span className="emma-art__header-icons">
              {ico(PanelLeft)}
              {ico(SquarePlus)}
            </span>
            <span className="emma-art__wordmark">EMMA</span>
            <span className="emma-art__header-icons">{ico(Moon)}</span>
          </div>
          <div className="emma-art__body">{children}</div>
        </div>
        {panel}
      </div>
      <DemoCursor x={cursor.x} y={cursor.y} visible={cursor.visible} />
    </div>
  </div>
);

export const ChatColumn = ({ children, composer }) => (
  <div className="emma-art__chat">
    <div className="emma-art__thread">{children}</div>
    {composer}
  </div>
);

export const UserMsg = ({ children, chip, visible = true }) => (
  <div className={`emma-art__user emma-art__msg ${visible ? 'is-visible' : ''}`.trim()}>
    {chip && <span className="emma-art__user-chip">{chip}</span>}
    <span>{children}</span>
  </div>
);

export const AiBlock = ({ children, state, visible = true }) => (
  <div className={`emma-art__ai emma-art__msg ${visible ? 'is-visible' : ''}`.trim()}>
    <EmmaMark state={state} />
    {children}
  </div>
);

export const TypingDots = () => (
  <span className="emma-art__typing" aria-hidden="true">
    <span />
    <span />
    <span />
  </span>
);

export const ContextChip = ({ icon = 'pin', label, visible }) => (
  <span className={`emma-art__context-chip ${visible ? 'is-visible' : ''}`.trim()}>
    {icon === 'pin' ? ico(CircleDot, 12, '#666') : ico(Pencil, 12, '#666')}
    {label}
    {ico(X, 11, '#999')}
  </span>
);

// Empty-thread welcome: greeting lines stagger in, then the starter prompts
// pop in on a back-out. The prompt row folds away (down and out) the moment
// there's something to send, and comes back when the composer empties.
export const PROMPTS = [
  { key: 'summarise', title: 'Summarise a document', body: 'Pull the key points out of an attached PDF' },
  { key: 'basemap', title: 'Explore a basemap', body: 'Ask about layers, coverage and projections' },
  { key: 'report', title: 'Draft a site report', body: 'Turn survey notes into a structured write-up' },
];

export const Welcome = ({ visible, folded, hover, wiggle, setTargetRef }) => (
  <div className={`emma-art__welcome ${visible ? 'is-visible' : ''}`.trim()}>
    <div className="emma-art__welcome-hero">
      <span className="emma-art__hero-bit" style={{ '--i': 0 }}>
        <EmmaMark size={30} />
      </span>
      <span>
        <strong className="emma-art__hero-bit" style={{ '--i': 1 }}>Hi David,</strong>
        <small className="emma-art__hero-bit" style={{ '--i': 2 }}>What can I help you with today?</small>
      </span>
    </div>
    <div className={`emma-art__prompts ${folded ? 'is-folded' : ''}`.trim()}>
      {PROMPTS.map((prompt, idx) => (
        <div
          key={prompt.key}
          ref={setTargetRef?.(`prompt-${prompt.key}`)}
          className={[
            'emma-art__prompt',
            hover === prompt.key ? 'is-hover' : '',
            wiggle === prompt.key ? 'is-wiggle' : '',
          ].filter(Boolean).join(' ')}
          style={{ '--i': idx }}
        >
          <strong>{prompt.title}</strong>
          <small>{prompt.body}</small>
        </div>
      ))}
    </div>
  </div>
);

// An attached file, as in the app's FileChip: the card drops in with a slight
// counter-rotation, then its contents follow.
export const FileCard = ({ name, type }) => (
  <span className="emma-art__file">
    <span className="emma-art__file-top">
      <strong className="emma-art__file-bit">{name}</strong>
      <span className="emma-art__file-bit">{ico(Copy, 15, '#333')}</span>
    </span>
    <small className="emma-art__file-bit">
      {ico(FileText, 14, '#8a8a8a')}
      {type}
    </small>
  </span>
);

export const Composer = ({ value = '', chips = null, sendActive, inputRef, sendRef, plusRef }) => (
  <div className="emma-art__composer-wrap">
    <div ref={inputRef} className={`emma-art__composer ${value ? 'is-active' : ''}`.trim()}>
      {chips && <div className="emma-art__composer-chips">{chips}</div>}
      <div className="emma-art__composer-field">
        {value ? <span className="emma-art__typed">{value}</span> : <span className="emma-art__placeholder">Ask EMMA questions and explore</span>}
      </div>
      <div className="emma-art__composer-controls">
        <span ref={plusRef} className="emma-art__composer-plus">{ico(Plus, 16, '#333')}</span>
        <span className="emma-art__mode">
          <span className="emma-art__mode-opt">{ico(Wrench, 13)}</span>
          <span className="emma-art__mode-opt is-active">
            {ico(MessageSquare, 13, '#111')}
            Chat
          </span>
        </span>
        <span ref={sendRef} className={`emma-art__send ${sendActive ? 'is-active' : ''}`.trim()}>
          {ico(ArrowUp, 15, '#fff')}
        </span>
      </div>
    </div>
    <p className="emma-art__disclaimer">EMMA can make mistakes, check important information</p>
  </div>
);

// ── Map ────────────────────────────────────────────────────────────────
// Leaflet base map (CARTO Positron over Manchester), with the artefact
// overlays drawn in SVG on top.

// All map ink stays above y≈170 so it never sits under the floating toolbar.
export const SKETCH_PATH =
  'M136,68 C164,44 236,40 266,74 C290,102 264,146 206,150 C156,154 116,126 136,68 Z';

export const ArtefactMap = ({ coverage, sketch = 0, pin, borehole }) => (
  <div className="emma-art__map">
    <EmmaGisMap basemap="positron" />
    <svg className="emma-art__map-overlay" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g className={`emma-art__coverage ${coverage ? 'is-visible' : ''}`.trim()}>
        <path d="M72,30 L330,26 L346,164 L64,170 Z" fill="rgba(105,185,255,0.12)" stroke="#69b9ff" strokeWidth="1.4" strokeDasharray="5 4" />
      </g>

      <path
        d={SKETCH_PATH}
        pathLength="1"
        className="emma-art__sketch"
        style={{ strokeDashoffset: 1 - sketch, fillOpacity: sketch >= 1 ? 0.12 : 0 }}
      />

      <circle cx="112" cy="148" r="4.5" fill="#1a1a1a" />
      <circle cx="326" cy="98" r="4.5" fill="#1a1a1a" />
      <circle cx="252" cy="146" r="4.5" fill="#1a1a1a" />

      {pin && (
        <g className={`emma-art__pin ${borehole ? 'is-borehole' : ''}`.trim()} transform={`translate(${pin.x} ${pin.y})`}>
          <circle className="emma-art__pin-ring" r="10" />
          <circle className="emma-art__pin-dot" r="4.5" />
          <text className="emma-art__pin-label" x="14" y="4">BH-07</text>
        </g>
      )}
    </svg>
  </div>
);

const TOOLS = [
  ['select', MousePointer2],
  ['point', CircleDot],
  ['area', Circle],
  ['draw', Pencil],
  ['image', ImageIcon],
  ['note', MessageCircle],
];

export const MapToolbar = ({ active = 'select', setTargetRef }) => (
  <div className="emma-art__toolbar">
    {TOOLS.map(([key, Icon]) => (
      <span
        key={key}
        ref={setTargetRef ? setTargetRef(`tool-${key}`) : undefined}
        className={`emma-art__tool ${active === key ? 'is-active' : ''}`.trim()}
      >
        {ico(Icon, 14, active === key ? '#111' : ICON)}
      </span>
    ))}
  </div>
);

// Invisible hit target at a map coordinate (viewBox units), for the cursor.
export const MapTarget = ({ x, y, targetRef }) => (
  <span ref={targetRef} className="emma-art__map-target" style={{ left: `${(x / 400) * 100}%`, top: `${(y / 240) * 100}%` }} />
);

// ── Map card + panel ───────────────────────────────────────────────────

export const MapCard = ({ compact, cardRef, highlight }) => (
  <div ref={cardRef} className={`emma-art__card ${compact ? 'is-compact' : ''} ${highlight ? 'is-highlight' : ''}`.trim()}>
    <div className="emma-art__card-preview">
      <ArtefactMap />
    </div>
    <div className="emma-art__card-meta">
      <span>
        <strong>basemap_manchester</strong>
        <small>Map · Positron · z12</small>
      </span>
      {ico(MapIcon, 15)}
    </div>
  </div>
);

export const ArtefactPanel = ({ open, bitsIn = true, exportOpen, setTargetRef, children }) => (
  <aside className={`emma-art__panel ${open ? 'is-open' : ''} ${bitsIn ? 'bits-in' : ''}`.trim()}>
    <div className="emma-art__panel-inner">
      <div className="emma-art__panel-head emma-art__bit" style={{ '--i': 0 }}>
        {ico(MapIcon, 15)}
        <span className="emma-art__panel-title">
          <strong>basemap_manchester</strong>
          <small>Map · Positron · z12</small>
        </span>
        <span className={`emma-art__exports ${exportOpen ? 'is-open' : ''}`.trim()}>
          <span className="emma-art__export-chip" style={{ '--i': 1 }}>GeoJSON</span>
          <span className="emma-art__export-chip" style={{ '--i': 0 }}>MGO</span>
        </span>
        <span ref={setTargetRef?.('download')} className="emma-art__icon-btn">{ico(Download, 15)}</span>
        <span ref={setTargetRef?.('close')} className="emma-art__icon-btn">{ico(X, 15)}</span>
      </div>
      {children}
    </div>
  </aside>
);

export const PanelMap = ({ children, toolbar }) => (
  <div className="emma-art__panel-map emma-art__bit" style={{ '--i': 1 }}>
    {children}
    {toolbar}
  </div>
);

export const LayerList = ({ layers, setTargetRef }) => (
  <div className="emma-art__layers">
    <div className="emma-art__section-label emma-art__bit" style={{ '--i': 2 }}>
      {ico(Layers, 13, '#888')}
      Layers
    </div>
    {layers.map((layer, idx) => (
      <div key={layer.name} className="emma-art__layer-row emma-art__bit" style={{ '--i': 3 + idx }}>
        <span>{layer.name}</span>
        <span ref={setTargetRef?.(`layer-${layer.key}`)} className={`emma-art__check ${layer.checked ? 'is-checked' : ''}`.trim()}>
          {layer.checked && ico(Check, 11, '#fff')}
        </span>
      </div>
    ))}
  </div>
);

export const BASE_LAYERS = [
  { key: 'labels', name: 'Place labels', checked: true },
  { key: 'survey', name: 'Survey points', checked: true },
  { key: 'coverage', name: 'Coverage extent', checked: false },
  { key: 'gaps', name: 'Tile gaps', checked: false },
];

// ── Command run ────────────────────────────────────────────────────────

export const CommandRun = ({ commands, progress }) => (
  <div className="emma-art__run">
    {commands.map((command, idx) => {
      const status = idx < progress ? 'done' : idx === progress ? 'running' : 'pending';
      return (
        <div key={command} className="emma-art__run-row" style={{ '--i': idx }}>
          <code>{command}</code>
          <span className={`emma-art__badge is-${status}`}>{status === 'done' && ico(Check, 10, '#fff')}</span>
        </div>
      );
    })}
  </div>
);

// ── Result table ───────────────────────────────────────────────────────

export const STRATA = [
  { name: 'Canopy', color: '#FFC254' },
  { name: 'Understorey', color: '#FFAD51' },
  { name: 'Shrub', color: '#FF974D' },
  { name: 'Ground', color: '#FF824A' },
];

export const ResultTable = ({ rows, setTargetRef, flashCell, bounceCell, fadeCell }) => (
  <div className="emma-art__table-wrap">
    <table className="emma-art__table">
      <thead>
        <tr>
          <th>Feature</th>
          <th>Layer</th>
          <th>Protected</th>
          <th>Area (ha)</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => {
          const stratum = STRATA[row.stratum];
          return (
            <tr key={row.id} className="emma-art__table-row" style={{ '--i': idx }}>
              <td>
                <span ref={setTargetRef?.(`feature-${row.id}`)} className={`emma-art__cell ${flashCell === row.id ? 'is-flash' : ''}`.trim()}>
                  {row.feature}
                </span>
              </td>
              <td>
                <span ref={setTargetRef?.(`layer-${row.id}`)} className="emma-art__stratum">
                  <span className={`emma-art__stratum-dot ${fadeCell === row.id ? 'is-fading' : ''}`.trim()} style={{ background: stratum.color }} />
                  {stratum.name}
                </span>
              </td>
              <td>
                <span
                  ref={setTargetRef?.(`flag-${row.id}`)}
                  className={`emma-art__flag ${row.protected ? 'is-yes' : ''} ${bounceCell === row.id ? 'is-bounce' : ''}`.trim()}
                >
                  {row.protected ? 'Yes' : 'No'}
                </span>
              </td>
              <td className="emma-art__num">{row.area}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
