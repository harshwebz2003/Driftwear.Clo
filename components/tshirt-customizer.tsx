'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Bounds, Center, ContactShadows, Decal, Environment, Html, OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, Maximize2, MessageCircle, MoveDown, MoveLeft, MoveRight, MoveUp, RotateCcw, Upload } from 'lucide-react';
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode, RefObject } from 'react';
import * as THREE from 'three';
import { whatsappLink } from '@/lib/site-data';
import { AnimatedWhatsAppButton } from '@/components/motion';

type ShirtColor = {
  label: string;
  value: string;
  text: string;
};

type DesignState = {
  textureUrl: string | null;
  fileName: string;
  sampleName: string;
  color: ShirtColor;
  size: string;
  note: string;
  scale: number;
  rotation: number;
  positionX: number;
  positionY: number;
  processedBackground: boolean;
};

const colors: ShirtColor[] = [
  { label: 'Black', value: '#050607', text: 'text-white' },
  { label: 'White', value: '#F4F2EC', text: 'text-black' },
  { label: 'Ash', value: '#B8BAB6', text: 'text-black' },
  { label: 'Beige', value: '#C8B793', text: 'text-black' },
  { label: 'Navy', value: '#061126', text: 'text-white' }
];

const samples = [
  { name: 'No design', url: '' },
  { name: 'Drift Flame', url: '/designs/drift-flame.svg' },
  { name: 'Galle Vibe', url: '/designs/galle-vibe.svg' }
];

const initialState: DesignState = {
  textureUrl: null,
  fileName: 'No uploaded design',
  sampleName: 'No design',
  color: colors[0],
  size: 'M',
  note: '',
  scale: 0.42,
  rotation: 0,
  positionX: 0,
  positionY: 0,
  processedBackground: false
};

const CHEST_POSITION = new THREE.Vector3(0, 0.16, -0.405);
const CHEST_LIMITS = {
  x: { min: -0.34, max: 0.34 },
  y: { min: -0.36, max: 0.38 }
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function materialLightingFor(color: ShirtColor) {
  if (color.label === 'Black') {
    return { envMapIntensity: 0.68, roughness: 0.95, bumpScale: 0.014 };
  }

  if (color.label === 'White') {
    return { envMapIntensity: 0.5, roughness: 0.88, bumpScale: 0.011 };
  }

  return { envMapIntensity: 0.82, roughness: 0.91, bumpScale: 0.013 };
}

function supportsWebGL() {
  if (typeof window === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

function createFabricBumpTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext('2d');

  if (!context) return null;

  context.fillStyle = '#808080';
  context.fillRect(0, 0, 128, 128);

  const imageData = context.getImageData(0, 0, 128, 128);
  const data = imageData.data;

  for (let x = 0; x < 128; x += 1) {
    for (let y = 0; y < 128; y += 1) {
      const index = (y * 128 + x) * 4;
      const noise = (Math.sin(x * 0.45) + Math.cos(y * 0.45)) * 14;
      const value = clamp(128 + noise, 0, 255);
      data[index] = value;
      data[index + 1] = value;
      data[index + 2] = value;
    }
  }

  context.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(24, 24);
  return texture;
}

function processDarkBackground(image: HTMLImageElement) {
  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth || image.width;
  canvas.height = image.naturalHeight || image.height;
  const context = canvas.getContext('2d');

  if (!context) return { dataUrl: image.src, processed: false };

  context.drawImage(image, 0, 0);
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  let modified = false;

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];
    const alpha = data[i + 3];

    if (alpha > 0 && red < 34 && green < 34 && blue < 34) {
      data[i + 3] = 0;
      modified = true;
    }
  }

  if (!modified) {
    return { dataUrl: image.src, processed: false };
  }

  context.putImageData(imageData, 0, 0);
  return { dataUrl: canvas.toDataURL('image/png'), processed: true };
}

