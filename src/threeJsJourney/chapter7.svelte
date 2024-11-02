<script>
import * as THREE from 'three'
import { onMount } from 'svelte'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'



// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
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

    // Handle full screen
    window.addEventListener('dblclick', () => {
        const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

        if(!fullscreenElement)
        {
            if(canvas.requestFullscreen)
            {
                canvas.requestFullscreen()
            }
            else if(canvas.webkitRequestFullscreen)
            {
                canvas.webkitRequestFullscreen()
            }
        }
        else
        {
            if(document.exitFullscreen)
            {
                document.exitFullscreen()
            }
            else if(document.webkitExitFullscreen)
            {
                document.webkitExitFullscreen()
            }
        }
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


</script>

<main>
<h2>Lesson 7: Fullscreen and Resizing</h2>
<h3>Handling Resize</h3>
<p>
    Use addEventListener to listen for resize and adjust 
    <code>camera.aspect</code> and <code>render.setSize</code>
</p>
<h3>Blurry Render</h3>
<p>
    Some might see blurry render because you are testing on screen with pixel 
    ratio greater than 1. You can tell by doing 
    <code>window.devicePixelRatio</code>. Fix blurryness by doing
    <code>renderer.setPixelRatio(window.devicePixelRatio)</code>
    <br>
    Your pixel ratio is: window.devicePixelRatio = {window.devicePixelRatio}
</p>
<h3>Handle Full screen</h3>
<canvas id="webgl1"></canvas>
</main>

<style>
#webgl {
    position: fixed;
    top: 0;
    left: 0;
    outline: none;
}
</style>