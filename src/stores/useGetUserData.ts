import { create } from "zustand";
import { MeshUserData } from "../types/MeshUserData";

interface InformationProps {
  information: MeshUserData | null;
  setInformation: (state: MeshUserData | null) => void;
}

export default create<InformationProps>((set) => ({
  information: null,
  setInformation: (state: MeshUserData | null) => {
    set(() => {
      return { information: state };
    });
  },
}));
