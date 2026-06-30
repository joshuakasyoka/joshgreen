import React, { useRef } from 'react';
import {
  GisToolsHeader,
  GisToolsMapArea,
  GisToolsWindow,
  ToolboxPanel,
  useDemoAnimation,
} from './MoataGisToolsShared';

const STEPS = [
  { toolboxOpen: false, hoverId: null, pinHoverId: null, pinnedId: null, target: 'toolbox-btn', duration: 1400 },
  { toolboxOpen: true, hoverId: null, pinHoverId: null, pinnedId: null, target: 'toolbox-btn', duration: 1000 },
  { toolboxOpen: true, hoverId: 'measure', pinHoverId: null, pinnedId: null, target: 'row-measure', duration: 1200 },
  { toolboxOpen: true, hoverId: 'measure', pinHoverId: 'measure', pinnedId: null, target: 'pin-measure', duration: 1000 },
  { toolboxOpen: true, hoverId: 'measure', pinHoverId: 'measure', pinnedId: 'measure', target: 'pin-measure', duration: 1400 },
  { toolboxOpen: true, hoverId: 'editor', pinHoverId: null, pinnedId: 'measure', target: 'row-editor', duration: 1400 },
  { toolboxOpen: true, hoverId: 'spatial_query', pinHoverId: null, pinnedId: 'measure', target: 'row-spatial_query', duration: 1400 },
  { toolboxOpen: false, hoverId: null, pinHoverId: null, pinnedId: 'measure', target: null, duration: 1400 },
];

const MoataGisToolboxDemo = ({ className = '', style }) => {
  const containerRef = useRef(null);
  const { step, cursor, setTargetRef } = useDemoAnimation(STEPS, containerRef);

  return (
    <GisToolsWindow containerRef={containerRef} cursor={cursor} className={className} style={style}>
      <GisToolsHeader />
      <div className="moata-gis-tools__workspace">
        <GisToolsMapArea
          toolboxOpen={step.toolboxOpen}
          toolboxRef={setTargetRef('toolbox-btn')}
          pinnedTools={step.pinnedId ? [step.pinnedId] : []}
        >
          <ToolboxPanel
            visible={step.toolboxOpen}
            hoverId={step.hoverId}
            pinHoverId={step.pinHoverId}
            pinnedId={step.pinnedId}
            setRowRef={setTargetRef}
          />
        </GisToolsMapArea>
      </div>
    </GisToolsWindow>
  );
};

export default MoataGisToolboxDemo;
