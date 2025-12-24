import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
// @ts-ignore: 'three/examples/jsm' modules don't provide bundled type declarations
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Camera, Sparkles, Hand, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RoadPoneglyph } from '@/components/RST/RoadPoneglyph';

// --- SHADERS & CONSTANTS (Moved outside component to avoid re-creation) ---
const INITIAL_PARTICLE_COUNT_DESKTOP = 200000;
const INITIAL_PARTICLE_COUNT_MOBILE = 80000;

const VERTEX_SHADER = `
  attribute float pIndex;
  attribute vec3 targetPosition;
  attribute vec3 velocity;
  attribute vec3 color;

  uniform float time;
  uniform float particleSize;
  uniform float globalScale;
  uniform float spreadFactor;
  uniform float rotationX;
  uniform float rotationY;
  uniform float rotationZ;
  uniform float noiseStrength;
  uniform int templateIndex;

  varying vec3 vColor;
  varying float vAlpha;

  // Simplified Noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 = v - i + dot(i, C.xxx) ;
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy; 
      vec3 x3 = x0 - D.yyy;      
      i = mod289(i);
      vec4 p = permute( permute( permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.z * n_;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
      vec4 s0 = vec4(sign(b0.xy), sign(b0.zw));
      vec4 s1 = vec4(sign(b1.xy), sign(b1.zw));
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
      vec3 pos = position;
      
      float cx = cos(rotationX), sx = sin(rotationX);
      float cy = cos(rotationY), sy = sin(rotationY);
      float cz = cos(rotationZ), sz = sin(rotationZ);
      
      vec3 posX = vec3(pos.x, pos.y * cx - pos.z * sx, pos.y * sx + pos.z * cx);
      vec3 posY = vec3(posX.x * cy + posX.z * sy, posX.y, -posX.x * sy + posX.z * cy);
      vec3 rotatedPos = vec3(posY.x * cz - posY.y * sz, posY.x * sz + posY.y * cz, posY.z);
      
      float noise = snoise( (rotatedPos * 0.1) + vec3(time * 0.5) ) * noiseStrength;
      vec3 finalPosition = rotatedPos;
      
      vec3 centerOffset = normalize(finalPosition) * spreadFactor * 50.0;
      finalPosition += centerOffset;

      vColor = color;
      vAlpha = 1.0;

      if (templateIndex == 1) { // Gum Gum Rocket
           finalPosition *= 1.0; 
      }

      finalPosition *= globalScale;
      finalPosition.xyz += noise;

      vec4 mvPosition = modelViewMatrix * vec4(finalPosition, 1.0);
      gl_PointSize = particleSize * (150.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT_SHADER = `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
      vec2 coords = gl_PointCoord - vec2(0.5);
      float dist = length(coords);
      if (dist > 0.5) discard;
      float strength = 1.0 - (dist * 2.0);
      strength = pow(strength, 2.0);
      gl_FragColor = vec4(vColor, strength * vAlpha);
  }
