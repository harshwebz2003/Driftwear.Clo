'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Bounds, Center, ContactShadows, Decal, Environment, Html, OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, Maximize2, MessageCircle, MoveDown, MoveLeft, MoveRight, MoveUp, RotateCcw, Upload } from 'lucide-react';
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode, RefObject } from 'react';
import * as THREE from 'three';
import { whatsappLink } from '@/lib/site-data';

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
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < canvas.height; y += 2) {
    context.fillStyle = y % 4 === 0 ? '#8d8d8d' : '#737373';
    context.fillRect(0, y, canvas.width, 1);
  }

  for (let x = 0; x < canvas.width; x += 3) {
    context.fillStyle = x % 6 === 0 ? 'rgba(255,255,255,.24)' : 'rgba(0,0,0,.18)';
    context.fillRect(x, 0, 1, canvas.height);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(18, 18);
  texture.colorSpace = THREE.NoColorSpace;
  texture.needsUpdate = true;

  return texture;
}

function isNearBlack(red: number, green: number, blue: number) {
  return red < 58 && green < 58 && blue < 58 && red + green + blue < 132;
}

function imageFromUrl(url: string) {
  return new Promise<InstanceType<typeof globalThis.Image>>((resolve, reject) => {
    const image = new globalThis.Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Unable to load uploaded artwork.'));
    image.src = url;
  });
}

function canvasToBlob(canvas: { toBlob: (callback: (blob: globalThis.Blob | null) => void, type?: string) => void }) {
  return new Promise<globalThis.Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Unable to process uploaded artwork.'));
    }, 'image/png');
  });
}

async function removeBlackArtworkBackground(file: File) {
  const sourceUrl = URL.createObjectURL(file);

  try {
    const image = await imageFromUrl(sourceUrl);
    const maxSize = 2048;
    const ratio = Math.min(1, maxSize / Math.max(image.naturalWidth, image.naturalHeight));
    const width = Math.max(1, Math.round(image.naturalWidth * ratio));
    const height = Math.max(1, Math.round(image.naturalHeight * ratio));
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d', { willReadFrequently: true });

    if (!context) return { url: sourceUrl, processedBackground: false, revokeSource: false };

    context.drawImage(image, 0, 0, width, height);
    const imageData = context.getImageData(0, 0, width, height);
    const { data } = imageData;
    let edgePixels = 0;
    let blackEdgePixels = 0;

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        if (x > 3 && y > 3 && x < width - 4 && y < height - 4) continue;
        const index = (y * width + x) * 4;
        edgePixels += 1;
        if (isNearBlack(data[index], data[index + 1], data[index + 2])) {
          blackEdgePixels += 1;
        }
      }
    }

    const shouldRemoveBlack = edgePixels > 0 && blackEdgePixels / edgePixels > 0.34;

    if (!shouldRemoveBlack) {
      return { url: sourceUrl, processedBackground: false, revokeSource: false };
    }

    for (let index = 0; index < data.length; index += 4) {
      const red = data[index];
      const green = data[index + 1];
      const blue = data[index + 2];
      const luminance = red * 0.2126 + green * 0.7152 + blue * 0.0722;

      if (isNearBlack(red, green, blue)) {
        data[index + 3] = 0;
      } else if (luminance < 82) {
        data[index + 3] = Math.min(data[index + 3], Math.round(((luminance - 34) / 48) * 255));
      }
    }

    context.putImageData(imageData, 0, 0);
    const blob = await canvasToBlob(canvas);
    const processedUrl = URL.createObjectURL(blob);
    URL.revokeObjectURL(sourceUrl);

    return { url: processedUrl, processedBackground: true, revokeSource: true };
  } catch {
    return { url: sourceUrl, processedBackground: false, revokeSource: false };
  }
}

