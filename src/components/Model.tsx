import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import useGetId from "../stores/useGetId";
import { useThree } from "@react-three/fiber";
import { useCallback, useEffect } from "react";

export default function Model() {
  const modelPath = "/model/test_model.glb";
  const gltf = useGLTF(modelPath);

  gltf.scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  console.log(gltf);
  const { setMeshId } = useGetId((state) => state);
  const { raycaster } = useThree();
  const getRayCastPosition = useCallback((e: MouseEvent) => {
    const intersectObjects = raycaster.intersectObjects(gltf.scene.children);

    const firstIntersectObject = intersectObjects[0];
    const meshId = firstIntersectObject?.object.userData.id;

    if (meshId) {
      setMeshId(meshId);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousedown", getRayCastPosition);
    return () => window.removeEventListener("mousedown", getRayCastPosition);
  }, []);

  return <primitive object={gltf.scene} />;
}
