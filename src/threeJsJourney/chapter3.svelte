<script>
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    
    // Scene
    const scene = new THREE.Scene();
    
    // Object
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0xff0000,
        wireframe: true
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    // Camera
    const sizes = {
        width: 800,
        height: 600
    }
    
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 3; // Backward 2
    camera.position.y = 1; // Up 1
    camera.position.x = -1; // Left 1
    scene.add(camera);
    
    // Canvas
    onMount(() => {
        const canvas = document.querySelector('canvas.webgl');
        console.log(canvas);
    
        // Renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas
        })
        renderer.setSize(sizes.width, sizes.height);
        
        renderer.render(scene, camera);
    })
    
</script>

<main>
<h2>Lesson 3: First Three.js Project</h2>
<p>Wee need 4 elements:</p>
<ol>
    <li>
        Scene: like a container in which we put objects, models, particles, 
        lights, etc.
    </li>
    <li>
        Objects: Can be many things like primitive geometries, imported 
        models, particles, lights, etc. Let's start with a red cube. An
        visible object in ThreeJS is called a Mesh which is a combination of
        geometry (shape) and a material (ex: color)
    </li>
    <li>
        Camera: Theoretical point of view used when rendering. Can have 
        multiple cameras but usually we only use one. Needs two essential 
        parameters: the vertical field of view in degrees and the aspect 
        ratio: the width of canvas divided by height. Adding camera to scene
        is optional but without it we may get bugs.
    </li>
    <li>
        Renderer: Renders the scene from camera pov. The result will be 
        drawn into a canvas. We can create cavnas or let renderer generate
        it and then add it to your page.
    </li>
</ol>

<p>
    We can transform objects using position, rotation and scale. We are using
    position to move camera backward. Position has x, y, z. Three.js uses z
    for forward/backward axis. y iz up/down. x is left/right
</p>
<canvas class="webgl"></canvas>
</main>