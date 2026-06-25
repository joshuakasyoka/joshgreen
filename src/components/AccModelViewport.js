import React, { Suspense, useEffect, useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, Grid, OrbitControls } from '@react-three/drei';

export const RADIUS = 0.65;

export const SCENE_MODELS = [
  {
    id: 'v1',
    name: 'RC-COL-001',
    date: '12.08.2016',
    color: '#f44336',
    position: [-0.6, 0, -0.5],
    height: 1.8,
  },
  {
    id: 'v2',
    name: 'RC-COL-002',
    date: '15.03.2018',
    color: '#4caf50',
    position: [1.4, 0, -1.0],
    height: 2.2,
  },
  {
    id: 'v3',
    name: 'RC-COL-003',
    date: '22.11.2020',
    color: '#ce93d8',
    position: [0.6, 0, 0.8],
    height: 1.2,
  },
];

const COLUMN_ANCHORS = {
  v1: { left: '28%', top: '52%' },
  v2: { left: '62%', top: '46%' },
  v3: { left: '44%', top: '58%' },
};

const RING_ANCHORS = {
  v1: { left: '32%', top: '50%' },
  v2: { left: '66%', top: '40%' },
  v3: { left: '48%', top: '54%' },
};

function CylinderAsset({ model, hovered, ringActive, viewMode = 'combined' }) {
  const midY = model.height / 2;
  const showCylinder = viewMode !== 'ring';
  const showRing = viewMode !== 'cylinder';
  const columnLit = hovered || ringActive;

  return (
    <group position={model.position}>
      {showCylinder && (
        <mesh position={[0, midY, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[RADIUS, RADIUS, model.height, 32]} />
          <meshStandardMaterial
            color={model.color}
            transparent
            opacity={columnLit ? 1 : 0.88}
            roughness={columnLit ? 0.2 : 0.4}
            metalness={columnLit ? 0.3 : 0.1}
            emissive={model.color}
            emissiveIntensity={columnLit ? 0.25 : 0}
          />
        </mesh>
      )}
      {showRing && (
        <mesh position={[0, midY, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[RADIUS + 0.06, 0.045, 8, 48]} />
          <meshStandardMaterial
            color={model.color}
            emissive={model.color}
            emissiveIntensity={ringActive ? 1.2 : 0.5}
            roughness={0.2}
            metalness={0.5}
          />
        </mesh>
      )}
    </group>
  );
}

function CameraRig({ focusId }) {
  const { camera } = useThree();

  useEffect(() => {
    const focusModel = focusId ? SCENE_MODELS.find((model) => model.id === focusId) : null;
    if (focusModel) {
      camera.position.set(
        focusModel.position[0] + 2.1,
        2.5,
        focusModel.position[2] + 2.1
      );
    } else {
      camera.position.set(3.5, 2.5, 3.5);
    }
    camera.updateProjectionMatrix();
  }, [focusId, camera]);

  return null;
}

function AccScene({
  visibleIds,
  hoverColumn,
  activeRing,
  rotating,
  focusId,
  viewMode = 'combined',
}) {
  const visible = SCENE_MODELS.filter((model) => visibleIds.includes(model.id));
  const focusModel = focusId ? SCENE_MODELS.find((model) => model.id === focusId) : null;
  const controlsTarget = focusModel
    ? [focusModel.position[0], focusModel.height / 2, focusModel.position[2]]
    : [0, 0.8, 0];

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-4, 4, -4]} intensity={0.4} color="#aaccff" />
      {visible.map((model) => (
        <CylinderAsset
          key={model.id}
          model={model}
          hovered={hoverColumn === model.id}
          ringActive={activeRing === model.id}
          viewMode={viewMode}
        />
      ))}
      <Grid
        args={[12, 12]}
        position={[0, 0, 0]}
        cellSize={0.5}
        cellThickness={0.4}
        cellColor="#999"
        sectionSize={2}
        sectionThickness={0.8}
        sectionColor="#aaa"
        fadeDistance={12}
        fadeStrength={1}
        infiniteGrid
      />
      <Environment preset="city" />
      <CameraRig focusId={focusId} />
      <OrbitControls
        makeDefault
        target={controlsTarget}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2.2}
        enablePan={false}
        autoRotate={rotating}
        autoRotateSpeed={0.6}
      />
    </>
  );
}

const AccModelViewport = ({
  visible = ['v1', 'v2', 'v3'],
  hoverColumn,
  activeRing,
  rotating = false,
  focusId,
  viewMode = 'combined',
  setTargetRef,
  className = 'moata-3d-panel__viewport',
  anchorClassName = 'moata-3d-panel__column-anchor',
  overlay = null,
}) => {
  const anchors = useMemo(
    () => SCENE_MODELS.filter((model) => visible.includes(model.id)),
    [visible]
  );

  return (
    <div ref={setTargetRef('viewport')} className={className}>
      <Canvas
        camera={{ position: [3.5, 2.5, 3.5], fov: 45 }}
        shadows
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <AccScene
            visibleIds={visible}
            hoverColumn={hoverColumn}
            activeRing={activeRing}
            rotating={rotating}
            focusId={focusId}
            viewMode={viewMode}
          />
        </Suspense>
      </Canvas>

      {anchors.map((model) => {
        const anchor = COLUMN_ANCHORS[model.id];
        if (!anchor) return null;
        return (
          <React.Fragment key={model.id}>
            <span
              ref={setTargetRef(`column-${model.id}`)}
              className={anchorClassName}
              style={{ left: anchor.left, top: anchor.top }}
              aria-hidden="true"
            />
            <span
              ref={setTargetRef(`ring-${model.id}`)}
              className={anchorClassName}
              style={{
                left: (RING_ANCHORS[model.id] || anchor).left,
                top: (RING_ANCHORS[model.id] || anchor).top,
              }}
              aria-hidden="true"
            />
          </React.Fragment>
        );
      })}

      {overlay}
    </div>
  );
};

export default AccModelViewport;
