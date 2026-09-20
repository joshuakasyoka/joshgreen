import React, { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import WinRoomChatDemo from './WinRoomChatDemo';
import './WinRoomDiagrams.css';

// Diagrams for the Win Room research case study. Each reveals its parts one
// by one while on screen, holds, then loops. Content is method and aggregate
// counts only - no participant ids, roles, quotes or client names.

// Reveal `total` items one at a time, hold, then start again.
export const useSequence = (total, { step = 420, lead = 500, hold = 4200 } = {}) => {
  const ref = useRef(null);
  const [running, setRunning] = useState(false);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => setRunning(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) {
      setShown(0);
      return undefined;
    }
    const delay = shown === 0 ? lead : shown >= total ? hold : step;
    const timer = window.setTimeout(() => setShown((n) => (n >= total ? 0 : n + 1)), delay);
    return () => window.clearTimeout(timer);
  }, [running, shown, total, step, lead, hold]);

  return { ref, shown, done: shown >= total };
};

const on = (condition) => (condition ? 'is-on' : '');

export const Frame = ({ innerRef, children, className = '' }) => (
  <div className={`wr-diagram ${className}`.trim()} aria-hidden="true">
    <div ref={innerRef} className="wr-diagram__canvas">
      {children}
    </div>
  </div>
);

export const Card = ({ kicker, title, chips = [], visible, tone, className = '' }) => (
  <div className={`wr-card ${tone ? `wr-card--${tone}` : ''} ${on(visible)} ${className}`.trim()}>
    {kicker && <div className="wr-kicker">{kicker}</div>}
    {title && <div className="wr-title">{title}</div>}
    {chips.length > 0 && (
      <div className="wr-chips">
        {chips.map((chip) => (
          <span key={chip} className="wr-chip">
            {chip}
          </span>
        ))}
      </div>
    )}
  </div>
);

export const Line = ({ visible, vertical, dashed }) => (
  <span className={`wr-line ${vertical ? 'wr-line--v' : 'wr-line--h'} ${dashed ? 'is-dashed' : ''} ${on(visible)}`.trim()} />
);

export const Pill = ({ visible, done, children }) => (
  <span className={`wr-pill ${on(visible)} ${done ? 'is-done' : ''}`.trim()}>
    {done && <Check size={12} strokeWidth={2.5} />}
    {children}
  </span>
);

// 1 ── The study: one question, nine interviews, two sources.
export const WrStudyFrameDiagram = ({ className }) => {
  const { ref, shown } = useSequence(5);
  return (
    <Frame innerRef={ref} className={className}>
      <Card
        kicker="Research question"
        title="How are pursuits found, pursued and won today - and where could a tool help?"
        visible={shown >= 1}
        tone="question"
      />
      <div className="wr-row wr-row--center">
        <Line vertical visible={shown >= 2} />
      </div>
      <div className="wr-row wr-row--three">
        <Card kicker="Participants" title="9 interviews" chips={['One joint', 'Senior, pursuit-side']} visible={shown >= 3} />
        <Card kicker="Reach" title="4 regions" chips={['UK', 'Middle East', 'North America', 'ANZ']} visible={shown >= 4} />
        <Card kicker="Evidence" title="2 sources" chips={['Meeting summaries', 'Verbatim transcripts']} visible={shown >= 5} />
      </div>
    </Frame>
  );
};

// 2 ── Every guideline traces back to the moment somebody said it.
const TRACE = [
  ['Guideline', 'An instruction for the team'],
  ['Finding', 'What the evidence shows'],
  ['Code', 'A theme with a definition'],
  ['Span', 'The exact words coded'],
  ['Moment', 'When it was said'],
];

export const WrTraceDiagram = ({ className }) => {
  const { ref, shown, done } = useSequence(TRACE.length + 1);
  return (
    <Frame innerRef={ref} className={className}>
      <div className="wr-row wr-row--chain">
        {TRACE.map(([title, kicker], idx) => (
          <React.Fragment key={title}>
            {idx > 0 && <Line visible={shown > idx} />}
            <Card kicker={kicker} title={title} visible={shown > idx} tone={idx === TRACE.length - 1 ? 'source' : undefined} />
          </React.Fragment>
        ))}
      </div>
      <div className="wr-row wr-row--end">
        <Pill visible={shown >= TRACE.length} done={done}>
          Defensible line by line
        </Pill>
      </div>
    </Frame>
  );
};

