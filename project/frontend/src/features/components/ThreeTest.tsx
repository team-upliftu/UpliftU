import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import React from "react"
import { OrbitControls, Environment, Sphere, useEnvironment } from '@react-three/drei'
import { useTexture, Cloud, useGLTF } from "@react-three/drei";
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { BlurPass, Resizer, KernelSize, Resolution } from 'postprocessing'
import { useAuthContext } from '../auth/AuthContext'
import MovingCosmos from './three/MovingCosmos'
type BoxProps = {
  position: [x: number, y: number, z: number];
};

const Base: React.FC<BoxProps> = (props) => {
  const mesh = useRef<Mesh>(null!);
  // useFrame(() => (mesh.current.rotation.x += 0.01));
	const mapping = useTexture("../../../public/seaside_rock_diff_4k.jpg");

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={1}
			castShadow
			receiveShadow
    >
			<cylinderGeometry args={[11, 11, 0.5, 32]}/>
      {/* <boxGeometry args={[20, 0.5, 20]} /> */}
      <meshStandardMaterial map={mapping} />
    </mesh>
  );
};

const Cone: React.FC<BoxProps> = (props) => {
  const mesh = useRef<Mesh>(null!);

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={1}
			castShadow
			receiveShadow
    >
      <coneGeometry args={[0.25, 1, 16]}/>
      <meshStandardMaterial color={'#ffc300'} />
    </mesh>
  );
};

const Cylinder: React.FC<BoxProps> = (props) => {
  const mesh = useRef<Mesh>(null!);

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={1}
			castShadow
			receiveShadow
    >
      <cylinderGeometry args={[0.1, 0.1, 1, 32]}/>
      <meshStandardMaterial color={'#386641'} />
    </mesh>
  );
};

const Cylinder2: React.FC<BoxProps & { color: string }> = (props) => {
	const { color } = props;
  const mesh = useRef<Mesh>(null!);

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={1}
			castShadow
			receiveShadow
    >
      <cylinderGeometry args={[0.35, 0.05, 0.3, 32]}/>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
    </mesh>
  );
};

const Flower: React.FC<BoxProps & { color: string }> = (props) => {
  const { position, color } = props;

  return (
    <group>
      <Cylinder position={[position[0], position[1] - 0.5, position[2]]} />
      <Cylinder2 position={[position[0], position[1], position[2]]} color={color} />
    </group>
  );
};

const Scene = () => {
  const gltf = useGLTF('../../../public/boulder_01_1k.gltf');
  // const texture = useTexture('../../../public/coast_land_rocks_02_diff_4k.jpg');

  return (
    <>
      <Model position={[-3, -0.3, -10]} gltf={gltf} rotation={[-Math.PI / 2, 0, 0.3]} scale={0.075} />
			<Model position={[1.5, -1, -8]} gltf={gltf} rotation={[0, 0, 0]} scale={0.03} />
      <Model position={[4.5, -1, 2]} gltf={gltf} rotation={[-Math.PI / 2, 0, Math.PI-0.25]} scale={0.04} />
    </>
  );
};

const Model: React.FC<BoxProps & { gltf: any; rotation: [number, number, number], scale: number }> = (props) => {
  const { position, rotation, gltf, scale } = props;

  return <primitive object={gltf.scene.clone()} scale={scale} position={position} rotation={rotation} />;
};

// coast_land_rocks_02_diff_4k.jpg

export const ThreeTest = () => {
	const [flowers, setFlowers] = useState<{ position: [number, number, number]; color: string }[]>([]);
  const [flowerColors, setFlowerColors] = useState<string[]>([]);
  const { user } = useAuthContext();

  const handleAddFlower = () => {
    const x = Math.random() * 15 - 7.5;
    const z = Math.random() * 15 - 7.5;
		const color = `hsl(${Math.random() * 360}, 100%, 70%)`;
    setFlowers((prevFlowers) => [...prevFlowers, { position: [x, 0, z], color }]);
  };

  const handleRemoveFlower = () => {
    setFlowers((prevFlowers) => prevFlowers.slice(0, -1));
  };

  useEffect(() => {
    const fetchFlowerColors = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/getflowercolor/${user.id}/`);
        if (response.ok) {
          const data = await response.json();
          const colors: string[] = [];

          data.colors.forEach((colorItem: any) => {
            const { color, count } = colorItem;
            for (let i = 0; i < count; i++) {
              colors.push(color);
              const x = Math.random() * 15 - 7.5;
              const z = Math.random() * 15 - 7.5;
              setFlowers((prevFlowers) => [...prevFlowers, { position: [x, 0, z], color }]);
            }
          });

          setFlowerColors(colors);
          console.log('Fetched flower colors:', colors);
        } else {
          console.error('Error fetching flower colors:', response.status);
        }
      } catch (error) {
        console.error('Error fetching flower colors:', error);
      }
    };

    fetchFlowerColors();
  }, [user]);

  // MovingCosmosのための風の方向
  const grad_x = Math.random()
  const grad_z = Math.random()

	return(
		<div>
			<div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}>
        <button onClick={handleAddFlower}>+</button>
        <button onClick={handleRemoveFlower}>-</button>
      </div>
			<Canvas camera={{ fov: 50, near: 0.1, far: 100, position: [0, 5, 20],  }} style={{ width: '100vw', height: '100vh' }} shadows>
				<directionalLight position={[20, 20, 5]} intensity={0.75} castShadow />
				{/* <ambientLight /> */}
				<Environment files={'../../../public/Solarsystemscope_texture_8k_stars_milky_way.jpg'} background />
				<Base position={[0, -1, 0]} />
				{/* <Flower position={[2.5, 0, 0.5]} /> */}
				{flowers.map((flower, index) => (
          // <Flower key={index} position={flower.position} color={flower.color} />
          <MovingCosmos key={index} position={flower.position} color={flower.color} grad={{ grad_x, grad_z }} />
        ))}
				<Cloud
					position={[5, 10, -10]} // 雲のポジショニング
					opacity={0.5} // 不透明度
					speed={0.4} // 回転速度
					scale={1.5} // 雲全体の幅
					segments={20} // パーティクルの数
				/>
				<Cloud
					position={[-10, 5, -15]} // 雲のポジショニング
					opacity={0.5} // 不透明度
					speed={0.4} // 回転速度
					scale={1} // 雲全体の幅
					segments={20} // パーティクルの数
				/>
				<group>
          <Scene />
        </group>
				<EffectComposer>
          <Bloom
            intensity={1}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.25}
          />
        </EffectComposer>
    		<OrbitControls enablePan={false} zoomSpeed={0.5} />
			</Canvas>
		</div>
	);
};