`;

// Helper: Hat Shape Generator
function createStrawHatShape(count: number): number[] {
  const positions: number[] = [];
  const scale = 250;
  const brimInnerRadius = 0.36 * scale;
  const brimOuterRadius = 0.95 * scale;
  const brimThickness = 0.05 * scale;
  const domeHeight = 0.50 * scale;
  const domeBaseRadius = 0.36 * scale;
  const bandY = 0.06 * scale; 
  const bandHeight = 0.14 * scale; 
  const bandInnerRadius = domeBaseRadius * 0.94;
  const bandOuterRadius = domeBaseRadius * 1.08;

  const strawColor = [0.96, 0.82, 0.26]; 
  const bandColor = [1.0, 0.2, 0.2]; 
  const outerBrimColor = [1.0, 0.90, 0.50];
  const undersideColor = [0.35, 0.25, 0.05];

  const numBrim = Math.floor(count * 0.45);
  const numDome = Math.floor(count * 0.35);
  const numBand = count - numBrim - numDome;

  let idx = 0;
  for (let i = 0; i < numBrim; i++) {
      const r = brimInnerRadius + Math.random() * (brimOuterRadius - brimInnerRadius);
      const theta = Math.random() * Math.PI * 2;
      let x = r * Math.cos(theta);
      let z = r * Math.sin(theta);
      let y = (Math.random() - 0.5) * brimThickness;
      if (r > brimOuterRadius * 0.7) y += (r / brimOuterRadius) * 0.04 * scale * Math.sin(theta * 2.0);
      x += (Math.random() - 0.5) * (0.05 * scale);
      y += (Math.random() - 0.5) * (0.05 * scale);
      z += (Math.random() - 0.5) * (0.05 * scale);
      let color = (y < -0.01 * scale) ? undersideColor : (r > domeBaseRadius * 1.2 ? outerBrimColor : strawColor);
      let variedColor = color.map(c => Math.max(0, Math.min(1, c + (Math.random() - 0.5) * 0.1)));
      positions[idx++] = x; positions[idx++] = y; positions[idx++] = z;
      positions[idx++] = variedColor[0]; positions[idx++] = variedColor[1]; positions[idx++] = variedColor[2];
  }
  for (let i = 0; i < numBand; i++) {
      const r = bandInnerRadius + Math.random() * (bandOuterRadius - bandInnerRadius);
      const theta = Math.random() * Math.PI * 2;
      let x = r * Math.cos(theta);
      let z = r * Math.sin(theta);
      let y = bandY + (Math.random() - 0.5) * bandHeight;
      const bandNoise = 0.015 * scale;
      x += (Math.random() - 0.5) * bandNoise;
      y += (Math.random() - 0.5) * bandNoise;
      z += (Math.random() - 0.5) * bandNoise;
      let color = bandColor.map(c => c + (Math.random() - 0.5) * 0.05);
      positions[idx++] = x; positions[idx++] = y; positions[idx++] = z;
      positions[idx++] = color[0]; positions[idx++] = color[1]; positions[idx++] = color[2];
  }
  for (let i = 0; i < numDome; i++) {
      const phi = Math.random() * (Math.PI / 2 * 0.98); 
      const theta = Math.random() * Math.PI * 2;
      const sinPhi = Math.sin(phi);
      const cosPhi = Math.cos(phi);
      let x = domeBaseRadius * sinPhi * Math.cos(theta);
      let y = domeHeight * cosPhi;
      let z = domeBaseRadius * sinPhi * Math.sin(theta);
      const domeNoise = 0.05 * scale;
      x += (Math.random() - 0.5) * domeNoise;
      y += (Math.random() - 0.5) * domeNoise;
      z += (Math.random() - 0.5) * domeNoise;
      const lightY = y / domeHeight;
      let color = strawColor.map(c => c * (0.6 + 0.4 * lightY));
      positions[idx++] = x; positions[idx++] = y; positions[idx++] = z;
      positions[idx++] = color[0]; positions[idx++] = color[1]; positions[idx++] = color[2];
  }
  while (positions.length < count * 6) positions.push(0, 0, 0, ...strawColor);
  return positions;
}

// MediaPipe HandLandmarker helper
const HandLandmarkerConnections = [[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[0,17],[17,18],[18,19],[19,20]];

const OnePieceSection = () => {
  const [expanded, setExpanded] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const webcamVideoRef = useRef<HTMLVideoElement>(null);
  const outputCanvasRef = useRef<HTMLCanvasElement>(null);
  const gestureStatusTextRef = useRef<HTMLSpanElement>(null);
  
  const readoutTensionRef = useRef<HTMLSpanElement>(null);
  const readoutDistanceRef = useRef<HTMLSpanElement>(null);

  // Core System Ref
  const systemRef = useRef({
    scene: null as THREE.Scene | null,
    camera: null as THREE.PerspectiveCamera | null,
    renderer: null as THREE.WebGLRenderer | null,
    particles: null as THREE.Points | null,
    geometry: null as THREE.BufferGeometry | null,
    material: null as THREE.ShaderMaterial | null,
    controls: null as OrbitControls | null,
    clock: null as THREE.Clock | null,
    handLandmarker: null as any,
    animationId: 0,
    processFrameId: 0,
    isProcessing: false,
    uniforms: {
      time: { value: 0.0 },
      particleSize: { value: 12.0 },
      globalScale: { value: 1.0 },
      spreadFactor: { value: 0.0 },
      rotationX: { value: 0.0 },
      rotationY: { value: 0.0 },
      rotationZ: { value: 0.0 },
      noiseStrength: { value: 0.0 },
      particleColor: { value: new THREE.Color(0xd4a017) },
      dampening: { value: 0.95 },
      templateIndex: { value: 0 },
      totalParticles: { value: INITIAL_PARTICLE_COUNT_DESKTOP }
    }
  });

  // State Ref for Animation Loop (Avoids stale closures)
  const gestureStateRef = useRef({
    tension: 0.55,
    distance: 1.0,
    pitch: 0,
    yaw: 0,
    roll: 0,
    snap: false,
    isGestureEnabled: true,
    distanceSmoothed: 1.0,
    tensionSmoothed: 0.55,
    pitchSmoothed: 0,
    yawSmoothed: 0,
    rollSmoothed: 0,
    lastTension: 0.55,
    webcamActive: false,
    mousePos: { x: 0, y: 0 }
  });

  // --- MOBILE CHECK ---
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  // --- LOGIC FUNCTIONS (Defined outside useEffect so Button can call them) ---
  
  const updateParticleTargets = useCallback((geometry: THREE.BufferGeometry, count: number, templateName: string) => {
    const TEMPLATES: any = {
      strawhat: { shape: 0, count: count, fn: createStrawHatShape },
      gumgumrocket: { shape: 1, count: count, fn: createStrawHatShape, burst: false } 
    };

    const template = TEMPLATES[templateName];
    if(!template) return;
    const newData = template.fn(count);
    const targetPositions = geometry.attributes.targetPosition.array as Float32Array;
    const colors = geometry.attributes.color.array as Float32Array;
    
    let k = 0;
    for (let i = 0; i < count; i++) {
      if (k + 5 >= newData.length) break;
      targetPositions[i * 3] = newData[k++];
      targetPositions[i * 3 + 1] = newData[k++];
      targetPositions[i * 3 + 2] = newData[k++];
      colors[i * 3] = newData[k++];
      colors[i * 3 + 1] = newData[k++];
      colors[i * 3 + 2] = newData[k++];
    }
    geometry.attributes.targetPosition.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
    systemRef.current.uniforms.templateIndex.value = template.shape;
  }, []);

  const createParticles = useCallback((count: number) => {
    const { scene } = systemRef.current;
    if (!scene) return;
    
    systemRef.current.uniforms.totalParticles.value = count;
    
    const geometry = new THREE.BufferGeometry();
    const initialPositions = new Float32Array(count * 3);
    const targetPositions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const pIndices = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const defaultColor = new THREE.Color(0xd4a017);
    for (let i = 0; i < count; i++) {
      initialPositions[i * 3 + 0] = (Math.random() - 0.5) * 800;
      initialPositions[i * 3 + 1] = (Math.random() - 0.5) * 800;
      initialPositions[i * 3 + 2] = (Math.random() - 0.5) * 800;
      pIndices[i] = i;
      colors[i * 3] = defaultColor.r; colors[i * 3 + 1] = defaultColor.g; colors[i * 3 + 2] = defaultColor.b;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(initialPositions, 3));
    geometry.setAttribute('targetPosition', new THREE.BufferAttribute(targetPositions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    geometry.setAttribute('pIndex', new THREE.BufferAttribute(pIndices, 1));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    updateParticleTargets(geometry, count, 'strawhat');

    const material = new THREE.ShaderMaterial({
      uniforms: systemRef.current.uniforms,
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    systemRef.current.particles = particles;
    systemRef.current.geometry = geometry;
    systemRef.current.material = material;
  }, [updateParticleTargets]);


  // --- WEBCAM & AI LOGIC ---
  const onResults = useCallback((results: any) => {
    const gestureState = gestureStateRef.current;
    if (results.landmarks && results.landmarks.length > 0) {
      const landmarks = results.landmarks[0];
      const thumb = landmarks[4];
      const pinky = landmarks[20];
      
      const dx = thumb.x - pinky.x;
      const dy = thumb.y - pinky.y;
      const dz = thumb.z - pinky.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      gestureState.tension = Math.min(dist / 0.3, 1.0);

      let avgZ = 0;
      for (let lm of landmarks) avgZ += lm.z;
      avgZ /= 21;
      gestureState.distance = Math.max(0, Math.min(1, (-avgZ + 0.5) / 0.5));
      gestureState.distance = THREE.MathUtils.lerp(gestureState.distance, gestureState.tension, 0.5);

      if (gestureState.tension > 0.5) {
        let tdx = landmarks[4].x - landmarks[8].x;
        let tdy = landmarks[4].y - landmarks[8].y;
        gestureState.roll = Math.atan2(tdy, tdx);
        
        let sumX = 0; let sumZ = 0;
        [4, 8, 12, 16, 20].forEach(idx => { sumX += landmarks[idx].x - landmarks[0].x; sumZ += landmarks[idx].z - landmarks[0].z; });
        gestureState.yaw = Math.atan2(sumX/5, sumZ/5);
      }

      const deltaTension = gestureState.tension - gestureState.lastTension;
      if (gestureState.lastTension > 0.7 && gestureState.tension < 0.3 && deltaTension < -0.3) {
        gestureState.snap = true;
      }
      gestureState.lastTension = gestureState.tension;
      if (gestureStatusTextRef.current) gestureStatusTextRef.current.textContent = 'Haki Active';
    } else {
      if (gestureStatusTextRef.current) gestureStatusTextRef.current.textContent = 'Searching for Hand...';
    }
  }, []);

  const drawResults = useCallback((results: any) => {
    const canvas = outputCanvasRef.current;
    const video = webcamVideoRef.current;
    if (!canvas || !video) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (results.landmarks && results.landmarks[0]) {
       const landmarks = results.landmarks[0];
       
       ctx.strokeStyle = "#d4a017";
       ctx.lineWidth = 3;
       ctx.beginPath();
       for (const conn of HandLandmarkerConnections) {
          const from = landmarks[conn[0]];
          const to = landmarks[conn[1]];
          if(from && to) {
            ctx.moveTo(from.x * ctx.canvas.width, from.y * ctx.canvas.height);
            ctx.lineTo(to.x * ctx.canvas.width, to.y * ctx.canvas.height);
          }
       }
       ctx.stroke();

       ctx.fillStyle = "#FF0000";
       for(const lm of landmarks) {
          ctx.beginPath();
          ctx.arc(lm.x * ctx.canvas.width, lm.y * ctx.canvas.height, 2, 0, 2*Math.PI);
          ctx.fill();
       }
    }
  }, []);

  const processVideo = useCallback(async () => {
    const { isProcessing, handLandmarker } = systemRef.current;
    if (!isProcessing || !handLandmarker || !webcamVideoRef.current) return;
    
    if (webcamVideoRef.current.readyState === 4) {
      const results = await handLandmarker.detectForVideo(webcamVideoRef.current, performance.now());
      onResults(results);
      drawResults(results);
    }
    systemRef.current.processFrameId = requestAnimationFrame(processVideo);
  }, [onResults, drawResults]);

  const startWebcam = async () => {
    if (systemRef.current.handLandmarker) return;

    try {
      setIsLoading(true);
      if (gestureStatusTextRef.current) gestureStatusTextRef.current.textContent = 'Accessing Den Den Mushi...';
      
      const constraints = { 
        video: { 
          facingMode: 'user', 
          width: { ideal: isMobile ? 480 : 640 }, 
          height: { ideal: isMobile ? 360 : 480 } 
        } 
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      const webcamVideo = webcamVideoRef.current;
      if (webcamVideo) {
        webcamVideo.srcObject = stream;
        await new Promise(resolve => {
          webcamVideo.onloadedmetadata = () => { webcamVideo.play(); resolve(null); };
        });
      }

      if (gestureStatusTextRef.current) gestureStatusTextRef.current.textContent = 'Loading Devil Fruit Model...';

      // @ts-ignore
      const { FilesetResolver, HandLandmarker }: any = await import("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest");
      const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm");
      
      systemRef.current.handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
          delegate: "GPU"
        },
        runningMode: "VIDEO",
        numHands: 1
      });

      if (gestureStatusTextRef.current) gestureStatusTextRef.current.textContent = 'Observation Haki Active';
      systemRef.current.isProcessing = true;
      processVideo();
      
      gestureStateRef.current.webcamActive = true;
      setIsLoading(false);
    } catch (err) {
      console.error('Error starting webcam:', err);
      if (gestureStatusTextRef.current) gestureStatusTextRef.current.textContent = 'Error: Check Camera';
      setIsLoading(false);
    }
  };


  // --- THREE.JS INIT ---
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Setup Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 10000);
    camera.position.z = isMobile ? 1200 : 800; // Zoom out on mobile
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0); 
    
    while (container.firstChild) { container.removeChild(container.firstChild); }
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.minDistance = 200;
    controls.maxDistance = 2000;

    systemRef.current = { 
      ...systemRef.current, 
      scene, camera, renderer, controls, 
      clock: new THREE.Clock() 
    };

    // 2. Create Particles
    const count = isMobile ? INITIAL_PARTICLE_COUNT_MOBILE : INITIAL_PARTICLE_COUNT_DESKTOP;
    systemRef.current.uniforms.particleSize.value = isMobile ? 18.0 : 12.0;
    createParticles(count);

    // 3. Resize Handler
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
         const { width, height } = entry.contentRect;
         if(width > 0 && height > 0) {
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
         }
      }
    });
    resizeObserver.observe(container);

    // 4. Input Handling
    const handleInput = (x: number, y: number) => {
       const rect = renderer.domElement.getBoundingClientRect();
       gestureStateRef.current.mousePos.x = (x - rect.left) / rect.width;
       gestureStateRef.current.mousePos.y = (y - rect.top) / rect.height;
    };

    renderer.domElement.addEventListener('mousemove', (e) => handleInput(e.clientX, e.clientY));
    renderer.domElement.addEventListener('touchmove', (e) => {
       if(e.touches.length > 0) handleInput(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false });

    renderer.domElement.addEventListener('mousedown', () => { gestureStateRef.current.snap = true; });
    renderer.domElement.addEventListener('touchstart', () => { gestureStateRef.current.snap = true; }, { passive: false });

    // 5. Animation Loop
    const animate = () => {
      systemRef.current.animationId = requestAnimationFrame(animate);
      const { scene, camera, renderer, clock, controls, geometry, uniforms } = systemRef.current;
      if (!scene || !camera || !renderer || !clock || !geometry) return;
      
      const delta = clock.getDelta();
      const gestureState = gestureStateRef.current;

      // Update Gesture Logic
      if (!gestureState.isGestureEnabled) {
        gestureState.distanceSmoothed = THREE.MathUtils.lerp(gestureState.distanceSmoothed, 1.0, 0.05);
        gestureState.tensionSmoothed = THREE.MathUtils.lerp(gestureState.tensionSmoothed, 0.55, 0.05);
        gestureState.yawSmoothed = THREE.MathUtils.lerp(gestureState.yawSmoothed, 0, 0.05);
        gestureState.rollSmoothed = THREE.MathUtils.lerp(gestureState.rollSmoothed, 0, 0.05);
      } else if (gestureState.webcamActive) {
        gestureState.tensionSmoothed = THREE.MathUtils.lerp(gestureState.tensionSmoothed, gestureState.tension, 0.1);
        gestureState.distanceSmoothed = THREE.MathUtils.lerp(gestureState.distanceSmoothed, gestureState.distance, 0.1);
        gestureState.yawSmoothed = THREE.MathUtils.lerp(gestureState.yawSmoothed, gestureState.yaw, 0.1);
        gestureState.rollSmoothed = THREE.MathUtils.lerp(gestureState.rollSmoothed, gestureState.roll, 0.1);
      } else {
        // Mouse Fallback
        gestureState.distance = THREE.MathUtils.lerp(gestureState.mousePos.x, 1.0, 0.2); 
        gestureState.tension = 1.0 - gestureState.mousePos.y; 
        gestureState.distanceSmoothed = THREE.MathUtils.lerp(gestureState.distanceSmoothed, gestureState.distance, 0.1);
        gestureState.tensionSmoothed = THREE.MathUtils.lerp(gestureState.tensionSmoothed, gestureState.tension, 0.1);
        gestureState.yawSmoothed = THREE.MathUtils.lerp(gestureState.yawSmoothed, (gestureState.mousePos.x - 0.5) * 2, 0.1);
        gestureState.rollSmoothed = THREE.MathUtils.lerp(gestureState.rollSmoothed, (gestureState.mousePos.y - 0.5) * 2, 0.1);
      }

      // Update UI Text
      if (readoutTensionRef.current) readoutTensionRef.current.textContent = (gestureState.tensionSmoothed * 100).toFixed(0) + '%';
      if (readoutDistanceRef.current) readoutDistanceRef.current.textContent = (gestureState.distanceSmoothed * 100).toFixed(0) + '%';

      // Update Uniforms
      uniforms.globalScale.value = THREE.MathUtils.mapLinear(gestureState.tensionSmoothed, 0.0, 1.0, 0.2, 3.0);
      uniforms.spreadFactor.value = THREE.MathUtils.mapLinear(gestureState.distanceSmoothed, 0.0, 1.0, 0.0, 1.0);
      uniforms.rotationX.value = gestureState.pitchSmoothed;
      uniforms.rotationY.value = gestureState.yawSmoothed;
      uniforms.rotationZ.value = gestureState.rollSmoothed;
      uniforms.time.value += delta;

      // Handle Snap Event
      if (gestureState.snap) {
         if (systemRef.current.geometry) updateParticleTargets(systemRef.current.geometry, count, 'gumgumrocket');
         gestureState.snap = false;
         setTimeout(() => {
           if (systemRef.current.geometry) updateParticleTargets(systemRef.current.geometry, count, 'strawhat');
         }, 500);
      }

      // Physics Simulation
      const positions = geometry.attributes.position.array as Float32Array;
      const targets = geometry.attributes.targetPosition.array as Float32Array;
      const velocities = geometry.attributes.velocity.array as Float32Array;
      const particleCount = uniforms.totalParticles.value;
      const damp = uniforms.dampening.value;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const px = positions[i3], py = positions[i3+1], pz = positions[i3+2];
        let vx = velocities[i3], vy = velocities[i3+1], vz = velocities[i3+2];
        
        vx += (targets[i3] - px) * 0.015;
        vy += (targets[i3+1] - py) * 0.015;
        vz += (targets[i3+2] - pz) * 0.015;
        
        vx *= damp; vy *= damp; vz *= damp;
        
        vx += (Math.random() - 0.5) * 0.05;
        vy += (Math.random() - 0.5) * 0.05;
        vz += (Math.random() - 0.5) * 0.05;

        positions[i3] = px + vx * (delta * 60);
        positions[i3+1] = py + vy * (delta * 60);
        positions[i3+2] = pz + vz * (delta * 60);
        velocities[i3] = vx; velocities[i3+1] = vy; velocities[i3+2] = vz;
      }
      geometry.attributes.position.needsUpdate = true;
      controls?.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(systemRef.current.animationId);
      cancelAnimationFrame(systemRef.current.processFrameId);
      systemRef.current.isProcessing = false;
      resizeObserver.disconnect();
      if (systemRef.current.scene) {
        systemRef.current.scene.clear();
        if(systemRef.current.renderer) systemRef.current.renderer.dispose();
      }
    };
  }, [isMobile, createParticles, updateParticleTargets]);

  // --- JSX RENDER ---
  return (
    <section id="onepiece" className="py-24 px-4 relative bg-[#f0e6d2]">
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10">
           <div className="inline-flex items-center gap-3 border-b-4 border-[#5a3a2a] pb-2 px-6">
              <Sparkles className="w-8 h-8 text-[#d92121]" />
              <h2 className="text-4xl md:text-5xl font-serif font-black text-[#5a3a2a] uppercase tracking-wide">
                Devil Fruit Model
              </h2>
           </div>
           <p className="mt-4 text-[#8b6f58] font-serif italic">
             "Interact with the Straw Hat particles. Use your cursor or enable Observation Haki (Camera)."
           </p>
        </div>

        {/* The "Artifact" Container */}
        <div className={`relative transition-all duration-700 ease-in-out mx-auto ${expanded ? 'h-[80vh] max-w-full' : 'h-[500px] max-w-4xl'}`}>
          
          {/* Main Frame (Gold/Wood) */}
          <div className="absolute inset-0 border-[16px] border-[#5a3a2a] rounded-xl shadow-2xl bg-[#0a0a10] overflow-hidden">
             
             {/* 3D Canvas */}
             <div ref={containerRef} className="absolute inset-0 z-0" />
             
             {/* Inner Corner Ornaments */}
             <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#d4a017] rounded-tl-lg pointer-events-none opacity-50"></div>
             <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#d4a017] rounded-tr-lg pointer-events-none opacity-50"></div>
             <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[#d4a017] rounded-bl-lg pointer-events-none opacity-50"></div>
             <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#d4a017] rounded-br-lg pointer-events-none opacity-50"></div>

             {/* UI Overlay: Status Compass */}
             <div className="absolute top-4 left-4 bg-[#5a3a2a]/80 backdrop-blur-sm border border-[#d4a017]/30 p-3 rounded text-[#d4a017] font-mono text-xs z-20 shadow-lg">
                <div className="flex items-center gap-2 mb-1 border-b border-[#d4a017]/30 pb-1">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                   <span>LOG POSE</span>
                </div>
                <div>TENSION: <span ref={readoutTensionRef}>0%</span></div>
                <div>SPREAD: <span ref={readoutDistanceRef}>0%</span></div>
             </div>

             {/* UI Overlay: Camera Preview (Hidden by default unless debug) */}
             <div className={`absolute bottom-4 left-4 w-32 h-24 border-2 border-[#d92121] bg-black z-20 ${debugMode ? 'block' : 'hidden'}`}>
                <video ref={webcamVideoRef} playsInline muted className="w-full h-full object-cover opacity-50 absolute inset-0" />
                <canvas ref={outputCanvasRef} className="w-full h-full absolute inset-0" />
             </div>

             {/* UI Overlay: Controls Panel */}
             <div className="absolute bottom-4 right-4 z-20 flex flex-col items-end gap-3">
                <div className="absolute bottom-80 right-20 opacity-50 hover:opacity-100 z-50">
                  <RoadPoneglyph locationId="STRAWHAT_MODAL_SCREEN" />
                </div>
                {/* Status Text */}
                <span ref={gestureStatusTextRef} className="text-[#d4a017] bg-black/60 px-3 py-1 rounded font-mono text-sm border border-[#d4a017]/30 backdrop-blur-sm">
                   System Standby
                </span>
                
                <div className="flex gap-2">
                  <div className="absolute bottom-0 left-0 opacity-100 hover:opacity-100 z-50">
                    <RoadPoneglyph locationId="STRAWHAT_MODAL_BUTTON" />
                  </div>
                   {/* Expand Button */}
                   <Button 
                      variant="outline" 
                      size="icon"
                      className="bg-[#5a3a2a] text-[#d4a017] border-[#d4a017]"
                      onClick={() => setExpanded(!expanded)}
                   >
                      {expanded ? <Minimize2 className="w-4 h-4"/> : <Maximize2 className="w-4 h-4"/>}
                   </Button>
                   
                   {/* Debug/Camera Toggle */}
                   <Button 
                      variant="outline" 
                      size="icon"
                      className={`border-[#d4a017] ${debugMode ? 'bg-[#d92121] text-white' : 'bg-[#5a3a2a] text-[#d4a017]'}`}
                      onClick={() => setDebugMode(!debugMode)}
                      title="Toggle Vision Debug"
                   >
                      <Camera className="w-4 h-4"/>
                   </Button>

                   {/* ACTIVATE HAKI (Start Webcam) */}
                   <Button 
                      onClick={startWebcam} 
                      disabled={isLoading}
                      className="bg-[#d92121] hover:bg-[#b01a1a] text-white font-bold border-2 border-[#5a3a2a] shadow-lg"
                   >
                      <Hand className="w-4 h-4 mr-2" />
                      {isLoading ? "Charging..." : "Activate Haki"}
                   </Button>
                </div>
             </div>

          </div>
        </div>
        
      </div>
    </section>
  );
};

export default OnePieceSection;