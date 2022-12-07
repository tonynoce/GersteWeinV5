<script lang="ts">
	import { Canvas, InteractiveObject, OrbitControls, T } from '@threlte/core'
    import { useFrame } from '@threlte/core'
    import { Text } from '@threlte/extras'

	import { MeshBasicMaterial, MeshStandardMaterial } from 'three';

    export let numberCito:number ;
</script>

<!-- <input 
type=number
min="0" max="100"
bind:value={numberCito}
> -->

<Canvas>
    <T.PerspectiveCamera makeDefault position={[0, 0, 15]} fov={24}>
        <OrbitControls 
        target={{ y:-2 }}
        />
    </T.PerspectiveCamera>
    
    <T.AmbientLight intensity={0.5} />
    
    <T.DirectionalLight position={[3, 10, 10]} intensity={1} />
    <T.DirectionalLight position={[-3, 10, -10]} intensity={0.5} />
    
    <T.DirectionalLight position={[-15, -10, 20]} intensity={0.25} color={"orange"}/>
    <T.DirectionalLight position={[5, -10, 10]} intensity={0.25} color={"blue"}/>
<Text text={numberCito}
receiveShadow={true}
castShadow={true}
textAlign={"center"}
position={{y:2}}

font={"/src/fonts/norwester.otf"}
fontSize={7}
scale={1}
/>
</Canvas>