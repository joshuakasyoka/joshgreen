import React from 'react';
import { Card, Frame, Line, Pill, useSequence } from './WinRoomDiagrams';
import './WinRoomDiagrams.css';

// Diagrams for the Monthly Project Review case study, in the Win Room
// diagram language. Content is paraphrased from the study's findings and
// guidelines - counts only, no participants, roles or quotes.

// Situation - the monthly review today.
const TODAY = [
  ['Inputs', 'Assembled by hand', ['Business systems', 'Personal spreadsheets']],
  ['Before', 'Analysis done early', ['Days/month on big jobs']],
  ['The meeting', 'An update, not a review', ['The form is the agenda']],
  ['After', 'Actions rebuilt from email', ['Nothing carries forward']],
];

export const MprSituationDiagram = ({ className }) => {
  const { ref, shown, done } = useSequence(TODAY.length + 1);
  return (
    <Frame innerRef={ref} className={className}>
      <div className="wr-row wr-row--chain">
        {TODAY.map(([kicker, title, chips], idx) => (
          <React.Fragment key={kicker}>
            {idx > 0 && <Line visible={shown > idx} />}
            <Card kicker={kicker} title={title} chips={chips} visible={shown > idx} />
          </React.Fragment>
        ))}
      </div>
      <div className="wr-row wr-row--end">
        <Pill visible={shown > TODAY.length - 1} done={done}>
          A paper trail nobody acts on
        </Pill>
      </div>
    </Frame>
  );
};

// Task - the three configurations the guidelines fall into.
export const MprTaskDiagram = ({ className }) => {
  const { ref, shown, done } = useSequence(5);
  return (
    <Frame innerRef={ref} className={className}>
      <Card
        kicker="The task"
        title="Design a tool for running the review, month to month"
        visible={shown >= 1}
        tone="question"
      />
      <div className="wr-row wr-row--center">
        <Line vertical visible={shown >= 2} />
      </div>
      <div className="wr-row wr-row--three">
        <Card kicker="Configuration 1" title="Pre-fill and verify" chips={['Healthy at a glance', 'From systems of record', 'Gaps flagged']} visible={shown >= 2} />
        <Card kicker="Configuration 2" title="Capture and follow through" chips={['Actions tracked live', 'Carried into next month']} visible={shown >= 3} />
        <Card kicker="Configuration 3" title="Prompt the conversation" chips={['What is not yet discussed', 'Prompts, not answers']} visible={shown >= 4} />
      </div>
      <div className="wr-row wr-row--end">
        <Pill visible={shown >= 5} done={done}>
          16 guidelines behind them
        </Pill>
      </div>
    </Frame>
  );
};

// Action 1 - the research, reduced step by step to guidelines.
const FUNNEL = [
  ['10', 'Interviews'],
  ['292', 'Observations'],
  ['76', 'Codes'],
  ['50', 'Findings'],
  ['16', 'Guidelines'],
];

export const MprResearchDiagram = ({ className }) => {
  const { ref, shown, done } = useSequence(FUNNEL.length + 1);
  return (
    <Frame innerRef={ref} className={className}>
      <div className="wr-row wr-row--chain">
        {FUNNEL.map(([count, label], idx) => (
          <React.Fragment key={label}>
            {idx > 0 && <Line visible={shown > idx} />}
            <Card kicker={label} title={count} visible={shown > idx} tone={idx === FUNNEL.length - 1 ? 'agree' : undefined} className="wr-card--count" />
          </React.Fragment>
        ))}
      </div>
      <div className="wr-row wr-row--end">
        <Pill visible={shown >= FUNNEL.length} done={done}>
          Every guideline counts who supports it
        </Pill>
      </div>
    </Frame>
  );
};

// Results - the monthly loop the tool runs.
const LOOP = [
  ['1', 'Pre-fill', 'Figures arrive from the systems'],
  ['2', 'Review', 'The agenda prompts the discussion'],
  ['3', 'Capture', 'Actions leave as tracked work'],
  ['4', 'Carry forward', 'Next month opens with them'],
];

export const MprCycleDiagram = ({ className }) => {
  const { ref, shown, done } = useSequence(LOOP.length + 1);
  return (
    <Frame innerRef={ref} className={className}>
      <div className="wr-row wr-row--chain">
        {LOOP.map(([num, title, kicker], idx) => (
          <React.Fragment key={title}>
            {idx > 0 && <Line visible={shown > idx} />}
            <Card kicker={`${num} · ${kicker}`} title={title} visible={shown > idx} />
          </React.Fragment>
        ))}
      </div>
      <div className={`wr-loopback ${shown > LOOP.length ? 'is-on' : ''}`}>
        <span className="wr-loopback__line" />
        <span className="wr-loopback__label">Next month</span>
      </div>
      <div className="wr-row wr-row--end">
        <Pill visible={shown > LOOP.length} done={done}>
          Each month starts where the last one ended
        </Pill>
      </div>
    </Frame>
  );
};

// Reflection - one tool, very different reviews.
export const MprScaleDiagram = ({ className }) => {
  const { ref, shown, done } = useSequence(4);
  return (
    <Frame innerRef={ref} className={className}>
      <div className="wr-row wr-row--two">
        <Card kicker="Small project" title="A ten-minute review" chips={['A copied form', 'A few figures']} visible={shown >= 1} />
        <Card kicker="Major programme" title="An hour and a slide deck" chips={['Days of consolidation', 'Many stakeholders']} visible={shown >= 2} />
      </div>
      <div className="wr-row wr-row--links">
        <Line vertical visible={shown >= 3} />
        <Line vertical visible={shown >= 3} />
      </div>
      <div className={`wr-card wr-card--split ${shown >= 3 ? 'is-on' : ''}`}>
        <span>
          <div className="wr-kicker">The design response</div>
          <div className="wr-title">One tool that scales - not one fixed template</div>
        </span>
        <Pill visible={shown >= 4} done={done}>
          Variation is a design input
        </Pill>
      </div>
    </Frame>
  );
};

export const MPR_DIAGRAMS = {
  'mpr-situation': MprSituationDiagram,
  'mpr-task': MprTaskDiagram,
  'mpr-research': MprResearchDiagram,
  'mpr-cycle': MprCycleDiagram,
  'mpr-scale': MprScaleDiagram,
};
