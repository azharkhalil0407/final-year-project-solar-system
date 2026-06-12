# Orrery: 3D Interactive Solar System

A real-time 3D solar system simulation built with Three.js as part of my final year B.Tech major project in Computer Science and Engineering. The project was developed under the guidance of my professor, whose core idea was to explore 3D web development using Three.js as the primary rendering framework.

---

## About the Project

I wanted this to feel less like a college assignment and more like something you'd actually want to open and spend time in. The goal was to go beyond a basic planet orbiting demo and build something that felt production-quality: real scientific data, proper shaders, smooth camera interactions, and a UI that didn't look like it was slapped together.

The name "Orrery" comes from the mechanical clockwork models of the solar system that astronomers used before computers existed. It felt like the right name for something that tries to simulate the same thing, just interactively in a browser.

---

## Features

**Rendering and visuals**

- Custom GLSL corona shader on the Sun with a Fresnel rim glow that pulses in real time
- Per-planet atmospheric glow shaders (Earth gets a blue limb haze, Venus gets a golden atmosphere, Neptune gets a deep blue rim)
- Saturn's rings are a proper disc geometry rendered with a custom shader that simulates density banding, gap structure, and transparency falloff. Not a torus, which is geometrically incorrect.
- Uranus rings tilted at 97 degrees, matching the planet's actual axial tilt
- ACESFilmic tone mapping on the renderer for physically-based output
- Three-layer star field with varied sizes and color temperatures for depth
- Procedural asteroid belt between Mars and Jupiter
- Shadow mapping on all planets

**Interaction**

- Click any planet to fly the camera to it with smooth exponential easing
- Info panel populates with real scientific data: actual distance from the Sun, orbital period, diameter, average temperature, and moon count
- Raycaster-based hover detection with tooltip labels and cursor changes
- Planet navigation pill row for instant focus jumps
- Speed multiplier (0x to 5x) with a real-time slider
- Pause and resume
- Orbit line toggle
- Cinematic loading sequence on first open

**Data accuracy**

Every stat in the info panel is sourced from NASA planetary fact sheets: real distances in kilometers, actual orbital periods, true diameters, and verified moon counts as of 2024.

---

## Tech Stack

| Layer | Technology |
|---|---|
| 3D Rendering | Three.js r155 |
| Shaders | GLSL (custom vertex and fragment) |
| Camera Controls | Three.js OrbitControls |
| Geometry | Custom BufferGeometry for Saturn ring disc |
| UI | Vanilla HTML/CSS with glassmorphism |
| Build | No bundler. Single HTML file, ESM imports. |

---

## Project Context

This was submitted as my B.Tech final year major project under the Computer Science and Engineering program at KIIT University (Batch 2022 to 2026). The project theme was proposed by my professor as part of a broader module on 3D web development, with Three.js as the core technology to explore.

The brief was open-ended: demonstrate meaningful use of 3D rendering in the browser. I chose a solar system simulation specifically because it gave me a reason to learn shader programming, something I would not have touched otherwise. The corona glow, atmospheric rim lighting, and ring disc shader were all written from scratch during this project.

---

## Running It

No installation needed. The entire project is a single HTML file.

```bash
# Open directly in any modern browser
open solar_system.html

# Or serve it locally
python -m http.server 8000
# then visit http://localhost:8000/solar_system.html
```

Works in Chrome, Firefox, and Edge. Requires WebGL 2 support, which any browser from 2020 onward handles fine.

---

## Controls

| Input | Action |
|---|---|
| Click a planet | Focus camera and open info panel |
| Click planet name pill | Same as clicking the planet |
| Mouse drag | Rotate the view |
| Scroll wheel | Zoom in and out |
| Speed slider | Slow down or speed up orbital motion |
| Pause button | Freeze all movement |
| Orbits toggle | Show or hide orbit path lines |
| Reset View | Return to the default camera position |

---

## What I Learned

Going into this I knew basic Three.js: meshes, lights, a renderer loop. Coming out of it I understand:

- How Fresnel shading works and why it is used for atmospheric effects
- How to write vertex and fragment shaders in GLSL from scratch
- How to build custom geometry with BufferGeometry instead of relying on primitives
- Why exponential camera lerp feels smoother than linear interpolation
- How tone mapping affects the final render output
- How to structure a single-file project cleanly without a build system

---

## Acknowledgements

Project developed under the supervision of my professor at KIIT University, whose idea it was to explore 3D web development using Three.js. The concept of browser-based 3D as a medium for scientific visualization was his suggestion, and it turned out to be genuinely interesting to build.

Planet data sourced from NASA Solar System Exploration fact sheets.
Three.js by Mr.doob and contributors: https://threejs.org