function TshirtModel({ state }: { state: DesignState }) {
  const group = useRef<THREE.Group>(null);
  const shirtMeshRef = useRef<THREE.Mesh>(null!);
  const { scene } = useGLTF('/models/tshirt.glb');
  const model = useMemo(() => scene.clone(true), [scene]);
  const hasDesign = Boolean(state.textureUrl);
  const fabricBump = useMemo(() => (typeof document === 'undefined' ? null : createFabricBumpTexture()), []);

  useEffect(() => () => fabricBump?.dispose(), [fabricBump]);

  useEffect(() => {
    model.traverse((node) => {
      if ('isMesh' in node && node.isMesh) {
        const mesh = node as THREE.Mesh;
        const lighting = materialLightingFor(state.color);
        shirtMeshRef.current = mesh;
        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(state.color.value),
          roughness: lighting.roughness,
          metalness: 0,
          envMapIntensity: lighting.envMapIntensity,
          bumpMap: fabricBump ?? undefined,
          bumpScale: lighting.bumpScale
        });
        mesh.material = material;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [fabricBump, model, state.color]);

  useFrame((_, delta) => {
    if (!group.current) return;
    if (hasDesign) {
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, 0, 2.6, delta);
      return;
    }

    group.current.rotation.y += delta * 0.14;
  });

  return (
    <group ref={group}>
      <Center>
        <group scale={1.76} rotation={[0, Math.PI, 0]}>
          <primitive object={model} />
          {hasDesign && shirtMeshRef.current ? <PrintedDesign state={state} shirtMeshRef={shirtMeshRef} fabricBump={fabricBump} /> : null}
        </group>
      </Center>
    </group>
  );
}

function PrintedDesign({ state, shirtMeshRef, fabricBump }: { state: DesignState; shirtMeshRef: RefObject<THREE.Mesh>; fabricBump: THREE.Texture | null }) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (!state.textureUrl) {
      setTexture((current) => {
        current?.dispose();
        return null;
      });
      return undefined;
    }

    setTexture((current) => {
      current?.dispose();
      return null;
    });

    let active = true;
    let loaded: THREE.Texture | null = null;
    const loader = new THREE.TextureLoader();

    loader.load(
      state.textureUrl,
      (loadedTexture) => {
        if (!active) {
          loadedTexture.dispose();
          return;
        }

        loaded = loadedTexture;
        loaded.colorSpace = THREE.SRGBColorSpace;
        loaded.flipY = false;
        loaded.wrapS = THREE.ClampToEdgeWrapping;
        loaded.wrapT = THREE.ClampToEdgeWrapping;
        loaded.anisotropy = 8;
        loaded.needsUpdate = true;
        setTexture((current) => {
          current?.dispose();
          return loadedTexture;
        });
      },
      undefined,
      () => {
        if (active) setTexture(null);
      }
    );

    return () => {
      active = false;
      loaded?.dispose();
    };
  }, [state.textureUrl]);

  if (!texture) return null;

  const position = [
    clamp(state.positionX, CHEST_LIMITS.x.min, CHEST_LIMITS.x.max),
    clamp(CHEST_POSITION.y + state.positionY, CHEST_LIMITS.y.min, CHEST_LIMITS.y.max),
    CHEST_POSITION.z
  ] as [number, number, number];
  const decalScale = clamp(state.scale, 0.16, 0.72);

  return (
    <Decal
      mesh={shirtMeshRef}
      position={position}
      rotation={state.rotation}
      scale={[decalScale, decalScale, 0.16]}
      polygonOffsetFactor={-12}
      depthTest
      renderOrder={20}
    >
      <meshStandardMaterial
        map={texture}
        bumpMap={fabricBump ?? undefined}
        bumpScale={0.01}
        transparent
        alphaTest={0.15}
        opacity={0.9}
        roughness={0.96}
        metalness={0}
        polygonOffset
        polygonOffsetFactor={-12}
        depthWrite={false}
        toneMapped={false}
        side={THREE.FrontSide}
      />
    </Decal>
  );
}

function Scene({ state, onReady }: { state: DesignState; onReady: () => void }) {
  const gl = useThree((threeState) => threeState.gl);

  useEffect(() => {
    onReady();
  }, [onReady]);

  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 0.94;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  }, [gl]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.45, 5.35]} fov={34} />
      <color attach="background" args={['#080B10']} />
      <fog attach="fog" args={['#080B10', 7.5, 14]} />
      <ambientLight intensity={1.25} />
      <directionalLight position={[3, 5, 5]} intensity={2.45} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <spotLight position={[-4, 3, 4]} angle={0.42} intensity={6.3} color="#FFFFFF" penumbra={0.72} />
      <pointLight position={[2.8, 1.2, -2.4]} intensity={1.75} color="#C8CDD2" />
      <Environment preset="studio" environmentIntensity={0.62} />
      <Bounds fit clip observe margin={1.42}>
        <TshirtModel state={state} />
      </Bounds>
      <ContactShadows position={[0, -1.72, 0]} opacity={0.42} scale={5.8} blur={2.4} far={3.8} color="#02050A" />
      <OrbitControls enableDamping dampingFactor={0.08} minDistance={3.25} maxDistance={8} autoRotate={false} />
    </>
  );
}