function ShirtModel({ state }: { state: DesignState }) {
  const { nodes, materials } = useGLTF('/models/tshirt.glb') as unknown as {
    nodes: { T_Shirt: THREE.Mesh };
    materials: { 'FABRIC_1_FRONT_4193.001': THREE.MeshStandardMaterial };
  };

  const [decalTexture, setDecalTexture] = useState<THREE.Texture | null>(null);
  const fabricBumpMap = useMemo(() => createFabricBumpTexture(), []);

  useEffect(() => {
    if (!state.textureUrl) {
      setDecalTexture(null);
      return;
    }

    const loader = new THREE.TextureLoader();
    let isCurrent = true;

    loader.load(
      state.textureUrl,
      (loadedTexture) => {
        if (!isCurrent) return;
        loadedTexture.colorSpace = THREE.SRGBColorSpace;
        loadedTexture.needsUpdate = true;
        setDecalTexture(loadedTexture);
      },
      undefined,
      () => {
        if (isCurrent) {
          setDecalTexture(null);
        }
      }
    );

    return () => {
      isCurrent = false;
    };
  }, [state.textureUrl]);

  useFrame((_, delta) => {
    const targetColor = new THREE.Color(state.color.value);
    const material = materials['FABRIC_1_FRONT_4193.001'];
    const lighting = materialLightingFor(state.color);

    material.color.lerp(targetColor, delta * 6);
    material.roughness = THREE.MathUtils.lerp(material.roughness, lighting.roughness, delta * 4);

    if (fabricBumpMap) {
      material.bumpMap = fabricBumpMap;
      material.bumpScale = lighting.bumpScale;
    }

    material.needsUpdate = true;
  });

  const decalPosition = useMemo(
    () => new THREE.Vector3(CHEST_POSITION.x + state.positionX, CHEST_POSITION.y + state.positionY, CHEST_POSITION.z),
    [state.positionX, state.positionY]
  );

  return (
    <group>
      <mesh castShadow receiveShadow geometry={nodes.T_Shirt.geometry} material={materials['FABRIC_1_FRONT_4193.001']}>
        {decalTexture ? (
          <Decal
            position={decalPosition}
            rotation={[0, 0, state.rotation]}
            scale={[state.scale, state.scale, 0.45]}
            map={decalTexture}
          />
        ) : null}
      </mesh>
    </group>
  );
}

function CameraRig({ isReady }: { isReady: boolean }) {
  const { camera } = useThree();

  useEffect(() => {
    if (!isReady) return;
    camera.position.set(0, 0.22, 2.55);
    camera.lookAt(0, 0.05, 0);
  }, [camera, isReady]);

  return null;
}

function Scene({ state, onReady }: { state: DesignState; onReady: () => void }) {
  const lighting = useMemo(() => materialLightingFor(state.color), [state.color]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.22, 2.55]} fov={34} />
      <CameraRig isReady />
      <ambientLight intensity={0.78} />
      <directionalLight position={[3, 4, 3]} intensity={1.35} castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.0001} />
      <directionalLight position={[-3, 2, -2]} intensity={0.55} color="#d8b45f" />
      <pointLight position={[0, -2, 2]} intensity={0.35} color="#ffffff" />
      <Environment preset="studio" environmentIntensity={lighting.envMapIntensity} />
      <Bounds fit clip observe margin={1.15}>
        <Center onCentered={onReady}>
          <ShirtModel state={state} />
        </Center>
      </Bounds>
      <ContactShadows position={[0, -0.92, 0]} opacity={0.62} scale={4} blur={2.2} far={2.5} />
      <OrbitControls makeDefault enablePan={false} enableZoom minDistance={1.4} maxDistance={3.4} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.75} />
    </>
  );
}

function CanvasFallback() {
  return (
    <Html center>
      <div className="font-brand flex flex-col items-center gap-3 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        <p className="text-xs font-bold uppercase tracking-[.2em] text-gold">Loading 3D T-Shirt Studio</p>
      </div>
    </Html>
  );
}

