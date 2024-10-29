<script>
import * as THREE from 'three'
import { onMount } from 'svelte'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// Cursor
let cursor = {
    x: 0,
    y: 0,
}

// Moving Camera w/ Vanilla JS
// let isMouseDown = false

// window.addEventListener('mousedown', () => {
//     isMouseDown = true
// })

// window.addEventListener('mouseup', () => {
//     isMouseDown = false
// })


// window.addEventListener('mousemove', (event) => {
//     // if (!isMouseDown) return
//     cursor.x =  (event.clientX / sizes.width - 0.5);
//     cursor.y = (event.clientY / sizes.height - 0.5) * -1;
//     // console.log(cursor);
// })

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height)

// Using Orthographic Camera
// const camera = new THREE.OrthographicCamera(-1, 1, 1, - 1, 0.1, 100)

camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)


onMount(() => {
    // Canvas
    const canvas = document.querySelector('canvas#webgl1')

    // OrbitControls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        // antialias: true,
    })
    renderer.setSize(sizes.width, sizes.height)

    // Animate
    const clock = new THREE.Clock()
    const tick = () =>
    {
        const elapsedTime = clock.getElapsedTime()

        // Update camera w/ Vanilla JS
        // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
        // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
        // camera.position.y = cursor.y * 5;
        // camera.lookAt(mesh.position);

        // Update OrbitControls
        controls.update()

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }
    tick()
})


</script>

<main>
<h2>Lesson 6: Cameras</h2>
<h3>Camera</h3>
<p>
The <code>Camera</code> class is an abstract class. You don't use it directly
but you can inherit from it to have access to common properties and methods. The
following classes inherit <code>Camera</code> class.
</p>
<h3>ArrayCamera</h3>
<p>
Used to render your scene multiple times by using multiple cameras. Each camera
will render a specific area of the canvas. You can imagine this looking like old
school console multiplayer games where you had to share a split screen.
</p>
<h3>StereoCamera</h3>
<p>
Used to render scene through two cameras that mimic eyes to create parallax
effect that will make brain think there is depth. Can use VR headset or 3D
glasses to see result.
</p>
<h3>CubeCamera</h3>
<p>
Used to get a render facing each direciton (forward, backward, left, right, up,
down) to create render of surrounding. This can be used to create an environment
map for reflection or a shadow map. 
</p>
<h3>OrthographicCamera</h3>
<code>const camera = new THREE.OrthographicCamera(- 1, 1, 1, - 1, 0.1, 100)
</code>
<p>
Used to create orthographic renders of scene <strong> without perspective.
</strong> Useful if you make an RTS game like Age of Empire. Elements will have 
same size on screen regardless of distance from camera.
</p>
<h4>Parameters</h4>
<p>
Instead of field of view like PerspectiveCamera, we provide how far the camera
can see in each direction (left, right, top, and bottom). Then the near and far.
</p>
<h3>PerspectiveCamera</h3>
<code>const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height,
 1, 100)</code>
<p>
Used in previous lesson so far. Simulates real-life camera with perspective.
</p>
<h4>Parameters</h4>
First parameter is vertical field of view in degrees. Second parameter is aspect
ratio dived by the height of the render. Third and fourth params are near and 
far values. Any object or part of the object closer than near or farther than
far will not show up. Do not use extreme near and far values as you will cause 
z-fighting. <a href="https://twitter.com/FreyaHolmer/status/799602767081848832">
Example</a>

<h3>Custom Controls</h3>
We used OrbitControl in above example

<h3>When to use Built-In vs Custom Controls</h3>
<p>
Simple, see if built-in controls fit your use case, if not, build your own.
</p>
<canvas id="webgl1"></canvas>


</main>