// 3 ── The pipeline: eight stages, gated, with the study paused at review.
const STAGES = [
  ['0', 'Protocol', 'Define the study', 'done'],
  ['1', 'Ingest', 'Pseudonymised notes', 'done'],
  ['2', 'Assemble', 'One timeline', 'skip'],
  ['3', 'Codebook', 'Themes, versioned', 'gate'],
  ['4', 'Code', 'Span annotations', 'todo'],
  ['5', 'Agree', 'Check agreement', 'todo'],
  ['6', 'Analyse', 'Reach and findings', 'todo'],
  ['7', 'Guidelines', 'Addressed, counted', 'todo'],
];

const STATUS_LABEL = { done: 'Done', skip: 'N/A', gate: 'Review gate', todo: 'Next' };

export const WrPipelineDiagram = ({ className }) => {
  const { ref, shown, done } = useSequence(STAGES.length);
  return (
    <Frame innerRef={ref} className={className}>
      <div className="wr-stages">
        {STAGES.map(([num, title, what, status], idx) => (
          <div key={title} className={`wr-stage is-${status} ${on(shown > idx)} ${done && status === 'gate' ? 'is-pulse' : ''}`.trim()}>
            <div className="wr-stage__top">
              <span className="wr-stage__num">{num}</span>
              <span className="wr-stage__status">{STATUS_LABEL[status]}</span>
            </div>
            <div className="wr-title">{title}</div>
            <div className="wr-stage__what">{what}</div>
          </div>
        ))}
      </div>
    </Frame>
  );
};

// 4 ── Ingest: raw interview → redacted → observations, with hidden turns.
const OBS = ['obs', 'obs', 'hidden', 'obs', 'obs', 'obs', 'hidden', 'obs'];

export const WrIngestDiagram = ({ className }) => {
  const { ref, shown, done } = useSequence(6);
  return (
    <Frame innerRef={ref} className={className}>
      <div className="wr-row wr-row--flow">
        <div className={`wr-doc ${on(shown >= 1)}`}>
          <div className="wr-kicker">Raw interview</div>
          <p>
            <span className="wr-redact is-name">Named person</span> leads the bid with <span className="wr-redact is-name">a colleague</span>…
          </p>
          <span className="wr-doc__line" />
          <span className="wr-doc__line is-short" />
        </div>
        <Line visible={shown >= 2} />
        <div className={`wr-doc ${on(shown >= 2)}`}>
          <div className="wr-kicker">Redacted</div>
          <p>
            <span className="wr-token">[P04]</span> leads the bid with <span className="wr-token">[COLLEAGUE_A]</span>…
          </p>
          <span className="wr-doc__line" />
          <span className="wr-doc__line is-short" />
        </div>
        <Line visible={shown >= 3} />
        <div className={`wr-doc wr-doc--obs ${on(shown >= 3)}`}>
          <div className="wr-kicker">Observations</div>
          {OBS.map((kind, idx) => (
            <span key={idx} className={`wr-obs ${kind === 'hidden' ? 'is-hidden' : ''}`} style={{ '--i': idx }}>
              {kind === 'hidden' ? 'hidden - logistics' : `observation ${String(idx + 1).padStart(3, '0')}`}
            </span>
          ))}
        </div>
      </div>
      <div className="wr-row wr-row--stats">
        <Card kicker="Summaries" title="453 observations" chips={['37 hidden']} visible={shown >= 4} />
        <Card kicker="Transcripts" title="1,469 paragraphs" chips={['Speakers attributed by reading']} visible={shown >= 5} />
        <Pill visible={shown >= 6} done={done}>
          Re-identification key kept private
        </Pill>
      </div>
    </Frame>
  );
};

// 5 ── The pursue-and-win process as the interviews describe it.
const PROCESS = [
  ['Hear early', 'none'],
  ['Know the field', 'plan'],
  ['Shape the ask', 'none'],
  ['Decide to pursue', 'gate'],
  ['Win themes', 'plan'],
  ['Choose partners', 'plan'],
  ['Decide to bid', 'gate'],
  ['Storyboard', 'plan'],
  ['First review', 'gate'],
  ['Write & price', 'plan'],
  ['Second review', 'gate'],
  ['Submit', 'plan'],
  ['Find out', 'plan'],
];