export default function TshirtCustomizer() {
  const [state, setState] = useState<DesignState>(initialState);
  const [ready, setReady] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [webgl, setWebgl] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWebgl(supportsWebGL());
  }, []);

  const update = useCallback((slice: Partial<DesignState>) => {
    setState((current) => ({ ...current, ...slice }));
  }, []);

  const handleUpload = useCallback(
    (file?: File) => {
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const rawUrl = event.target?.result as string;
        if (!rawUrl) return;

        const image = new window.Image();
        image.crossOrigin = 'anonymous';
        image.onload = () => {
          const { dataUrl, processed } = processDarkBackground(image);
          update({
            textureUrl: dataUrl,
            fileName: file.name,
            sampleName: 'Custom Upload',
            processedBackground: processed
          });
        };
        image.src = rawUrl;
      };
      reader.readAsDataURL(file);
    },
    [update]
  );

  const chooseSample = useCallback(
    (url: string, name: string) => {
      update({
        textureUrl: url || null,
        fileName: url ? name : 'No uploaded design',
        sampleName: name,
        processedBackground: false
      });
    },
    [update]
  );

  const nudge = useCallback(
    (axis: 'x' | 'y', amount: number) => {
      if (axis === 'x') {
        const nextX = clamp(state.positionX + amount, CHEST_LIMITS.x.min, CHEST_LIMITS.x.max);
        update({ positionX: nextX });
        return;
      }

      const minY = CHEST_LIMITS.y.min - CHEST_POSITION.y;
      const maxY = CHEST_LIMITS.y.max - CHEST_POSITION.y;
      const nextY = clamp(state.positionY + amount, minY, maxY);
      update({ positionY: nextY });
    },
    [state.positionX, state.positionY, update]
  );

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.();
      setFullscreen(true);
      return;
    }

    document.exitFullscreen?.();
    setFullscreen(false);
  }, []);

  const orderMessage = useMemo(() => {
    const details = [
      'Hi Driftwear Clo., I styled a T-shirt in the 3D customizer studio.',
      `Color: ${state.color.label}`,
      `Size: ${state.size}`,
      `Design: ${state.sampleName === 'Custom Upload' ? `Custom uploaded design (${state.fileName})` : state.sampleName}`,
      `Placement: X ${(state.positionX * 100).toFixed(0)}%, Y ${(state.positionY * 100).toFixed(0)}%, Scale ${(state.scale * 100).toFixed(0)}%`
    ];

    if (state.note.trim()) {
      details.push(`Note: ${state.note.trim()}`);
    }

    return details.join('\n');
  }, [state]);

  const downloadPreview = useCallback(() => {
    const canvas = containerRef.current?.querySelector('canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `driftwear-custom-tshirt-${state.color.label.toLowerCase()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, [state.color.label]);

  return (
    <section id="customizer" className="section-pad">
      <div className="shell">
        <div className="mb-10 max-w-4xl">
          <p className="eyebrow">Interactive 3D Studio</p>
          <h2 className="display-title mt-4 text-[clamp(3.2rem,7vw,7rem)] text-white">Create your custom T-shirt.</h2>
          <p className="mt-5 max-w-2xl text-base sm:text-lg leading-7 sm:leading-8 text-white/62">
            Upload your artwork, adjust the print position, choose your tee color, and place your order directly on WhatsApp.
          </p>
        </div>

        <div ref={containerRef} className={`grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-start ${fullscreen ? 'fixed inset-0 z-50 overflow-y-auto bg-obsidian p-6' : ''}`}>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="gold-border relative aspect-square w-full overflow-hidden rounded-[2rem] bg-carbon sm:aspect-[4/3] lg:aspect-[1.1/1]">
            <AnimatePresence>
              {!ready && webgl ? (
                <motion.div exit={{ opacity: 0 }} className="absolute inset-0 z-20 grid place-items-center bg-obsidian">
                  <CanvasFallback />
                </motion.div>
              ) : null}
            </AnimatePresence>
            {webgl ? (
              <Canvas className="h-full w-full" gl={{ preserveDrawingBuffer: true, antialias: true, alpha: false }} dpr={[1, 1.75]} performance={{ min: 0.55 }}>
                <Suspense fallback={<CanvasFallback />}>
                  <Scene state={state} onReady={() => setReady(true)} />
                </Suspense>
              </Canvas>
            ) : (
              <div className="grid h-full min-h-[400px] place-items-center p-8 text-center sm:min-h-[540px]">
                <div>
                  <h3 className="font-calista text-2xl font-semibold text-white sm:text-3xl">WebGL is not supported.</h3>
                  <p className="mt-3 text-sm text-white/60">Please open this page in a modern browser with hardware acceleration enabled.</p>
                </div>
              </div>
            )}
            <div className="font-brand pointer-events-none absolute bottom-4 left-4 z-20 rounded-full border border-white/10 bg-black/55 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.14em] text-white/70 backdrop-blur-xl sm:bottom-5 sm:left-5 sm:px-4 sm:py-2 sm:text-xs">
              Drag to orbit / scroll to zoom
            </div>
          </motion.div>

          <motion.aside initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="gold-border rounded-[2rem] p-4 sm:p-6">
            <div className="grid gap-4 sm:gap-5">
              <div>
                <label className="font-brand text-xs font-bold uppercase tracking-[.18em] text-white/60" htmlFor="design-upload">Upload PNG, JPG, or SVG</label>
                <label htmlFor="design-upload" className="font-brand mt-3 flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-dashed border-gold/40 bg-gold/10 px-4 py-4 text-xs font-bold uppercase tracking-[.13em] text-gold transition hover:bg-gold/15 sm:py-5 sm:text-sm">
                  <Upload size={18} /> Upload artwork
                </label>
                <input id="design-upload" type="file" accept="image/png,image/jpeg,image/svg+xml" className="sr-only" onChange={(event) => handleUpload(event.target.files?.[0])} />
                <p className="mt-2 break-words text-xs text-white/55 sm:text-sm">{state.fileName}</p>
                {state.processedBackground ? (
                  <p className="mt-2 rounded-xl border border-gold/20 bg-gold/10 px-3 py-2 text-xs leading-5 text-gold">
                    Black artwork background removed for a clean printed preview.
                  </p>
                ) : null}
              </div>

              <div>
                <p className="font-brand text-xs font-bold uppercase tracking-[.18em] text-white/60">Sample designs</p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {samples.map((sample) => (
                    <button
                      key={sample.name}
                      type="button"
                      onClick={() => chooseSample(sample.url, sample.name)}
                      className={`font-grande rounded-2xl border px-2 py-2.5 text-[11px] font-bold uppercase tracking-[.14em] transition sm:px-3 sm:py-3 sm:text-xs ${state.sampleName === sample.name ? 'border-gold bg-gold text-black' : 'border-white/10 bg-white/[.05] text-white/70 hover:border-gold/60'}`}
                    >
                      {sample.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-brand text-xs font-bold uppercase tracking-[.18em] text-white/60">T-shirt color</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.label}
                      type="button"
                      onClick={() => update({ color })}
                      className={`font-grande flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.14em] sm:py-2 sm:text-xs ${state.color.label === color.label ? 'border-gold text-gold' : 'border-white/10 text-white/60'}`}
                    >
                      <span className="h-4 w-4 rounded-full border border-white/30 sm:h-5 sm:w-5" style={{ backgroundColor: color.value }} />
                      {color.label}
                    </button>
                  ))}
                </div>
              </div>

              <label className="font-brand grid gap-2 text-xs font-bold uppercase tracking-[.18em] text-white/60">
                Size
                <select value={state.size} onChange={(event) => update({ size: event.target.value })} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-gold">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((size) => <option key={size}>{size}</option>)}
                </select>
              </label>

              <ControlSlider label="Design size" min={0.16} max={0.72} step={0.01} value={state.scale} onChange={(scale) => update({ scale })} />
              <ControlSlider label="Design rotation" min={-3.14} max={3.14} step={0.01} value={state.rotation} onChange={(rotation) => update({ rotation })} />
              <ControlSlider label="Horizontal position" min={CHEST_LIMITS.x.min} max={CHEST_LIMITS.x.max} step={0.01} value={state.positionX} onChange={(positionX) => update({ positionX })} />
              <ControlSlider label="Vertical position" min={CHEST_LIMITS.y.min - CHEST_POSITION.y} max={CHEST_LIMITS.y.max - CHEST_POSITION.y} step={0.01} value={state.positionY} onChange={(positionY) => update({ positionY })} />

              <div className="grid grid-cols-4 gap-2">
                <NudgeButton label="Left" icon={<MoveLeft size={16} />} onClick={() => nudge('x', -0.05)} />
                <NudgeButton label="Right" icon={<MoveRight size={16} />} onClick={() => nudge('x', 0.05)} />
                <NudgeButton label="Up" icon={<MoveUp size={16} />} onClick={() => nudge('y', 0.05)} />
                <NudgeButton label="Down" icon={<MoveDown size={16} />} onClick={() => nudge('y', -0.05)} />
              </div>

              <label className="font-brand grid gap-2 text-xs font-bold uppercase tracking-[.18em] text-white/60">
                Custom note
                <textarea value={state.note} onChange={(event) => update({ note: event.target.value })} placeholder="Add print size, deadline, or delivery notes" className="min-h-20 sm:min-h-24 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm normal-case tracking-normal text-white outline-none placeholder:text-white/30 focus:border-gold" />
              </label>

              <div className="grid grid-cols-3 gap-2">
                <button type="button" className="cta-secondary px-2 text-xs" onClick={reset}><RotateCcw size={15} /> Reset</button>
                <button type="button" className="cta-secondary px-2 text-xs" onClick={toggleFullscreen}><Maximize2 size={15} /> {fullscreen ? 'Exit' : 'Full'}</button>
                <button type="button" className="cta-secondary px-2 text-xs" onClick={downloadPreview}><Download size={15} /> Save</button>
              </div>

              <AnimatedWhatsAppButton
                text="Order Custom Design"
                message={orderMessage}
                size="md"
                className="w-full"
              />
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function ControlSlider({ label, min, max, step, value, onChange }: { label: string; min: number; max: number; step: number; value: number; onChange: (value: number) => void }) {
  return (
    <label className="font-brand grid gap-2 text-xs font-bold uppercase tracking-[.18em] text-white/60">
      <span className="flex justify-between gap-3"><span>{label}</span><span className="text-gold">{value.toFixed(2)}</span></span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="accent-gold" />
    </label>
  );
}

function NudgeButton({ label, icon, onClick }: { label: string; icon: ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[.06] text-white/75 transition hover:border-gold hover:text-gold" aria-label={`Move design ${label.toLowerCase()}`}>
      {icon}
    </button>
  );
}

useGLTF.preload('/models/tshirt.glb');
