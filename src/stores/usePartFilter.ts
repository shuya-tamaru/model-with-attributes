import { create } from "zustand";

interface PartProps {
  part: string | null;
  setPart: (state: string | null) => void;
}

export default create<PartProps>((set) => ({
  part: null,
  setPart: (state: string | null) => {
    set(() => {
      return { part: state };
    });
  },
}));
