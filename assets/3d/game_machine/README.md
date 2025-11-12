# Game Machine 3D Model Integration

## Overview
This directory contains a professional-grade 3D game machine model integrated into the portfolio's Three.js background scene.

## Model Details
- **Source**: Sketchfab
- **Artist**: scrawach
- **License**: Sketchfab Standard
- **Format**: GLTF 2.0
- **File**: `scene.gltf`

## Integration Features

### 1. **Dynamic Model Loading**
- Asynchronous GLTF loading with progress tracking
- Error handling with console feedback
- Material enhancement on load

### 2. **Material Enhancements**
- Increased metalness (+0.3) for realistic metal surfaces
- Reduced roughness (-0.2) for polished look
- Enhanced emissive intensity (0.5) for glow effects
- Shadow casting and receiving enabled

### 3. **Positioning & Animation**
```javascript
Scale: 2.5x uniform
Position: Center stage (0, -1.5, 0)
Rotation: 15° Y-axis for dynamic angle
```

### 4. **Dynamic Animations**
- Continuous Y-axis rotation (0.002 rad/frame)
- Vertical floating motion (sine wave)
- Mouse-reactive tilting:
  - X-axis tilt based on mouseY
  - Z-axis tilt based on mouseX

### 5. **Energy Particle System**
- 150 animated particles orbiting the machine
- Cyan and neon pink color palette
- Circular motion with vertical wave
- Additive blending for glow effect

## Scene Integration

### Lighting Setup
1. **Ambient Light**: 0.25 intensity, white
2. **Key Light**: Point light (orange), intensity 1.0
3. **Rim Light**: Point light (cyan), intensity 0.8
4. **Spotlight**: Focused on machine, intensity 2.0
5. **Fill Light**: Directional (blue), intensity 0.4

### Post-Processing Effects
- **Bloom**: Strength 1.2, Radius 0.9
- **FXAA**: Anti-aliasing for crisp edges
- **RGB Shift**: Chromatic aberration (0.0008)
- **Film Grain**: Subtle noise (0.25)

### Supporting Elements
- **Starfield**: 7,500 instanced stars with parallax
- **Nebula**: 1,800 shader-based particles
- **Vortex Rings**: 12 wireframe tori
- **Torus Knots**: 2 hero objects with emissive materials
- **Ground Plane**: Reflective surface with grid overlay
- **Floating Panels**: 6 cyberpunk-style wireframe panels

## Performance Optimization

### Mobile Considerations
- Reduced particle counts on screens < 768px
- Lower device pixel ratio for performance
- Adaptive quality based on device capabilities

### Battery Efficiency
- Animation pauses when tab is hidden
- Respects `prefers-reduced-motion` setting
- Efficient instanced rendering for stars

## Camera Behavior

### Interactive Movement
- **Mouse Tracking**: Smooth parallax following cursor
- **Scroll Response**: Z-axis movement based on page scroll
- **Breathing Effect**: Subtle periodic depth change
- **Dynamic Focus**: Slight look-at offset for depth

### Professional Touches
- Easing factor: 0.05 (smooth transitions)
- Enhanced bloom breathing (0.9 ± 0.2)
- RGB shift animation for retro aesthetic

## Usage Notes

### File Structure
```
assets/3d/game_machine/
├── scene.gltf          # Main model file
├── scene.bin           # Binary geometry/animation data
├── textures/           # Material textures
├── license.txt         # Attribution & license
└── README.md           # This file
```

### Dependencies
- Three.js r128
- GLTFLoader
- EffectComposer (post-processing)
- ShaderMaterial (custom effects)

### Browser Support
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (WebGL 2.0+)
- Mobile: Optimized experience

## Customization

### Adjusting Model Scale
```javascript
gameMachine.scale.set(x, y, z); // Current: 2.5, 2.5, 2.5
```

### Changing Position
```javascript
gameMachine.position.set(x, y, z); // Current: 0, -1.5, 0
```

### Modifying Rotation Speed
```javascript
gameMachine.rotation.y += speed; // Current: 0.002
```

### Energy Particle Count
```javascript
const energyCount = 150; // Adjust for more/fewer particles
```

## Credits
- **3D Model**: scrawach (Sketchfab)
- **Integration**: Portfolio 3D Background System
- **Framework**: Three.js r128
- **Design**: Professional gaming aesthetic

## License
Model usage complies with Sketchfab Standard License. See `license.txt` for details.
