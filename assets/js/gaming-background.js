/* gaming-background.js - Interactive Cubes Edition */
'use strict';

window.addEventListener('DOMContentLoaded', () => {
  if (!window.THREE) {
    console.error('THREE.js not loaded!');
    return;
  }

  const canvas = document.getElementById('gaming-bg-canvas');
  if (!canvas) {
    console.error('Canvas element not found!');
    return;
  }

  console.log('Starting 3D background...');
  
  const isMobile = window.innerWidth < 768;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scene Setup with portfolio colors
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0d0d0f); // Dark portfolio background
  scene.fog = new THREE.Fog(0x0d0d0f, 40, 100);

  // Camera Setup
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
  camera.position.set(0, 0, 25);

  // Renderer with realistic settings
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  // Realistic Studio Lighting Setup
  const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
  scene.add(ambientLight);

  // Main key light (warm orange-yellow from portfolio)
  const keyLight = new THREE.DirectionalLight(0xffdb70, 1.5);
  keyLight.position.set(15, 20, 10);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 2048;
  keyLight.shadow.mapSize.height = 2048;
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far = 500;
  scene.add(keyLight);

  // Fill light (cool contrast)
  const fillLight = new THREE.DirectionalLight(0x808080, 0.4);
  fillLight.position.set(-15, 10, 5);
  scene.add(fillLight);

  // Rim light (orange accent from portfolio)
  const rimLight = new THREE.DirectionalLight(0xff9f43, 1.0);
  rimLight.position.set(-10, 5, -15);
  scene.add(rimLight);

  // Subtle point lights with portfolio colors
  const pointLight1 = new THREE.PointLight(0xffdb70, 0.6, 50);
  pointLight1.position.set(0, 0, 10);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xff9f43, 0.4, 40);
  pointLight2.position.set(0, -10, -5);
  scene.add(pointLight2);

  // Interactive Shiny Cubes Grid - Structured like grass blades
  const cubes = [];
  const gridSize = isMobile ? 20 : 50;
  const spacing = 1.4; // Tighter spacing for structured look
  const cubeSize = 1.0;

  const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
  
  // Realistic PBR material with portfolio colors and better visual quality
  const cubeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffdb70, // Orange-yellow from portfolio
    metalness: 0.85,
    roughness: 0.25,
    envMapIntensity: 1.2,
    emissive: 0x000000,
    emissiveIntensity: 0,
    flatShading: false, // Smooth shading for better appearance
    side: THREE.FrontSide
  });

  // Add edge geometry for visual enhancement
  const edgeGeometry = new THREE.EdgesGeometry(cubeGeometry);
  const edgeMaterial = new THREE.LineBasicMaterial({ 
    color: 0xff9f43, // Slightly darker orange for edges
    linewidth: 1,
    transparent: true,
    opacity: 0.3
  });

  // Create perfectly aligned grid
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial.clone());
      
      const posX = (x - gridSize / 2) * spacing;
      const posY = (y - gridSize / 2) * spacing;
      const posZ = 0; // All at same depth initially
      
      cube.position.set(posX, posY, posZ);
      cube.rotation.set(0, 0, 0); // All aligned
      
      cube.castShadow = true;
      cube.receiveShadow = true;
      
      // Add edge lines for better visual definition
      const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial.clone());
      cube.add(edges);
      
      scene.add(cube);
      cubes.push({
        mesh: cube,
        edges: edges,
        baseZ: posZ,
        baseX: posX,
        baseY: posY,
        gridX: x,
        gridY: y,
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.005,
          y: (Math.random() - 0.5) * 0.005,
          z: (Math.random() - 0.5) * 0.005
        },
        displacement: 0, // Current displacement from mouse pressure
        velocity: 0 // For spring physics
      });
    }
  }

  console.log(`Created ${cubes.length} cubes`);

  // Mouse tracking with 3D world position
  const mouse = new THREE.Vector2();
  const smoothMouse = new THREE.Vector2();
  const mouse3D = new THREE.Vector3();
  const raycaster = new THREE.Raycaster();

  function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true });

  // Convert 2D mouse to 3D world position on the grid plane
  function updateMouse3D() {
    raycaster.setFromCamera(smoothMouse, camera);
    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    raycaster.ray.intersectPlane(planeZ, mouse3D);
  }

  // Animation Loop - Grass-like wave physics
  let time = 0;
  let frameCount = 0;
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    
    const deltaTime = clock.getDelta();
    time += deltaTime;
    frameCount++;
    
    // Smooth mouse lerping for fluid interaction
    smoothMouse.x += (mouse.x - smoothMouse.x) * 0.1;
    smoothMouse.y += (mouse.y - smoothMouse.y) * 0.1;
    
    // Update 3D mouse position
    updateMouse3D();

    // Dynamic lighting animation
    pointLight1.intensity = 0.5 + Math.sin(time * 0.8) * 0.2;
    pointLight2.intensity = 0.3 + Math.cos(time * 1.2) * 0.15;

    // Grass-like wave effect with air pressure physics
    cubes.forEach((cubeData) => {
      const cube = cubeData.mesh;
      
      // Subtle rotation
      cube.rotation.x += cubeData.rotationSpeed.x;
      cube.rotation.y += cubeData.rotationSpeed.y;
      cube.rotation.z += cubeData.rotationSpeed.z;

      // Calculate distance from mouse cursor (in 3D world space)
      const dx = cube.position.x - mouse3D.x;
      const dy = cube.position.y - mouse3D.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Air pressure effect - like wind pushing grass
      const pressureRadius = isMobile ? 4 : 6; // Radius of influence
      const maxDisplacement = 8; // Maximum push distance
      
      let targetDisplacement = 0;
      
      if (distance < pressureRadius) {
        // Smooth falloff (exponential for realistic air pressure)
        const influence = Math.exp(-distance / pressureRadius * 3);
        targetDisplacement = influence * maxDisplacement;
        
        // Enhanced glow effect on affected cubes (portfolio orange-yellow)
        cube.material.emissive.setHex(0xff9f43);
        cube.material.emissiveIntensity = influence * 0.7;
        
        // Enhanced edge glow
        if (cubeData.edges) {
          cubeData.edges.material.opacity = 0.3 + influence * 0.5;
          cubeData.edges.material.color.setHex(0xffdb70);
        }
      } else {
        cube.material.emissiveIntensity *= 0.92; // Smooth fade out
        
        // Fade edge glow back
        if (cubeData.edges) {
          cubeData.edges.material.opacity *= 0.95;
          if (cubeData.edges.material.opacity < 0.3) {
            cubeData.edges.material.opacity = 0.3;
            cubeData.edges.material.color.setHex(0xff9f43);
          }
        }
      }
      
      // Spring physics for smooth, bouncy motion (like grass blades)
      const springStrength = 0.03; // How quickly it springs back
      const damping = 0.85; // Friction/air resistance
      
      const force = (targetDisplacement - cubeData.displacement) * springStrength;
      cubeData.velocity += force;
      cubeData.velocity *= damping; // Apply damping
      cubeData.displacement += cubeData.velocity;
      
      // Apply displacement to Z position
      cube.position.z = cubeData.baseZ + cubeData.displacement;
      
      // Subtle scale based on displacement (depth effect)
      const scaleAmount = 1 + (cubeData.displacement / maxDisplacement) * 0.2;
      cube.scale.set(scaleAmount, scaleAmount, scaleAmount);
    });

    renderer.render(scene, camera);
  }

  // Start animation immediately
  console.log('Starting animation loop...');
  animate();

  // Responsive Handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, { passive: true });

  // Performance optimization
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      animate();
    }
  });
});
