<script>
import * as THREE from 'three'
import { onMount, onDestroy } from 'svelte'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui'
import gsap from 'gsap'

const TEXTURE_ROUTE = '/threeJsJourney/chapter10/textures'

// Textures
// Vanilla JS Way
// const image = new Image()
// image.src = '/threeJsJourney/chapter10/textures/door/color.jpg'
// let texture = new THREE.Texture(image)
// texture.colorSpace = THREE.SRGBColorSpace

// image.addEventListener('load', () => {
//     texture.needsUpdate = true
// })

// ThreeJS Way
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () => {
    console.log('loading started')
}
loadingManager.onLoad = () => {
    console.log('loading finished')
}
loadingManager.onProgress = () => {
    console.log('loading progressing')
}
loadingManager.onError = () => {
    console.log('loading error')
}
const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load(`${TEXTURE_ROUTE}/door/color.jpg`)
colorTexture.colorSpace = THREE.SRGBColorSpace
const alphaTexture = textureLoader.load(`${TEXTURE_ROUTE}/door/alpha.jpg`)
const heightTexture = textureLoader.load(`${TEXTURE_ROUTE}/door/height.jpg`)
const normalTexture = textureLoader.load(`${TEXTURE_ROUTE}/door/normal.jpg`)
const ambientOcclusionTexture = textureLoader.load(`${TEXTURE_ROUTE}/door/ambientOcclusion.jpg`)
const metalnessTexture = textureLoader.load(`${TEXTURE_ROUTE}/door/metalness.jpg`)
const roughnessTexture = textureLoader.load(`${TEXTURE_ROUTE}/door/roughness.jpg`)

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
debugObject.color = '#587ah59'
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 2, 2, 2),
    new THREE.MeshBasicMaterial({ map: colorTexture })
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
<h2>Lesson 10: Textures</h2>
<p>Press h to toggle debugger</p>
<p>We had cube for too long. Time for some textures</p>
<h3>What are textures?</h3>
<p>
    Textures are images that cover surface of geometries. There are many types
    with many different effects. We are going to discover the most used types
    with the door textures by Joao Paulo
</p>
<h3>Color (or albedo)</h3>
<p>Albedo texture are the most simple one applied on geometry</p>
<h3>Alpha</h3>
<p>Grayscale image. White visible and black not visible</p>
<h3>Height (or displacement)</h3>
<p>
    Grayscale image. Move the vertices to create some relief. You need enough
    subdivisions. It creates depth. More white means the area is convexed while
    more black means more convexed
</p>
<h3>Normal</h3>
<p>
    Adds details. Doesn't need subdivision. Vertices won't move. It is mostly
    for lighting. Better performance than adding a height texture with a lot of
    subdivision.
</p>
<h3>Ambient Occlusion</h3>
<p>
    Also a grayscale image. Adds fake shadows in crevices. Not physically
    accurate but helps to create contrast and see details.
</p>
<h3>Metalness</h3>
<p>
    Also a grayscale image. White is metallic and black is non-metallic. This is
    used for reflection
</p>
<h3>Roughness</h3>
<p>
    Also a grayscale image. In duo with metalness. White is rough and black is
    smooth. Mostly for light dissipation. Carpet for example would be all white
    and reflects very little light if any. Door hinge would be black because it
    is smooth and will reflect light.
</p>
<br>
<p>
    There are many other types but we will focus on these main ones.
</p>
<h3>PBR (Physically Based Rendering)</h3>
<p>
    All above textures follow PBR principles. These techniques tend to follow
    real-life directions to get realistic results. Becoming the standard for
    realistic renders. Many software, engines (Unreal, Unity), and libraries 
    (ThreeJS) are
    using it.
</p>
<p>Good articles to read:</p>
<ul>
<li>
<a href="https://marmoset.co/posts/basic-theory-of-physically-based-rendering/">
    https://marmoset.co/posts/basic-theory-of-physically-based-rendering/
</a>
</li>
<li>
<a href="https://marmoset.co/posts/physically-based-rendering-and-you-can-too/">
    https://marmoset.co/posts/physically-based-rendering-and-you-can-too/
</a>
</li>
</ul>
<h3>Images</h3>
<p>
    We cannot use image directly. We need to transform it to a
    <code>Texture</code>. <code>TextureLoader</code> can load multiple textures.
    We can pass 3 functions after path to <code>TextureLoader</code>. They are
    <code>load</code> when image loads successfully, <code>progress</code> when
    the loading is progressing, and <code>error</code> is something goes wrong.
</p>
<h3>Using LoadingManager</h3>
<p>
    Use LoadingManager to mutualize the events. Meaning we want to track when
    ALL textures are finished loading. This is used for that progress bar when
    assets are loading.
</p>
<h3>UV Unwrapping</h3>
<p>How the texture is wrapped on the geometry. Using UV coordinates.</p>
<h3>Transforming the Texture</h3>
<h3>Filtering and Mipmapping</h3>
<p>
    If you look at cube's top face at an angle you will see it is a blurry
    texture. That is due to filtering and Mipmapping.
</p>
<p>
    Mipmapping is a technique that consists of creating half a smaller version
    of texture again and again until we get a 1v1 texture. All those texture
    variations are sent to GPU and GPU will choose most appropriate version of
    texture. What algorithm is used? Minification filter. It happens when pixels
    of texture are smaller than the pixels of the render.
</p>
<h3>Texture Format and Optimization</h3>
<p>When preparing textures, remember 3 things:</p>
<ol>
    <li>
        weight - users have to download textures. choose right type of file. jpg
        use lossy compression but usually lighter. png uses lossless compression
        but usually heavier
    </li>
    <li>
        size (resolution) - each pixel of texture is stored on GPU regardless of
        image's weight. GPU has storage limits. Even worst cause mipmapping
        increases number of pixels to store. Try to reduce size of images as
        much as possible. mipmapping will produce a half smaller version
        repeatedly until 1x1. So keep picture height and width a power of 2.
    </li>
    <li>
        data - textures support transparency but we can't have transparency in
        .jpg. If we want to have only 1 texture that combine color and alpha, we
        better use .png file
    </li>
</ol>
<h3>Where to Find Textures</h3>
<p>
    It is always hard to find perfect textures. Use the websites below, google,
    take your own photos, or create one in Photoshop or even procedural textures
    with Substance Designer
</p>
<ul>
    <li>poliigon.com</li>
    <li>3dtextures.me</li>
    <li>arroway-textures.ch</li>
</ul>

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