<script>
	import { Canvas, InteractiveObject, OrbitControls, T } from '@threlte/core'
	import { useFrame } from '@threlte/core'

    import { GLTF} from "@threlte/extras"
	import { MeshBasicMaterial, MeshStandardMaterial } from 'three';
	import { degToRad } from 'three/src/math/MathUtils'

	let materialForGWT = new MeshStandardMaterial({color: "white"})
	
	let rotationY = 0;
/* 
	let animationFrameHandle;


	function tick() {
		rotationY += 0.007;
	  animationFrameHandle = requestAnimationFrame(tick);
	};
	autoRotate
	autoRotateSpeed={3.5}
	tick() */

	useFrame(() => {
  	rotationY += 0.007;
	})
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, 15]} fov={24}>
	<OrbitControls 
	maxPolarAngle={degToRad(80)} 
	enableZoom={false} 
	target={{ y: 1.25 }}

	 />
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.5} />

<T.DirectionalLight position={[3, 10, 10]} intensity={1} />
<T.DirectionalLight position={[-3, 10, -10]} intensity={0.5} />

<T.DirectionalLight position={[-15, -10, 20]} intensity={0.25} color={"orange"}/>
<T.DirectionalLight position={[5, -10, 10]} intensity={0.25} color={"blue"}/>


<GLTF url="GersteweinLogo.glb"
	
	rotation= {{y:rotationY}}
	scale={3.5}
	position={{y:-1.5}}
	/>
