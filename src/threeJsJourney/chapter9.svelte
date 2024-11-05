<script>
import * as THREE from 'three'
import { onMount } from 'svelte'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// Scene
const scene = new THREE.Scene()

// Create an empty BufferGeometry
const geometry = new THREE.BufferGeometry()

// Create 50 triangles (450 values)
const count = 50
const positionsArray = new Float32Array(count * 3 * 3)
for(let i = 0; i < count * 3 * 3; i++)
{
    positionsArray[i] = (Math.random() - 0.5) * 2
}

// Create the attribute and name it 'position'
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAttribute)

// Object
const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({ 
        color: 0xff0000,
        wireframe: true
        })
)
scene.add(mesh)

// Object
const mesh2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ 
        color: "blue",
        wireframe: true
        })
)
scene.add(mesh2)

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
<h2>Lesson 9: Debug UI</h2>
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