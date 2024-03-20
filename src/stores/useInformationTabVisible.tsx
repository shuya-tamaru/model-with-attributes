import { create } from "zustand";

interface InfoVisibleProps {
  visible: boolean;
  setVisible: (state: boolean) => void;
}

export default create<InfoVisibleProps>((set) => ({
  visible: false,
  setVisible: (state: boolean) => {
    set(() => {
      return { visible: state };
    });
  },
}));
