'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Bounds, Center, ContactShadows, Decal, Environment, Html, OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, Maximize2, MessageCircle, MoveDown, MoveLeft, MoveRight, MoveUp, RotateCcw, Upload, Scaling } from 'lucide-react';
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

const printSizePresets = [
  { label: 'Chest Logo', scale: 0.24, desc: 'Small' },
  { label: 'A4 Standard', scale: 0.42, desc: 'Medium' },
  { label: 'A3 Large', scale: 0.55, desc: 'Large' },
  { label: 'Full Oversized', scale: 0.65, desc: 'Jumbo' }
];

const samples = [
  { name: 'Drift Flame', url: '/designs/drift-flame.svg' },
  { name: 'Galle Vibe', url: '/designs/galle-vibe.svg' },
  { name: 'DW Emblem', url: '/assets/logo.png' }
];

const initialState: DesignState = {
  textureUrl: '/designs/drift-flame.svg',
  fileName: 'Drift Flame Design',
  sampleName: 'Drift Flame',
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
  if (typeof window === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext('2d');
  if (!context) return null;

  context.fillStyle = '#808080';
  context.fillRect(0, 0, 128, 128);

  const imageData = context.getImageData(0, 0, 128, 128);
  const data = imageData.data;

  for (let y = 0; y < 128; y += 1) {
    for (let x = 0; x < 128; x += 1) {
      const index = (y * 128 + x) * 4;
      const noise = ((x + y) % 2 === 0 ? 12 : -12) + (Math.sin(x * 0.4) * 6);
      const val = clamp(128 + noise, 0, 255);
      data[index] = val;
      data[index + 1] = val;
      data[index + 2] = val;
      data[index + 3] = 255;
    }
  }

  context.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(16, 16);
  return texture;
}

function ShirtModel({ state }: { state: DesignState }) {
  const gltf = useGLTF('/models/tshirt.glb') as any;

  // Clone scene so materials can be safely mutated
  const clonedScene = useMemo(() => {
    if (!gltf.scene) return null;
    const clone = gltf.scene.clone(true);
    clone.traverse((node: any) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        if (node.material) {
          node.material = node.material.clone();
        }
      }
    });
    return clone;
  }, [gltf.scene]);

  const targetMesh = useMemo(() => {
    let foundMesh: THREE.Mesh | null = null;
    if (clonedScene) {
      clonedScene.traverse((child: any) => {
        if (child.isMesh && !foundMesh) {
          foundMesh = child;
        }
      });
    }
    return foundMesh;
  }, [clonedScene]);

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
    if (!clonedScene) return;

    const targetColor = new THREE.Color(state.color.value);
    const lighting = materialLightingFor(state.color);

    clonedScene.traverse((node: any) => {
      if (node.isMesh && node.material) {
        const mat = node.material as THREE.MeshStandardMaterial;
        if (mat.color) {
          mat.color.lerp(targetColor, delta * 6);
        }
        if (typeof mat.roughness === 'number') {
          mat.roughness = THREE.MathUtils.lerp(mat.roughness, lighting.roughness, delta * 4);
        }
        if (fabricBumpMap) {
          mat.bumpMap = fabricBumpMap;
          mat.bumpScale = lighting.bumpScale;
        }
        mat.needsUpdate = true;
      }
    });
  });

  const decalPosition = useMemo(
    () => new THREE.Vector3(CHEST_POSITION.x + state.positionX, CHEST_POSITION.y + state.positionY, CHEST_POSITION.z),
    [state.positionX, state.positionY]
  );

  return (
    <group>
      {clonedScene ? (
        <primitive object={clonedScene}>
          {targetMesh && decalTexture ? (
            <mesh geometry={(targetMesh as any).geometry}>
              <meshBasicMaterial transparent opacity={0} />
              <Decal
                position={decalPosition}
                rotation={[0, 0, state.rotation]}
                scale={[state.scale, state.scale, 0.45]}
                map={decalTexture}
              />
            </mesh>
          ) : null}
        </primitive>
      ) : null}
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

  useEffect(() => {
    onReady();
  }, [onReady]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.2, 2.65]} fov={38} />
      <CameraRig isReady />

      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 3]} intensity={1.25} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} />

      <Environment preset="city" environmentIntensity={lighting.envMapIntensity} />

      <Center top>
        <ShirtModel state={state} />
      </Center>

      <ContactShadows position={[0, -0.92, 0]} opacity={0.65} scale={3.2} blur={1.8} far={1.5} color="#000000" />
      <OrbitControls enablePan enableZoom minDistance={1.4} maxDistance={4.2} maxPolarAngle={Math.PI / 1.7} />
    </>
  );
}

if (typeof window !== 'undefined') {
  useGLTF.preload('/models/tshirt.glb');
}

