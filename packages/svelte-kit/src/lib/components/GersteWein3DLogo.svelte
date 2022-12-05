<script>
	import { Canvas, InteractiveObject, OrbitControls, T } from '@threlte/core'
    import { GLTF} from "@threlte/extras"
	import { degToRad } from 'three/src/math/MathUtils'

</script>

	<Canvas>
		<T.PerspectiveCamera makeDefault position={[10, 10, 10]} fov={24}>
			<OrbitControls maxPolarAngle={degToRad(80)} enableZoom={false} target={{ y: 0.5 }} />
		</T.PerspectiveCamera>

		<T.DirectionalLight castShadow position={[3, 10, 10]} />
		<T.DirectionalLight position={[-3, 10, -10]} intensity={0.2} />
		<T.AmbientLight intensity={0.} />
        
        <GLTF url="GersteweinLogo.glb"
        scale={5}
		position={{y:-3}} 
        />
	</Canvas>

<style>

</style>