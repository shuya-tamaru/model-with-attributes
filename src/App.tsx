import "./App.css";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
const material = new THREE.MeshStandardMaterial({
  vertexColors: true,
});

function App() {
  const modelPath = "/model/voronoiSphere_compress.gltf";
  const gltf2 = useGLTF(modelPath);
  gltf2.scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = material;
    }
  });

  return (
    <>
      <Canvas
        style={{ width: "100vw", height: "100vh", background: "#333" }}
        camera={{
          fov: 75,
          near: 0.1,
          far: 20000,
          position: [0, 20, 30],
        }}
      >
        <OrbitControls makeDefault />
        <directionalLight intensity={1.15} />
        <axesHelper scale={200} />
        <Stage intensity={0.02} environment={"city"} adjustCamera={true}>
          <primitive object={gltf2.scene} />
        </Stage>
      </Canvas>
    </>
  );
}

export default App;
