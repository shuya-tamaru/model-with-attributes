import { useThree } from "@react-three/fiber";
import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { TransformControls } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";

import { useLoadedModel } from "../hooks/useLoadedModel";
import useFloorSelector from "../stores/useFloorSelector";
import { selectedMaterial } from "../utils/materials";
import usePartFilter from "../stores/usePartFilter";
import useGetUserData from "../stores/useGetUserData";
import { MeshUserData } from "../types/MeshUserData";
import useClippingPosition from "../stores/useClippingPosition";
import useFilter from "../stores/useFilter";

export default function Model() {
  const ref = useRef<THREE.Mesh>(null);
  const setInformation = useGetUserData((state) => state.setInformation);
  const { raycaster } = useThree();
  const { model, meshIndex, defaultMaterials } = useLoadedModel();
  const floor = useFloorSelector((state) => state.floor);
  const part = usePartFilter((state) => state.part);
  const { positionY, setPositionY } = useClippingPosition((state) => state);
  const [beforeSelectedMeshId, setBeforeSelectedMeshId] = useState<
    string | null
  >(null);
  const currentFilter = useFilter((state) => state.currentFilter);

  const { position } = useSpring({ position: [-10, positionY, -10] });
  const getRayCastPosition = useCallback(
    (e: MouseEvent) => {
      const mesh = model.scene.getObjectByProperty(
        "uuid",
        beforeSelectedMeshId
      ) as THREE.Mesh;

      if (mesh) {
        const materialId = mesh.userData.defaultMaterialId;
        const material = defaultMaterials.find((material) => {
          return material.uuid === materialId;
        });

        if (material) {
          mesh.material = material;
        }
      }
      const visibleMeshes = Array.from(model.scene.children).filter((child) => {
        return child.visible;
      });
      const intersectObjects = raycaster.intersectObjects(visibleMeshes);
      const firstIntersectObject = intersectObjects[0];

      if (
        firstIntersectObject &&
        firstIntersectObject.object instanceof THREE.Mesh
      ) {
        const userData = firstIntersectObject.object.userData as MeshUserData;
        if (userData) {
          firstIntersectObject.object.material = selectedMaterial;
          setBeforeSelectedMeshId(firstIntersectObject.object.uuid);
          setInformation(userData);
        } else {
          setBeforeSelectedMeshId(null);
        }
      }
    },
    [meshIndex, defaultMaterials, model, beforeSelectedMeshId]
  );

  useEffect(() => {
    const filterKeys = Object.keys(currentFilter);
    meshIndex.forEach((value, key) => {
      const mesh = model.scene.getObjectByProperty("uuid", key) as THREE.Mesh;
      const userData = mesh.userData as MeshUserData;
      let isVisible = true;
      filterKeys.forEach((filterKey: string) => {
        if (currentFilter[filterKey] === "") {
          return;
        } else if (
          !userData[filterKey] ||
          userData[filterKey] !== currentFilter[filterKey]
        ) {
          isVisible = false;
        }
      });
      mesh.visible = isVisible;
    });
  }, [currentFilter]);

  useEffect(() => {
    if (floor) {
      meshIndex.forEach((value, key) => {
        if (value.floor === floor) {
          const mesh = model.scene.getObjectByProperty(
            "uuid",
            key
          ) as THREE.Mesh;
          mesh.visible = true;
        } else {
          const mesh = model.scene.getObjectByProperty(
            "uuid",
            key
          ) as THREE.Mesh;
          mesh.visible = false;
        }
      });
    } else {
      meshIndex.forEach((value, key) => {
        const mesh = model.scene.getObjectByProperty("uuid", key) as THREE.Mesh;
        mesh.visible = true;
      });
    }
  }, [floor, meshIndex, defaultMaterials]);

  useEffect(() => {
    if (part) {
      meshIndex.forEach((value, key) => {
        if (value.part === part) {
          const mesh = model.scene.getObjectByProperty(
            "uuid",
            key
          ) as THREE.Mesh;
          mesh.visible = true;
        } else {
          const mesh = model.scene.getObjectByProperty(
            "uuid",
            key
          ) as THREE.Mesh;
          mesh.visible = false;
        }
      });
    } else {
      meshIndex.forEach((value, key) => {
        const mesh = model.scene.getObjectByProperty("uuid", key) as THREE.Mesh;
        mesh.visible = true;
      });
    }
  }, [part, meshIndex]);

  useEffect(() => {
    window.addEventListener("dblclick", getRayCastPosition);
    return () => window.removeEventListener("dblclick", getRayCastPosition);
  }, [getRayCastPosition]);

  return (
    <>
      {ref.current && (
        <TransformControls
          mode="translate"
          object={ref.current}
          showY
          showX={false}
          showZ={false}
          onChange={() => {
            if (ref.current) setPositionY(ref.current.position.y);
          }}
        />
      )}
      {/* <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[-10, positionY, -10]}
        ref={ref}
      > */}
      <animated.mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={position as any}
        ref={ref}
      >
        <planeGeometry args={[30, 30]} />
        <meshBasicMaterial color="green" side={THREE.DoubleSide} wireframe />
      </animated.mesh>
      <primitive object={model.scene} />
    </>
  );
}
