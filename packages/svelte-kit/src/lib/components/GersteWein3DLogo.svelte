<script>
	import { Canvas, InteractiveObject, OrbitControls, T } from '@threlte/core'
    import { GLTF} from "@threlte/extras"
	import { MeshBasicMaterial, MeshStandardMaterial } from 'three';
	import { degToRad } from 'three/src/math/MathUtils'

	let materialForGWT = new MeshStandardMaterial({color: "white"})
</script>

	<Canvas>
		<T.PerspectiveCamera makeDefault position={[10, 10, 10]} fov={24}>
			<OrbitControls 
			maxPolarAngle={degToRad(80)} 
			enableZoom={false} 
			target={{ y: 1 }}
			 />
		</T.PerspectiveCamera>

		<T.DirectionalLight castShadow position={[3, 10, 10]} />
		<T.DirectionalLight position={[-3, 10, -10]} intensity={0.2} />
		<T.AmbientLight intensity={0.2} />
        
        <GLTF url="GersteweinLogo.glb"
		materials={materialForGWT}
        scale={3.5}
		position={{y:-1.5}} 
        />
	</Canvas>

<style>

</style>