export const WrProcessDiagram = ({ className }) => {
  const { ref, shown } = useSequence(PROCESS.length + 1, { step: 300 });
  return (
    <Frame innerRef={ref} className={className}>
      <div className="wr-spine">
        {PROCESS.map(([label, kind], idx) => (
          <div key={label} className={`wr-spine__step is-${kind} ${on(shown > idx)}`.trim()}>
            <span className="wr-spine__dot">{idx + 1}</span>
            <span className="wr-spine__label">{label}</span>
          </div>
        ))}
      </div>
      <div className={`wr-legend ${on(shown > PROCESS.length)}`}>
        <span><i className="is-gate" /> Formal gate</span>
        <span><i className="is-plan" /> Named milestone</span>
        <span><i className="is-none" /> No milestone - relationship work</span>
      </div>
    </Frame>
  );
};

// 6 ── The codebook's sorting rule: today's practice vs a tool relationship.
export const WrCodebookDiagram = ({ className }) => {
  const { ref, shown, done } = useSequence(5);
  return (
    <Frame innerRef={ref} className={className}>
      <Card
        kicker="Sorting rule"
        title="Would they have said this if no tool were being considered?"
        visible={shown >= 1}
        tone="question"
      />
      <div className="wr-row wr-row--links">
        <Line vertical visible={shown >= 2} />
        <Line vertical visible={shown >= 2} />
      </div>
      <div className="wr-row wr-row--two">
        <Card
          kicker="Yes · Part A · 66 codes"
          title="How pursue and win works today"
          chips={['Positioning', 'Pursue decisions', 'Competing', 'What wins', 'Teaming', 'The bid', 'Memory']}
          visible={shown >= 3}
        />
        <Card
          kicker="No · Part B · 20 codes"
          title="The relationship with a tool"
          chips={['What it would do', 'Boundaries', 'Building capability', 'Fitting the process']}
          visible={shown >= 4}
        />
      </div>
      <div className="wr-row wr-row--center wr-row--pill">
        <Pill visible={shown >= 5} done={done}>
          Bridge codes: today&apos;s practice that constrains the tool
        </Pill>
      </div>
    </Frame>
  );
};

// 7 ── Two drafts from two sources, built independently, then compared.
export const WrSourcesDiagram = ({ className }) => {
  const { ref, shown, done } = useSequence(6);
  return (
    <Frame innerRef={ref} className={className}>
      <div className="wr-row wr-row--two">
        <Card kicker="Meeting summaries" title="86 codes" chips={['Headline points', 'Tidy, selective']} visible={shown >= 1} />
        <Card kicker="Verbatim transcripts" title="115 codes" chips={['Asides and doubts', 'Built first, blind']} visible={shown >= 2} />
      </div>
      <div className="wr-row wr-row--links">
        <Line vertical visible={shown >= 3} />
        <Line vertical visible={shown >= 3} />
      </div>
      <Card kicker="Both agree" title="The strongest themes hold up either way" visible={shown >= 3} tone="agree" />
      <div className="wr-row wr-row--two wr-row--gap">
        <Card kicker="Only in transcripts" title="Ambivalence the summaries dropped" chips={['Doubts about AI', 'Content reuse', 'Competitive tactics']} visible={shown >= 4} tone="muted" />
        <Card kicker="Only in summaries" title="Re-read before accepting" chips={['Procurement route', 'Decision forums']} visible={shown >= 5} tone="muted" />
      </div>
      <div className="wr-row wr-row--end">
        <Pill visible={shown >= 6} done={done}>
          Disagreement is kept, not averaged away
        </Pill>
      </div>
    </Frame>
  );
};

// 8 ── Reach: first participants surface most themes; later interviews
// mainly corroborate. New themes per interview fall off; the curve flattens.
const SATURATION = [
  [1, 34],
  [2, 22],
  [3, 16],
  [4, 12],
  [5, 9],
  [6, 7],
  [7, 5],
  [8, 4],
  [9, 3],
];
const SATURATION_MAX = 34;

