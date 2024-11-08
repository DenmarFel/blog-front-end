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
    controls.enableZoom = false

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
<h2>Lesson 8: Geometries</h2>
<h3>What is a geometry?</h3>
<p>
Geometries are composed of vertices (point coordinates in 3D spaces, (x,y,z))
and faces (triangles that join those vertices to create a surface). Geometries
can also be used to create particles. Vertices can also store UV coordinates and
normals (will talk about later). In short geometries store position, UV, normal,
colors, etc.
</p>
<h3>Different Built-in Geometries</h3>
<ul>
    <li>
        <code>BufferGeometry</code> all following geometries inherit from here
    </li>
    <li>
        <code>BoxGeometry</code> to create a box
    </li>
    <li>
        <code>PlaneGeometry</code> to create a rectangle plane
    </li>
    <li>
        <code>CircleGeometry</code> to create a disc or a portion of disk (like
        a pie chart)
    </li>
    <li>
        <code>ConeGeometry</code> to create a disc or a portion of disk (like
        a pie chart)
    </li>
    <li>
        <code>CylinderGeometry</code>
    </li>
    <li>
        <code>RingGeometry</code> 2D ring
    </li>
    <li>
        <code>TorusGeometry</code> 3D ring
    </li>
    <li>
        <code>TorusKnotGeometry</code> great use for testing lighting
    </li>
    <li>
        <code>TextGeometry</code> 3D text
    </li>
    <li>
        A lot more. Read <a href="https://threejs.org/docs/?q=Geometr#api/en/core/BufferGeometry">docs</a>
    </li>
</ul>
<p>
By combining these geometries, we can create interesting shapes. For more
complex shapes, use 3D software like Blender.
</p>
<h3>Subdivision</h3>
<p>
A face of a cube usually has only two triangles. But you can add more triangles
to a cube. Why? More triangles means more vertices. You can use raise,lower
these vertices to create terrain, texture, noise, etc.
</p>
<h3>Creating our own buffer geometry</h3>
<p>
    We use a Float32Array (typed array, can only store floats, fixed length,
    easier to handle for computer). Two ways to create and fill a Float32Array.
</p>
<h3>Index</h3>
<p>
Some geometry have faces that share common vertices (ex: cube). You can
specify which of these vertices are shared which reduces data sent to GPU. This 
is an optimization. More complex but more efficient. Will not be covered here.
</p>
<canvas id="webgl1"></canvas>
</main>

<style>
#webgl1 {
    /* position: fixed; */
    top: 0;
    left: 0;
    outline: none;
}
</style>