export default function TshirtCustomizer() {
  const [state, setState] = useState<DesignState>(initialState);
  const [fullscreen, setFullscreen] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setHasWebGL(supportsWebGL());
  }, []);

  const update = useCallback((partial: Partial<DesignState>) => {
    setState((curr) => ({ ...curr, ...partial }));
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    update({
      textureUrl: url,
      fileName: file.name,
      sampleName: ''
    });
  };

  const selectSample = (sample: { name: string; url: string }) => {
    update({
      textureUrl: sample.url,
      fileName: `${sample.name} Sample`,
      sampleName: sample.name
    });
  };

  const reset = () => {
    setState(initialState);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const toggleFullscreen = () => {
    setFullscreen((value) => !value);
  };

  const downloadPreview = () => {
    const canvas = document.querySelector('#customizer-canvas canvas') as HTMLCanvasElement | null;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `driftwear-custom-${state.color.label.toLowerCase()}-${state.size.toLowerCase()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const nudge = (axis: 'x' | 'y', direction: 1 | -1) => {
    const step = 0.02;
    if (axis === 'x') {
      update({ positionX: clamp(state.positionX + step * direction, CHEST_LIMITS.x.min, CHEST_LIMITS.x.max) });
    } else {
      update({ positionY: clamp(state.positionY + step * direction, CHEST_LIMITS.y.min, CHEST_LIMITS.y.max) });
    }
  };

  const orderMessage = useMemo(() => {
    const lines = [
      'Hi Driftwear Clo., I built a custom design in your 3D fitting studio:',
      `- Garment Color: ${state.color.label}`,
      `- Size: ${state.size}`,
      `- Design Print Scale: ${state.scale.toFixed(2)}`,
      `- Design File: ${state.fileName}`
    ];

    if (state.note.trim()) {
      lines.push(`- Notes: ${state.note.trim()}`);
    }

    lines.push('Please confirm print pricing and dispatch timeframe.');
    return lines.join('\n');
  }, [state.color.label, state.fileName, state.note, state.scale, state.size]);

  return (
    <section id="customizer" className="section-pad relative z-10">
      <div className="shell">
        <div className="mb-8 max-w-4xl sm:mb-10">
          <p className="eyebrow">Interactive 3D Studio</p>
          <h2 className="display-title mt-3 text-[clamp(2.6rem,6.5vw,7rem)] text-white">Fit your design on 3D T-shirts.</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/68 sm:text-lg sm:leading-8">
            Upload your artwork, adjust placement, design print size, and color in real-time. Experience industrial DTF transfer fitting before ordering.
          </p>
        </div>

        <div className={`grid gap-6 lg:grid-cols-[1.25fr_.75fr] ${fullscreen ? 'fixed inset-4 z-50 bg-black/90 p-4 sm:p-6 backdrop-blur-2xl rounded-3xl border border-gold/40' : ''}`}>
          <div className="relative min-h-[460px] sm:min-h-[580px] overflow-hidden rounded-[2.2rem] sm:rounded-[2.8rem] gold-gradient-border bg-[#0B0813]/90 shadow-2xl backdrop-blur-2xl">
            <div id="customizer-canvas" className="absolute inset-0">
              {hasWebGL ? (
                <Canvas shadows gl={{ preserveDrawingBuffer: true, antialias: true }}>
                  <Suspense fallback={null}>
                    <Scene state={state} onReady={() => setSceneReady(true)} />
                  </Suspense>
                </Canvas>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center text-white/70">
                  <p className="font-brand text-sm font-bold uppercase tracking-wider text-gold">WebGL Unavailable</p>
                  <p className="mt-2 text-xs">Your browser doesn't support interactive 3D rendering.</p>
                </div>
              )}
            </div>

            {!sceneReady && hasWebGL ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/80 backdrop-blur-md">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold border-t-transparent" />
                <p className="font-brand text-xs font-bold uppercase tracking-[.2em] text-gold">Building 3D Model Scene...</p>
              </div>
            ) : null}

            <div className="absolute left-4 top-4 flex flex-wrap gap-2 sm:left-6 sm:top-6">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-black/70 px-3.5 py-1.5 font-brand text-xs font-bold text-white backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                3D Live Studio
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3.5 py-1.5 font-brand text-xs font-medium text-white/80 backdrop-blur-md">
                {state.color.label} Garment
              </span>
            </div>

            <div className="absolute bottom-4 right-4 flex gap-2 sm:bottom-6 sm:right-6">
              <button
                onClick={toggleFullscreen}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-black/70 text-white backdrop-blur-md transition hover:border-gold hover:text-gold"
                title={fullscreen ? 'Exit Fullscreen' : 'Fullscreen 3D View'}
              >
                <Maximize2 size={16} />
              </button>
            </div>
          </div>

          <motion.aside initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col justify-between rounded-[2.2rem] sm:rounded-[2.8rem] gold-gradient-border bg-[#0B0813]/90 p-5 sm:p-7 backdrop-blur-2xl">
            <div className="grid gap-5">
              <div>
                <span className="font-brand text-xs font-bold uppercase tracking-[.2em] gold-gradient-text">1. Upload Artwork / Select Sample</span>
                <div className="mt-2.5 flex flex-col gap-2">
                  <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/svg+xml,image/webp" onChange={handleFileUpload} className="hidden" id="design-upload-input" />
                  <label htmlFor="design-upload-input" className="cta-secondary cursor-pointer w-full text-center">
                    <Upload size={16} /> Upload Design File
                  </label>
                  <p className="truncate text-center font-brand text-[11px] font-medium text-white/50">{state.fileName}</p>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {samples.map((s) => (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => selectSample(s)}
                      className={`rounded-full border px-3 py-1 text-[11px] font-bold transition ${
                        state.sampleName === s.name ? 'border-gold bg-gold/20 text-gold' : 'border-white/15 bg-black/40 text-white/60 hover:text-white'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-brand text-xs font-bold uppercase tracking-[.2em] gold-gradient-text">2. Design Print Size</span>
                <div className="mt-2.5 grid grid-cols-2 gap-2">
                  {printSizePresets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => update({ scale: preset.scale })}
                      className={`flex flex-col items-center justify-center rounded-xl border py-2.5 px-2 transition ${
                        Math.abs(state.scale - preset.scale) < 0.03
                          ? 'border-gold bg-gold text-black font-extrabold shadow-md'
                          : 'border-white/15 bg-black/40 text-white/70 hover:border-gold/50'
                      }`}
                    >
                      <span className="font-brand text-xs uppercase tracking-wider">{preset.label}</span>
                      <span className="text-[10px] opacity-75">{preset.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-brand text-xs font-bold uppercase tracking-[.2em] gold-gradient-text">3. Select Garment Color</span>
                <div className="mt-2.5 flex flex-wrap gap-2.5">
                  {colors.map((c) => (
                    <button
                      key={c.label}
                      type="button"
                      onClick={() => update({ color: c })}
                      className={`group flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold transition ${
                        state.color.label === c.label ? 'border-gold bg-gold/25 text-white shadow-md' : 'border-white/15 bg-black/40 text-white/60 hover:border-gold/40 hover:text-white'
                      }`}
                    >
                      <span className="h-3.5 w-3.5 rounded-full border border-white/30 shadow-inner" style={{ backgroundColor: c.value }} />
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-brand text-xs font-bold uppercase tracking-[.2em] gold-gradient-text">4. Select T-Shirt Size</span>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => update({ size: sz })}
                      className={`h-9 w-11 rounded-xl border font-brand text-xs font-bold uppercase transition ${
                        state.size === sz ? 'border-gold bg-gold text-black font-extrabold shadow-md' : 'border-white/15 bg-black/40 text-white/70 hover:border-gold/50'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-brand text-xs font-bold uppercase tracking-[.2em] gold-gradient-text">5. Position & Fine Controls</span>
                <div className="mt-2.5 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/40 p-3">
                  <div className="grid grid-cols-3 gap-1">
                    <div />
                    <button type="button" onClick={() => nudge('y', 1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition hover:bg-gold/20 hover:text-gold" title="Move Up"><MoveUp size={14} /></button>
                    <div />
                    <button type="button" onClick={() => nudge('x', -1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition hover:bg-gold/20 hover:text-gold" title="Move Left"><MoveLeft size={14} /></button>
                    <button type="button" onClick={reset} className="flex h-8 w-8 items-center justify-center rounded-lg border border-gold/40 bg-gold/10 text-gold transition hover:bg-gold hover:text-black" title="Reset Position"><RotateCcw size={14} /></button>
                    <button type="button" onClick={() => nudge('x', 1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition hover:bg-gold/20 hover:text-gold" title="Move Right"><MoveRight size={14} /></button>
                    <div />
                    <button type="button" onClick={() => nudge('y', -1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition hover:bg-gold/20 hover:text-gold" title="Move Down"><MoveDown size={14} /></button>
                    <div />
                  </div>

                  <div className="flex flex-1 flex-col gap-1.5 pl-2">
                    <label className="flex items-center justify-between text-[11px] font-medium text-white/70">
                      <span>Custom Scale</span>
                      <span className="font-mono text-gold">{state.scale.toFixed(2)}</span>
                    </label>
                    <input
                      type="range"
                      min={0.15}
                      max={0.75}
                      step={0.01}
                      value={state.scale}
                      onChange={(e) => update({ scale: Number(e.target.value) })}
                      className="accent-gold h-1.5 w-full cursor-pointer rounded-lg bg-white/20"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2.5 border-t border-white/10 pt-5">
              <AnimatedWhatsAppButton
                text="Order Custom Design"
                message={orderMessage}
                size="md"
                className="w-full"
              />
              <button
                type="button"
                onClick={downloadPreview}
                className="font-brand flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/20 bg-black/40 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:border-gold hover:text-gold"
              >
                <Download size={15} /> Download 3D Snapshot
              </button>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
