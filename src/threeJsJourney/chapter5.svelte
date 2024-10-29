<script>
import * as THREE from 'three'
import { onMount } from 'svelte'
import gsap from 'gsap'

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ 
    color: 0xff0000,
    wireframe: true
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)


// Scene2
const scene2 = new THREE.Scene()

// Object2
const mesh2 = new THREE.Mesh(geometry, material)
scene2.add(mesh2)

// Camera2
const camera2 = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera2.position.z = 3
scene2.add(camera2)

onMount(() => {
    const canvas = document.querySelector('canvas#webgl1');
    console.log(canvas);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas
    })
    renderer.setSize(sizes.width, sizes.height);
    
    let clock = new THREE.Clock();

    // Animations
    const tick = () => {
        // Clock
        const elapsedTime = clock.getElapsedTime()

        // Update objects
        camera.position.x = Math.sin(elapsedTime)
        camera.position.y = Math.cos(elapsedTime)
        mesh.position.z = Math.sin(elapsedTime)
        mesh.rotation.x = Math.sin(elapsedTime)
        mesh.rotation.y = Math.cos(elapsedTime)
        mesh.rotation.z = Math.cos(elapsedTime)
        camera.lookAt(mesh.position)
        // Render
        renderer.render(scene, camera)
        window.requestAnimationFrame(tick)
    }

    tick()

    const canvas2 = document.querySelector('canvas#webgl2');
    console.log(canvas2);

    // Renderer
    const renderer2 = new THREE.WebGLRenderer({
        canvas: canvas2
    })
    renderer2.setSize(sizes.width, sizes.height);
    gsap.to(mesh2.position, {
        duration: 1,
        delay: 1,
        x: 2
    })
    gsap.to(mesh2.position, {
        duration: 1,
        delay: 2,
        x: -2
    })

    const tick2 = () => {

        // Render
        renderer2.render(scene2, camera2)
        window.requestAnimationFrame(tick2)
    }

    tick2()
})


</script>

<main>
<h2>Lesson 5: Animations</h2>
<p>
Animating is like doing stop motion: move object, take picture, move object,
take picture, move object, etc. Most screens run at 60FPS but not always.
Animation must look the same regardless of framerate. To animate we will put
object movement in a function and call that in
<code>window.requestAnimationFrame(...)</code>
</p>
<h3>requestAnimationFrame(...)</h3>
<p>
The purpose of requestAnimationFrame is to call the function provided on the
next frame. Unfortunately, the higher the framerate, the faster the animation.
Meaning a 120hz display will show an animation twice as fast as a 60hz display.
</p>
<h3>Adaption to framerate</h3>
<p>
We need to know how much time it's been since the last tick. Use 
<code>Date.now()</code> to get current timestamp.
</p>
<h3>Using Clock</h3>
<p>
Three.js has built-in solution named Clock. Another of Clock methods is 
<code>getDelta(...)</code> but do not use it.
</p>
<canvas id="webgl1"></canvas>
<h3>Using a library</h3>
<p>
If you want to have more control, create tweens (transition from A to B), create
timelines, etc. you can use a library like <code>GSAP</code> (GreenSock library)
</p>
<p>
Create a tween with <code>gsap.to(...)</code>. The first argument is object we
are animating and the second is an object. Object includes attribute of object,
duration, delay.
</p>
<canvas id="webgl2"></canvas>
</main>