import { create } from "zustand";

interface MeshId {
  meshId: string | null;
  setMeshId: (state: string | null) => void;
}

export default create<MeshId>((set) => ({
  meshId: null,
  setMeshId: (state: string | null) => {
    set(() => {
      return { meshId: state };
    });
  },
}));
