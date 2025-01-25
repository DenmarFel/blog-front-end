<main>
<h1>Chapter 23: Custom models with Blender</h1>
<a href="https://threejs-journey.com/lessons/custom-models-with-blender#">Lesson Link</a>
<h2>Areas</h2>
<p>
UI can be customized heavily. Default areas: 3D viewport (work area), timeline
(for creating animations), outliner (scene structure/graph), properties 
</p>
<p>
Areas can be split and joined. You can have multiple of the same area.
</p>
<h2>Shortcuts</h2>
<a href="https://docs.google.com/document/d/1wZzJrEgNye2ZQqwe8oBh54AXwF5cYIe56EGFe2bb0QU/edit?tab=t.0">Non-exhaustive list of shortcuts</a>
Lost in 3D viewport? Press Shift+C and viewpoint will center scene.
Select multiple objects by holding Shift and left clicking objects.
<h2>Transforming Objects</h2>
<p>
We can change position (G), rotation(R), and scale(S). To transform on a certain
axis, press G,R,or S, followed by axis key. So G+X will allow you position
object on X axis.
</p>
<p>
To position an object only on the floor (not move it by X axis), you can press
G + Shift + Z. Same for X or Y. To omit, you can just do G + Shift + X or Y
instead.
</p>
<h2>Modes</h2>
<p>
Default is Object Mode so you can play with objects. Can change modes using top
left or Ctrl + Tab. 
</p>
<p>
To swap between Object and Edit mode fast, just use Tab
</p>
<h2>Edit Mode</h2>
<p>
Similar to Object Mode, we can edit vertices (1), edges (2), and faces (3).
</p>
<h2>Shading</h2>
<p>
Shading is how you see objects in 3D Viewport. The default is Solid and we can
see the objects with a default material and no light support (performant and
convenient). Change the shading with the buttons on top-right corner of 3D
Viewport or press Z to open a wheel menu
</p>
<ul>
    <li>Solid - default w/ same material for every object</li>
    <li>Material - like Solid but w/ preview of the materials</li>
    <li>Wireframe</li>
    <li>Renderer - low quality render (realistic but less performant)</li>
</ul>
<h2>Properties Menu/Area</h2>
<p>
Shows render properties, environment properties, and active object properties
(can differ depending on type of active object). 
</p>
<p>
Can add modifieres like subdividing, berding, growing, shrinking, etc
</p>
<p>
Can add material properties. Default is Principal BSDF and it follows the PBR
principles (Physical Based Rendering)
</p>
<h2>Render Engines</h2>
<p>
In properties area. Default engine in EEVEE.
</p>
<ul>
    <li>Real-time render engine. Uses GPU like Three.js</li>
    <li>Very performant</li>
    <li>Limitations like realism, light bounce, reflection, and refraction</li>
</ul>
<p>Workbench</p>
<ul>
    <li>Legacy render engine</li>
    <li>Not used a lot</li>
    <li>Performant</li>
    <li>Not very realistic.</li>
</ul>
<p>Cycles</p>
<ul>
    <li>Not performant</li>
    <li>A ray-tracing engine</li>
    <li>Handles light bounce,</li>
</ul>
<h2>Search</h2>
<p>Default shortcut is F3. May be useful to change it to spacebar</p>
<h2>Creating Perfect Setup</h2>
<p>
Prevent having to setup environment perfectly everytime. Just setup environment
once, go to File > Defaults > Save Startup File    
</p>
<h2>Burger Time</h2>
<p>
First we choose our unit. By default, Blender uses meter. To change it, go to
Scene Properties > Units > None
</p>
<h3>Creating the bun</h3>
<h3>Exporting the hamburger</h3>
<p>
Select only the items you want to export (not the light). Got to File > Export >
GLF
</p>
<canvas id="webgl"></canvas>
</main>
<script>
import * as THREE from 'three'
import { onMount } from 'svelte'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import GUI from 'lil-gui'

onMount(() => {
/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas#webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Models
 */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

let mixer = null

gltfLoader.load(
    '/threeJsJourney/chapter23/burger.glb',
    (gltf) =>
    {
        scene.add(gltf.scene)
    }
)

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshStandardMaterial({
        color: '#444444',
        metalness: 0,
        roughness: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 2.4)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth * 0.75,
    height: window.innerHeight * 0.75
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth * 0.75
    sizes.height = window.innerHeight * 0.75

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(40, sizes.width / sizes.height, 0.1, 100)
camera.position.set(- 5, 4, 8)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 1, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    if(mixer)
    {
        mixer.update(deltaTime)
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
})
</script>