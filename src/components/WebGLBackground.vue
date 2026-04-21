<template>
  <div ref="containerRef" class="webgl-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const containerRef = ref(null)

let scene, camera, renderer, animId
let mouseX = 0, mouseY = 0
let targetMouseX = 0, targetMouseY = 0
let clock, floatingGroup, particleSystem, wireframeGroup

// ── Brutalist color palette ──
const COLORS = {
  black: 0x000000,
  red: 0xFF0000,
  white: 0xFFFFFF,
  gray: 0x333333
}
const colorArr = [COLORS.black, COLORS.red]

function init() {
  const container = containerRef.value
  if (!container) return

  clock = new THREE.Clock()

  // ── Scene ──
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xFFFFFF) // Pure white background
  scene.fog = new THREE.FogExp2(0xFFFFFF, 0.02) // White fog

  // ── Camera ──
  camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 100)
  camera.position.set(0, 0, 18)

  // ── Renderer ──
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.appendChild(renderer.domElement)

  // ── Lights (Harsh & Contrast) ──
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.4)
  scene.add(ambientLight)

  const mainLight = new THREE.DirectionalLight(0xFFFFFF, 2.0)
  mainLight.position.set(10, 20, 10)
  mainLight.castShadow = true
  scene.add(mainLight)

  const redLight = new THREE.DirectionalLight(0xFF0000, 1.5)
  redLight.position.set(-10, -5, 5)
  scene.add(redLight)

  // ── Create elements ──
  createBrutalistObjects()
  createGridFloor()

  // ── Start ──
  animate()
}

// ═══════════════════════════════════
// 3D Brutalist Geometric Objects
// ═══════════════════════════════════
function createBrutalistObjects() {
  floatingGroup = new THREE.Group()
  wireframeGroup = new THREE.Group()
  scene.add(floatingGroup)
  scene.add(wireframeGroup)

  // Solid harsh material
  const solidMaterial = (color) => new THREE.MeshStandardMaterial({
    color,
    roughness: 0.1,
    metalness: 0.8,
  })

  // Wireframe material
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: true,
    transparent: true,
    opacity: 0.3
  })

  const geometries = [
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.TetrahedronGeometry(1.5, 0),
    new THREE.OctahedronGeometry(1.5, 0),
    new THREE.IcosahedronGeometry(1.5, 0),
    new THREE.CylinderGeometry(1, 1, 3, 6)
  ]

  for (let i = 0; i < 45; i++) {
    const isWireframe = Math.random() > 0.6
    const geo = geometries[Math.floor(Math.random() * geometries.length)]
    
    let mesh
    if (isWireframe) {
      mesh = new THREE.Mesh(geo, wireMat)
      wireframeGroup.add(mesh)
    } else {
      const color = Math.random() > 0.8 ? COLORS.red : COLORS.black
      mesh = new THREE.Mesh(geo, solidMaterial(color))
      floatingGroup.add(mesh)
    }

    const radius = 8 + Math.random() * 20
    const theta = Math.random() * Math.PI * 2
    const phi = (Math.random() - 0.5) * Math.PI
    mesh.position.set(
      Math.cos(theta) * Math.cos(phi) * radius,
      Math.sin(phi) * radius * 0.8,
      Math.sin(theta) * Math.cos(phi) * radius - 10
    )

    const s = 0.5 + Math.random() * 1.5
    mesh.scale.setScalar(s)
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)

    mesh.userData = {
      rotSpeed: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      ),
      baseY: mesh.position.y,
      orbitSpeed: (Math.random() - 0.5) * 0.002,
      orbitAngle: theta,
      orbitRadius: radius
    }
  }
}

// ═══════════════════════════════════
// Strict Wireframe Grid Floor
// ═══════════════════════════════════
function createGridFloor() {
  const gridHelper = new THREE.GridHelper(100, 50, 0x000000, 0x000000)
  gridHelper.position.y = -10
  gridHelper.material.opacity = 0.15
  gridHelper.material.transparent = true
  scene.add(gridHelper)

  const gridHelper2 = new THREE.GridHelper(100, 50, 0xFF0000, 0xFF0000)
  gridHelper2.position.y = 15
  gridHelper2.position.z = -20
  gridHelper2.rotation.x = Math.PI / 2
  gridHelper2.material.opacity = 0.05
  gridHelper2.material.transparent = true
  scene.add(gridHelper2)
}

// ═══════════════════════════════════
// Animation loop
// ═══════════════════════════════════
function animate() {
  animId = requestAnimationFrame(animate)
  const t = clock.getElapsedTime()

  targetMouseX += (mouseX - targetMouseX) * 0.05
  targetMouseY += (mouseY - targetMouseY) * 0.05

  // Rigid, mechanical camera movement
  camera.position.x = targetMouseX * 5
  camera.position.y = targetMouseY * 5
  camera.lookAt(0, 0, 0)

  const updateMeshes = (group) => {
    group.children.forEach(mesh => {
      const d = mesh.userData
      mesh.rotation.x += d.rotSpeed.x
      mesh.rotation.y += d.rotSpeed.y
      mesh.rotation.z += d.rotSpeed.z
      
      d.orbitAngle += d.orbitSpeed
      mesh.position.x = Math.cos(d.orbitAngle) * d.orbitRadius
      mesh.position.z = Math.sin(d.orbitAngle) * d.orbitRadius - 10
    })
  }

  if (floatingGroup) updateMeshes(floatingGroup)
  if (wireframeGroup) updateMeshes(wireframeGroup)

  renderer.render(scene, camera)
}

function onMouseMove(e) {
  const w = window.innerWidth, h = window.innerHeight
  mouseX = (e.clientX / w - 0.5) * 2
  mouseY = -(e.clientY / h - 0.5) * 2
}

function onResize() {
  const container = containerRef.value
  if (!container || !camera || !renderer) return
  camera.aspect = container.clientWidth / container.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(container.clientWidth, container.clientHeight)
}

onMounted(() => {
  init()
  window.addEventListener('resize', onResize)
  window.addEventListener('mousemove', onMouseMove)
})

onUnmounted(() => {
  if (animId) cancelAnimationFrame(animId)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('mousemove', onMouseMove)
  if (renderer) {
    renderer.dispose()
    containerRef.value?.removeChild(renderer.domElement)
  }
})
</script>

<style scoped>
.webgl-container {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  /* Add a harsh scanline effect over the WebGL */
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.03),
    rgba(0, 0, 0, 0.03) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
}
</style>
