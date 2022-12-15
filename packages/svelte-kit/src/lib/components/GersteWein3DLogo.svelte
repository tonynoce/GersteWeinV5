<script>
	import { Canvas, InteractiveObject, OrbitControls, T } from '@threlte/core'
	import { useFrame } from '@threlte/core'

    import { GLTF} from "@threlte/extras"
	import { AxesHelper, BoxHelper, GridHelper, MeshBasicMaterial, MeshStandardMaterial } from 'three';
	import { degToRad } from 'three/src/math/MathUtils'

	let materialForGWT = new MeshStandardMaterial({color: "white"})
	
	let rotationY = 0;


	useFrame(() => {
  		rotationY -= 0.005;
	})
</script>


<!-- <T.AxesHelper /> -->

<T.PerspectiveCamera makeDefault position={[0, 0, 15]} fov={24}>
	<OrbitControls 
	maxPolarAngle={degToRad(80)} 
	enableZoom={false} 
	target={{ y: 1.25 }}

	 />
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.85} />

<T.DirectionalLight position={[3, 10, 10]} intensity={0.75} color={"rgb(20, 70, 220)"}/>
<T.DirectionalLight position={[-5, 10, -10]} intensity={0.75} color={"rgb(70, 100, 100)"}/>

<T.DirectionalLight position={[-15, -10, 20]} intensity={0.35} color={"orange"}/>
<T.DirectionalLight position={[5, -10, 10]} intensity={0.35} color={"blue"}/>

<T.PointLight position={[0, -2, 25]} intensity={0.75} color={"rgb(20, 70, 220)"}/>

<T.PointLight position={[15, 2, 0]} intensity={0.25} color={"rgb(20, 70, 220)"}/>
<T.PointLight position={[-15, 1, 0]} intensity={0.25} color={"rgb(20, 70, 220)"}/>


<GLTF url="GersteweinLogo.glb"
	
	rotation= {{y:rotationY}}
	scale={3.5}
	position={{y:-1.5}}
	/>
