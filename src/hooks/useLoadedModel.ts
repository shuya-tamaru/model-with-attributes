import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { ObjectMap } from "@react-three/fiber";

import { MeshUserData } from "../types/MeshUserData";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import { vertex } from "../shaders/vertex";
import { fragment } from "../shaders/fragment";
import { ICustomShaderMaterial } from "../types/ICustomDefaultMaterials";
import useClippingPosition from "../stores/useClippingPosition";

export function useLoadedModel() {
  const modelPath = "/model/sampleTexturever7.glb";
  const model = useGLTF(modelPath) as GLTF & ObjectMap;
  const positionY = useClippingPosition((state) => state.positionY);
  const customDefaultMaterials = useMemo(() => {
    return Object.values(model.materials).map((material) => {
      const mat = material as THREE.MeshStandardMaterial;
      const diffuse = (mat as THREE.MeshStandardMaterial).color;
      const diffuseRGB = new THREE.Vector3(diffuse.r, diffuse.g, diffuse.b);
      const { name, color, metalness, roughness, uuid, opacity, map } = mat;
      const side = name.indexOf("天井") ? THREE.DoubleSide : THREE.FrontSide;

      const customShaderMaterial = new CustomShaderMaterial({
        baseMaterial: THREE.MeshStandardMaterial,
        uniforms: {
          cutHeight: { value: 1.0 },
          uDiffuse: { value: diffuseRGB },
        },
        vertexShader: vertex,
        fragmentShader: fragment,
        name,
        color,
        metalness,
        roughness,
        transparent: true,
        opacity,
        map,
        side,
        envMapIntensity: 4,
      });
      const customDefaultMaterial =
        customShaderMaterial as ICustomShaderMaterial;
      customDefaultMaterial.uuid = uuid;
      return customShaderMaterial;
    });
  }, [model]);

  const [meshIndex, setMeshIndex] = useState<Map<string, MeshUserData>>(
    new Map()
  );

  useEffect(() => {
    const newMeshIndex: Map<string, MeshUserData> = new Map();

    model.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const materialUUID = child.material.uuid;
        const customMaterial = customDefaultMaterials.find(
          (material) => material.uuid === materialUUID
        );
        if (customMaterial) {
          child.material = customMaterial;
          child.userData = {
            ...child.userData,
            defaultMaterialId: customMaterial.uuid,
          };
        }
        const userData = child.userData as MeshUserData;
        newMeshIndex.set(child.uuid, userData);
      }
    });
    setMeshIndex(newMeshIndex);
  }, [modelPath]);

  useEffect(() => {
    customDefaultMaterials.forEach((material) => {
      if (material.uniforms && material.uniforms.cutHeight) {
        material.uniforms.cutHeight.value = positionY;
        material.needsUpdate = true;
      }
    });
  }, [positionY]);
  return { model, meshIndex, defaultMaterials: customDefaultMaterials };
}

// function initializeMesh(mesh: THREE.Mesh) {
//   mesh.castShadow = true;
//   mesh.receiveShadow = true;
//   // const material = mesh.material as THREE.MeshStandardMaterial;
//   // material.side = THREE.DoubleSide;
//   // material.envMapIntensity = 2;
//   // material.transparent = true;
//   // material.roughness = 0.5;
//   // material.needsUpdate = true;
//   // mesh.userData = { ...mesh.userData, defaultMaterialId: material.uuid };
// }
