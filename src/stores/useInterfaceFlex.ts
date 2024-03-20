import { create } from "zustand";

type FlexRatio = {
  canvas: number;
  info: number;
};

interface InterfaceFlexProps {
  flexRatio: FlexRatio;
  setFlexRatio: (state: FlexRatio) => void;
}

export default create<InterfaceFlexProps>((set) => ({
  flexRatio: {
    canvas: 1.0,
    info: 0,
  },
  setFlexRatio: (state: FlexRatio) => {
    set(() => {
      return { flexRatio: state };
    });
  },
}));
