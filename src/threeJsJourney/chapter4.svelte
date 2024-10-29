<script>
import * as THREE from 'three'
import { onMount } from 'svelte'

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)


// // Position
// mesh.position.x = 0.7
// mesh.position.y = -0.6
// mesh.position.z = -5
// console.log(mesh.position.length())

// // Scale
// mesh.scale.x = 1

// // Rotation
// mesh.rotation.x = (3 * Math.PI) / 12
// mesh.rotation.y = (3 * Math.PI) / 12
// scene.add(mesh)

const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({ color: 'red', wireframe: true  })
)
cube1.position.x = -1
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({ color: 'pink', wireframe: true  })
)
cube2.position.x = 1
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({ color: 'green', wireframe: true })
)
cube3.position.y = 1
group.add(cube3)

group.position.y = 1
group.scale.y = 0.5
group.rotation.y = (Math.PI * 3) / 12


// Axes Helper
const axesHelper = new THREE.AxesHelper(1)
scene.add(axesHelper)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(-1, -2, 3)
camera.rotation.x = Math.PI / 6
camera.rotation.y = (Math.PI * 11) / 6
scene.add(camera)

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
<h2>Lesson 4: Transform Objects</h2>
<p>Four properties to transform objects which can be combined in any order</p>
<ol>
    <li>
        position (to move the object). Inherits from Vector3 which has many 
        useful methods. 
        <ul>
            <li>
                You can get the length of vector using:<code>
                mesh.position.length()</code> This represents the distance 
                betweenmesh and the center of the scene. (verify using distance
                formula). 
            </li>
            <li>
                You can get the distance from another Object3D or position using <code>
                mesh.position.distanceTo(camera.position) </code>
            </li>
            <li>
                <code>normalize()</code> can take length of vector and reduce 
                it to 1. This can be useful for fixing distance of camera or 
                object. 
            </li>
            <li>
                Position can be set using <code>position.set(x,y,z)</code>
            </li>
            <li>
                <a href="https://threejs.org/docs/#api/en/helpers/AxesHelper">AxesHelper</a>
                class can help with adjusting this.
            </li>
        </ul>
    </li>
    <li>
        scale (to resize the object)
        <ul>
            <li>
                Also has 3 properties: x, y, z. Default values are all 1
            </li>
            <li>
                Can also be used with <code>set()</code>
            </li>
        </ul>
    </li>
    <li>
        rotation (to rotate the object)
        <ul>
            <li>
                Upadting rotation or quaternion will update the other 
                automatically
            </li>
            <li>
                rotation also has x,y,z but it is not a Vector3 but a Euler. So 
                x/y/z is the angle of the x/y/z axis in radians (default is 0).
            </li>
            <li>
                Euler is easy to understand but axis order can be problematic. 
                This is why most engines and 3D software use Quaternion
            </li>
        </ul>
    </li>
    <li>
        quaternion (to also rotate object; more later)
        <ul>
            <li>
                Express rotation in a more mathematical way. But it is hard to
                imagine. Not covered in this lesson.
            </li>
        </ul>
    </li>
</ol>
<p>
    All objects that inherit from Object3D (ex: Mesh and PerspectiveCamera
    from lesson 3) possess these properties. You can see these in
    <a href="https://threejs.org/docs/#api/en/cameras/PerspectiveCamera">docs.</a>
</p>
<p>
    These properties are compiled in matrices. Which you do not need to 
    understand yet
</p>
<p>
    The distance of 1 unit is arbitrary. You should think of 1 according to what
    you are building (1 cm, 1 meter, 1 kilometer, etc.)
</p>
<p>
    Object3D instances have a <code>lookAt(...)</code> method which rotates the object that
    its -z faces the farget you provided. The target must be a Vector3
</p>
<h3>Scene Graph</h3>
<p>
    Sometimes you will create complex objects. For example you can create a
    house with walls, doors, windows, etc. Rather than painfully moving each
    object. What you can do instead is use <code>Group</code> class and just
    apply transformation on entire thing
</p>
<canvas class="webgl"></canvas>
</main>