function CanvasFallback() {
  return (
    <Html center>
      <div className="rounded-2xl border border-gold/30 bg-black/80 px-5 py-4 text-center text-sm font-bold text-white">
        Loading 3D T-shirt model...
      </div>
    </Html>
  );
}

export default function TshirtCustomizer() {
  const [state, setState] = useState<DesignState>(initialState);
  const [ready, setReady] = useState(false);
  const [webgl, setWebgl] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWebgl(supportsWebGL());
    return () => {
      if (state.textureUrl?.startsWith('blob:')) URL.revokeObjectURL(state.textureUrl);
    };
  }, [state.textureUrl]);

  const update = useCallback((patch: Partial<DesignState>) => {
    setState((current) => ({ ...current, ...patch }));
  }, []);

  const handleUpload = async (file: File | undefined) => {
    if (!file) return;
    if (!['image/png', 'image/jpeg', 'image/svg+xml'].includes(file.type)) return;
    const processed = file.type === 'image/svg+xml'
      ? { url: URL.createObjectURL(file), processedBackground: false }
      : await removeBlackArtworkBackground(file);
    setState((current) => {
      if (current.textureUrl?.startsWith('blob:')) URL.revokeObjectURL(current.textureUrl);
      return { ...current, textureUrl: processed.url, fileName: file.name, sampleName: 'Uploaded artwork', processedBackground: processed.processedBackground };
    });
  };

  const chooseSample = (url: string, name: string) => {
    setState((current) => {
      if (current.textureUrl?.startsWith('blob:')) URL.revokeObjectURL(current.textureUrl);
      return { ...current, textureUrl: url || null, fileName: url ? `${name}.svg` : 'No uploaded design', sampleName: name, processedBackground: false };
    });
  };

  const nudge = (axis: 'x' | 'y', amount: number) => {
    setState((current) => ({
      ...current,
      positionX: axis === 'x' ? Number(clamp(current.positionX + amount, CHEST_LIMITS.x.min, CHEST_LIMITS.x.max).toFixed(2)) : current.positionX,
      positionY: axis === 'y' ? Number(clamp(current.positionY + amount, CHEST_LIMITS.y.min - CHEST_POSITION.y, CHEST_LIMITS.y.max - CHEST_POSITION.y).toFixed(2)) : current.positionY
    }));
  };

  const reset = () => {
    setState((current) => {
      if (current.textureUrl?.startsWith('blob:')) URL.revokeObjectURL(current.textureUrl);
      return initialState;
    });
  };

  const toggleFullscreen = async () => {
    if (!viewerRef.current) return;
    if (!document.fullscreenElement) {
      await viewerRef.current.requestFullscreen();
      setFullscreen(true);
    } else {
      await document.exitFullscreen();
      setFullscreen(false);
    }
  };

  const downloadPreview = () => {
    const canvas = viewerRef.current?.querySelector('canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `driftwear-${state.color.label.toLowerCase()}-custom-preview.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const orderMessage = `Hi Driftwear Clo., I want to order this 3D custom T-shirt design.
Selected T-shirt color: ${state.color.label}
Selected size: ${state.size}
Uploaded design name: ${state.fileName}
Custom note: ${state.note || 'None'}
Please confirm price and order details.`;

  return (
    <section id="customizer" className="section-pad">
      <div className="shell">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-10 max-w-4xl">
          <p className="eyebrow">3D T-shirt customizer</p>
          <h2 className="display-title mt-4 text-[clamp(3.1rem,7vw,7rem)] text-white">Preview your print on the shirt.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/62">
            Upload your logo, artwork, or clothing design and position it on the 3D Driftwear T-shirt before ordering.
          </p>
        </motion.div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_420px]">
          <motion.div
            ref={viewerRef}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[560px] overflow-hidden rounded-[2rem] border border-gold/20 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,.16),transparent_25rem),radial-gradient(circle_at_72%_22%,rgba(200,205,210,.16),transparent_24rem),linear-gradient(145deg,#0E1115,#090D12_52%,#050607)] shadow-gold sm:h-[640px] xl:h-[760px]"
          >
            <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_22%,transparent,rgba(0,0,0,.08)_54%,rgba(0,0,0,.58))]" />
            <AnimatePresence>
              {!ready && webgl ? (
                <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-20 grid place-items-center bg-obsidian/80">
                  <div className="font-brand rounded-2xl border border-gold/30 bg-black/70 px-5 py-4 text-sm font-bold uppercase tracking-[.14em] text-gold">
                    Loading 3D model
                  </div>
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
              <div className="grid h-full min-h-[540px] place-items-center p-8 text-center">
                <div>
                  <h3 className="font-calista text-3xl font-semibold text-white">WebGL is not supported.</h3>
                  <p className="mt-3 text-white/60">Please open this page in a modern browser with hardware acceleration enabled.</p>
                </div>
              </div>
            )}
            <div className="font-brand pointer-events-none absolute bottom-5 left-5 z-20 rounded-full border border-white/10 bg-black/55 px-4 py-2 text-xs font-bold uppercase tracking-[.14em] text-white/70 backdrop-blur-xl">
              Drag to orbit / scroll to zoom
            </div>
          </motion.div>

          <motion.aside initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="gold-border rounded-[2rem] p-5 sm:p-6">
            <div className="grid gap-5">
              <div>
                <label className="font-brand text-xs font-bold uppercase tracking-[.18em] text-white/60" htmlFor="design-upload">Upload PNG, JPG, or SVG</label>
                <label htmlFor="design-upload" className="font-brand mt-3 flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-dashed border-gold/40 bg-gold/10 px-4 py-5 text-sm font-bold uppercase tracking-[.13em] text-gold transition hover:bg-gold/15">
                  <Upload size={18} /> Upload artwork
                </label>
                <input id="design-upload" type="file" accept="image/png,image/jpeg,image/svg+xml" className="sr-only" onChange={(event) => handleUpload(event.target.files?.[0])} />
                <p className="mt-2 break-words text-sm text-white/55">{state.fileName}</p>
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
                      className={`font-grande rounded-2xl border px-3 py-3 text-xs font-bold uppercase tracking-[.14em] transition ${state.sampleName === sample.name ? 'border-gold bg-gold text-black' : 'border-white/10 bg-white/[.05] text-white/70 hover:border-gold/60'}`}
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
                      className={`font-grande flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold uppercase tracking-[.14em] ${state.color.label === color.label ? 'border-gold text-gold' : 'border-white/10 text-white/60'}`}
                    >
                      <span className="h-5 w-5 rounded-full border border-white/30" style={{ backgroundColor: color.value }} />
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
                <NudgeButton label="Left" icon={<MoveLeft size={17} />} onClick={() => nudge('x', -0.05)} />
                <NudgeButton label="Right" icon={<MoveRight size={17} />} onClick={() => nudge('x', 0.05)} />
                <NudgeButton label="Up" icon={<MoveUp size={17} />} onClick={() => nudge('y', 0.05)} />
                <NudgeButton label="Down" icon={<MoveDown size={17} />} onClick={() => nudge('y', -0.05)} />
              </div>

              <label className="font-brand grid gap-2 text-xs font-bold uppercase tracking-[.18em] text-white/60">
                Custom note
                <textarea value={state.note} onChange={(event) => update({ note: event.target.value })} placeholder="Add print size, deadline, or delivery notes" className="min-h-24 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm normal-case tracking-normal text-white outline-none placeholder:text-white/30 focus:border-gold" />
              </label>

              <div className="grid gap-2 sm:grid-cols-3">
                <button type="button" className="cta-secondary px-4" onClick={reset}><RotateCcw size={17} /> Reset</button>
                <button type="button" className="cta-secondary px-4" onClick={toggleFullscreen}><Maximize2 size={17} /> {fullscreen ? 'Exit' : 'Full'}</button>
                <button type="button" className="cta-secondary px-4" onClick={downloadPreview}><Download size={17} /> Save</button>
              </div>

              <a href={whatsappLink(orderMessage)} target="_blank" rel="noreferrer" className="cta-primary w-full">
                <MessageCircle size={18} /> Order This Design on WhatsApp
              </a>
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
    <button type="button" onClick={onClick} className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[.06] text-white/75 transition hover:border-gold hover:text-gold" aria-label={`Move design ${label.toLowerCase()}`}>
      {icon}
    </button>
  );
}

useGLTF.preload('/models/tshirt.glb');
