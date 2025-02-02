<script>
import * as THREE from 'three'
import { onMount, onDestroy } from 'svelte'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui'
import gsap from 'gsap'

// Debug
const gui = new GUI({
    width: 340,
    title: 'Debugger',
    closeFolders: true
})
gui.hide()
function toggleGui(event) {
    if (event.key == 'h') gui.show(gui._hidden)
}
const debugObject = {}

// Scene
const scene = new THREE.Scene()

// Object
debugObject.color = '#587a59'
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 2, 2, 2),
    new THREE.MeshBasicMaterial({ color: debugObject.color })
)
scene.add(mesh)

// Range
const rangeTweaks = gui.addFolder('range')
rangeTweaks.add(mesh.position, 'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('elevation')
// Tweaking Geometry
debugObject.subdivision = 2
rangeTweaks.add(debugObject, 'subdivision')
    .min(1)
    .max(20)
    .step(1)
    .onFinishChange(() => {
        mesh.geometry.dispose() // Prevent GPU memory leaks
        mesh.geometry = new THREE.BoxGeometry(
            1, 1, 1, 
            debugObject.subdivision, debugObject.subdivision, debugObject.subdivision)
    })

// Booleans
const booleanTweaks = gui.addFolder('booleans')
booleanTweaks.add(mesh, 'visible')
booleanTweaks.add(mesh.material, 'wireframe')

// Add functions
debugObject.spin = () => {
    gsap.to(mesh.rotation, {
        duration: 1,
        y: mesh.rotation.y + (Math.PI / 2)
    })
}
const functionTweaks = gui.addFolder('functions')
functionTweaks.add(debugObject, 'spin')

// Modify Color
gui.addColor(debugObject, 'color')
    .onChange(() => {
        mesh.material.color.set(debugObject.color)
    })

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

onMount(() => {
    // Add Gui Controls
    window.addEventListener('keydown', toggleGui)

    // Canvas
    const canvas = document.querySelector('canvas#webgl')

    // OrbitControls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2)
    renderer.setSize(sizes.width, sizes.height)

    // Handle Resize
    window.addEventListener('resize' , () => {
        // Update sizes
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        // Update camera
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        // Update renderer
        renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2)
        renderer.setSize(sizes.width, sizes.height)
    })

    // Animate
    const tick = () =>
    {

        // Update OrbitControls
        controls.update()

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }
    tick()
})

onDestroy(() => {
    gui.hide()
    window.removeEventListener('keydown', toggleGui)
})
</script>

<main>
<h2>Lesson 9: Debug UI</h2>
<p>Press h to toggle debugger</p>
<h3>Different types of tweaks with lil-gui</h3>
<ul>
    <li>Range - for numbers with min and max</li>
    <li>Color - for colors w/ various formats</li>
    <li>Text - for simple text</li>
    <li>Checkbox - for booleans (true, false)</li>
    <li>Select - for choice from list of values</li>
    <li>Button - to trigger functions</li>
</ul>
<p>
    Most tweaks can be added using <code>gui.add(...)</code>. Params are object
    and the property of that object you want to change. You can only tweak
    properties of objects.
</p>
<h3>Tweaks for non properties</h3>
<p>Use objects (see source code)</p>
<h3>Tweaking the geometry</h3>
<p>
    Tweaked geometries cannot be altered. They are only calculated once. To
    tweak geometry, you have to create a new one each time.
</p>
<p>
    Use <code>onFinishChange()</code> to update geometry instead of <code>
    onChange() </code> as it is very CPU intensive. Also remember to dispose of
    old geometry using <code>mesh.geometry.dispose()</code> to prevent GPU
    memory leaks. 
</p>
<h3>Folder</h3>
<p>
    Call <code>gui.addFolder()</code> to categorize tweaks
</p>
<h3>Toggling gui</h3>
<p>Press h to reveal/hide debugger</p>
<canvas id="webgl"></canvas>
</main>

<style>
#webgl {
    /* position: fixed; */
    top: 0;
    left: 0;
    outline: none;
}
</style>