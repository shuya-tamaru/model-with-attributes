import { create } from "zustand";

interface ClippingProps {
  positionY: number;
  setPositionY: (state: number) => void;
}

export default create<ClippingProps>((set) => ({
  positionY: 25.0,
  setPositionY: (state: number) => {
    set(() => {
      return { positionY: state };
    });
  },
}));
