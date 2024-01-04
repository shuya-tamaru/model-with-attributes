import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import CanvasSpinner from "./components/CanvasSpinner";
import { Perf } from "r3f-perf";
import Lights from "./components/Lights";
import Model from "./components/Model";
import useGetId from "./stores/useGetId";

function App() {
  const { meshId } = useGetId((state) => state);

  return (
    <div style={{ position: "relative" }}>
      <Canvas
        style={{ width: "100vw", height: "100vh", background: "#333" }}
        camera={{
          fov: 75,
          near: 0.1,
          far: 20000,
          position: [500, 500, 500],
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
      <div
        style={{
          width: `1000px`,
          color: "#fff",
          position: "absolute",
          top: 10,
          left: 10,
          fontSize: "40px",
        }}
      >
        {`idは ${meshId ? meshId : "未選択"} ですよ！`}
      </div>
    </div>
  );
}

export default App;
