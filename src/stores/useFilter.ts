import { create } from "zustand";
import { CurrentFilter, ISelector } from "../types/ISelector";

interface FiltersProps {
  filters: ISelector[];
  setFilters: (state: ISelector[]) => void;
  currentFilter: CurrentFilter;
  setCurrentFilter: (state: CurrentFilter) => void;
}

export default create<FiltersProps>((set) => ({
  filters: [],
  setFilters: (state: ISelector[]) => {
    set(() => {
      return { filters: state };
    });
  },
  currentFilter: {},
  setCurrentFilter: (state: CurrentFilter) => {
    set(() => {
      return { currentFilter: state };
    });
  },
}));
