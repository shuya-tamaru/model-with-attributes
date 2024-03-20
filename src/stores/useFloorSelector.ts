import { create } from "zustand";

interface FloorProps {
  floor: string | null;
  setFloor: (state: string | null) => void;
}

export default create<FloorProps>((set) => ({
  floor: null,
  setFloor: (state: string | null) => {
    set(() => {
      return { floor: state };
    });
  },
}));