export const WrReachDiagram = ({ className }) => {
  const { ref, shown, done } = useSequence(SATURATION.length + 1, { step: 220 });
  return (
    <Frame innerRef={ref} className={className}>
      <div className="wr-chart-head">
        <span className="wr-kicker">New themes introduced · by interview order · transcript draft</span>
      </div>
      <div className="wr-chart">
        {SATURATION.map(([interview, themes], idx) => (
          <div key={interview} className={`wr-bar ${interview <= 3 ? 'is-high' : ''} ${interview >= 7 ? 'is-single' : ''}`.trim()}>
            <span className="wr-bar__value">{shown > idx ? themes : ''}</span>
            <span className="wr-bar__track">
              <span className="wr-bar__fill" style={{ height: shown > idx ? `${(themes / SATURATION_MAX) * 100}%` : 0 }} />
            </span>
            <span className="wr-bar__label">{interview}</span>
          </div>
        ))}
      </div>
      <div className="wr-axis">Interview order</div>
      <div className="wr-row wr-row--stats">
        <span className={`wr-note ${on(shown > SATURATION.length)}`}>
          First voices raise most themes · later interviews mainly back them up
        </span>
        <Pill visible={shown > SATURATION.length} done={done}>
          Early map, then corroboration
        </Pill>
      </div>
    </Frame>
  );
};

// 9 ── Results: the themes both drafts agree on, with reach from each.
const THEMES = [
  ['Work is won before the tender notice', 8, 9],
  ['Partners are chosen to fill capability gaps', 7, 8],
  ['AI is already used in pursuit', 7, 8],
  ['Relationships win work', 6, 8],
  ['Decisions are made without data', 4, 5],
  ['Relationships and judgement stay human', 5, 4],
];

export const WrThemesDiagram = ({ className }) => {
  const { ref, shown } = useSequence(THEMES.length + 1, { step: 380 });
  return (
    <Frame innerRef={ref} className={className}>
      <div className="wr-chart-head">
        <span className="wr-kicker">Strongest themes · participants out of 9</span>
        <span className="wr-key">
          <i className="is-summary" /> Summaries <i className="is-transcript" /> Transcripts
        </span>
      </div>
      <div className="wr-themes">
        {THEMES.map(([label, summary, transcript], idx) => (
          <div key={label} className={`wr-theme ${on(shown > idx)}`}>
            <span className="wr-theme__label">{label}</span>
            <span className="wr-theme__bars">
              <span className="wr-theme__bar is-summary" style={{ width: shown > idx ? `${(summary / 9) * 100}%` : 0 }}>
                <b>{summary}</b>
              </span>
              <span className="wr-theme__bar is-transcript" style={{ width: shown > idx ? `${(transcript / 9) * 100}%` : 0 }}>
                <b>{transcript}</b>
              </span>
            </span>
          </div>
        ))}
      </div>
      <div className={`wr-note wr-note--foot ${on(shown > THEMES.length)}`}>Draft codebooks, awaiting researcher review</div>
    </Frame>
  );
};

// 10 ── Reflection: scripts do the counting, reading does the judging.
const SCRIPTS = ['Enumerate', 'Validate', 'Repair offsets', 'Recount', 'Render'];
const READING = ['Propose a code', 'Choose a span', 'Select a quote', 'Write a finding'];

export const WrJudgementDiagram = ({ className }) => {
  const { ref, shown, done } = useSequence(4);
  return (
    <Frame innerRef={ref} className={className}>
      <div className="wr-row wr-row--two">
        <Card kicker="Scripts do" title="The deterministic work" chips={SCRIPTS} visible={shown >= 1} />
        <Card kicker="Reading does" title="Every analytical decision" chips={READING} visible={shown >= 2} tone="agree" />
      </div>
      <div className="wr-row wr-row--links">
        <Line vertical visible={shown >= 3} />
        <Line vertical visible={shown >= 3} />
      </div>
      <div className={`wr-card wr-card--split ${on(shown >= 3)}`}>
        <span>
          <div className="wr-kicker">Before anything is promoted</div>
          <div className="wr-title">Researcher review gate</div>
        </span>
        <Pill visible={shown >= 4} done={done}>
          Keyword matching is not coding
        </Pill>
      </div>
    </Frame>
  );
};

export const WIN_ROOM_DIAGRAMS = {
  'wr-study-frame': WrStudyFrameDiagram,
  'wr-trace': WrTraceDiagram,
  'wr-pipeline': WrPipelineDiagram,
  'wr-ingest': WrIngestDiagram,
  'wr-process': WrProcessDiagram,
  'wr-codebook': WrCodebookDiagram,
  'wr-sources': WrSourcesDiagram,
  'wr-reach': WrReachDiagram,
  'wr-themes': WrThemesDiagram,
  'wr-judgement': WrJudgementDiagram,
  'wr-chat': WinRoomChatDemo,
};
