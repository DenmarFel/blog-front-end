<script>
import { onMount } from 'svelte';
import * as THREE from 'three';
import { MapControls } from 'three/addons/controls/MapControls.js'
const scene = new THREE.Scene();
scene.background = new THREE.Color('gainsboro');

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Meshes

let image_links = [];
let data;
onMount(async () => {
    const response = await fetch('https://storage.googleapis.com/storage/v1/b/blogphotos10062024/o?&prefix=engagement/FlytographerEngagement');
    data = await response.json();
    let temp_links = [];
    for (let i = 0; i < data.items.length; i++) {
        temp_links.push(`https://storage.googleapis.com/blogphotos10062024/${data.items[i].name}`);
    }
    image_links = temp_links;
    console.log(image_links)

    const textureLoader = new THREE.TextureLoader()

    const texture1 = textureLoader.load(image_links[0])
    const geometry = new THREE.PlaneGeometry(10, 10)
    const mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({ 
            map: texture1
        })
    )
    scene.add(mesh)
});

// Camera
const camera = new THREE.OrthographicCamera(sizes.width / - 2, sizes.width / 2, sizes.height / 2, sizes.height / - 2, 1, 1000)
camera.position.set( 0, 0, 20 )

// Canvas
onMount(() => {
    const canvas = document.querySelector('canvas');
    console.log(canvas);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas

    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2)
    renderer.setSize(sizes.width, sizes.height);
    
    renderer.render(scene, camera);

    // Controls
    const controls = new MapControls(camera, renderer.domElement)

    let animate = () => {
        controls.update()
        renderer.render(scene, camera)
    }
    renderer.setAnimationLoop(animate)
})

</script>
<main>
    <canvas></canvas>
</main>