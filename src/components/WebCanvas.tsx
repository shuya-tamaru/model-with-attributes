import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import CanvasSpinner from "../components/CanvasSpinner";
import { Perf } from "r3f-perf";
import Lights from "../components/Lights";
import Model from "../components/Model";
import useGetId from "../stores/useGetId";

export default function WebCanvas() {
  const { meshId } = useGetId((state) => state);
  return (
    <Canvas
      style={{
        width: "100%",
        height: "100%",
        background: "#fff",
        transition: "all 0.3s ease-in-out",
      }}
      camera={{
        fov: 75,
        near: 0.1,
        far: 20000,
        position: [20, 20, -20],
      }}
      shadows
      gl={{ antialias: true }}
    >
      <OrbitControls makeDefault />
      {/* <Perf /> */}
      <Suspense fallback={<CanvasSpinner />}>
        <Center>
          <Model />
          <Lights />
        </Center>
      </Suspense>
    </Canvas>
  );
}
