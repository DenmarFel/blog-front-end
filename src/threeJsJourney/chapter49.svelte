<main>
<h1>Chapter 49 Creating a scene in Blender</h1>
<h2>Baking</h2>
<p>
When you do a render in 3D software like Blender, it usually look better than
Three.js because they use ray tracing. Ray Tracing consists of bouncing light to
simulate indirect lighting like the real world. It's realistic but rendering can
take a long time.
</p>
<p>
In WebGL, we only have a few ms, which is why we cannot use Ray Tracing. The
idea of <strong>baking</strong>, is we save those Ray Tracing renders into 
textures that we then place on the geometry. So no light, no real-time shadows,
just the texture being placed on the geometry for performance.
</p>
<p>
Drawbacks: We have to bake everything in 3D software, we have to load textures
(bandwidth and GPU memory). The lights aren't dynamic.
</p>
<p>
Choosing to use baking or not is up to you and project. Without baking, defer to
classic techniques in past lessons.
</p>
<h2>Process</h2>
<ul>
    <li>Create scene in 3D software (Blender)</li>
    <li>Optimize all objects</li>
    <li>UV unwrap everything. (Put all meshes onto a square)</li>
    <li>Bake render into textures(s)</li>
    <li>Export the scene and the textures(s)</li>
    <li>Import everything in Three.js and apply texture on mesh</li>
</ul>
</main>