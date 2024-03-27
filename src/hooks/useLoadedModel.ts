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
import { ISelector } from "../types/ISelector";
import useFilter from "../stores/useFilter";

export function useLoadedModel() {
  const [meshIndex, setMeshIndex] = useState<Map<string, MeshUserData>>(
    new Map()
  );
  const setFilters = useFilter((state) => state.setFilters);
  const positionY = useClippingPosition((state) => state.positionY);
  const modelPath = "/model/sampleTexture.glb";
  const model = useGLTF(modelPath) as GLTF & ObjectMap;

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

  useEffect(() => {
    const newMeshIndex: Map<string, MeshUserData> = new Map();
    const userDataSelector: ISelector[] = [];

    model.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const materialUUID = child.material.uuid;
        const customMaterial = customDefaultMaterials.find(
          (material) => material.uuid === materialUUID
        );

        const userData = child.userData as MeshUserData;
        const userDataArray = Object.keys(userData).map((key) => {
          return {
            [key]: userData[key],
          };
        });
        userDataArray.forEach((data) => {
          const key = Object.keys(data)[0];
          const value = Object.values(data)[0];
          if (key === "defaultMaterialId") return;

          if (!userDataSelector.find((selector) => selector[key])) {
            userDataSelector.push({ [key]: [value] });
          } else {
            const selector = userDataSelector.find((selector) => selector[key]);
            if (selector && selector[key].includes(value) === false) {
              selector[key].push(value);
            }
          }
        });

        if (customMaterial) {
          child.material = customMaterial;
          child.userData = {
            ...child.userData,
            defaultMaterialId: customMaterial.uuid,
          };
        }

        newMeshIndex.set(child.uuid, userData);
      }
    });
    const sortedFilters = userDataSelector.map((selector) => {
      const key = Object.keys(selector)[0];
      const values = selector[key];
      return { [key]: values.sort() };
    });
    setFilters(sortedFilters);
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
