import { atom, selector } from "recoil";

export const minuteState = atom({
  key: "minute",
  default: 0,
});

export const hourSelector = selector({
  key: "hours",
  get: ({ get }) => {
    const minute = get(minuteState);
    return minute / 60;
  },

  set: ({ set }, newValue) => {
    const minute = Number(newValue) * 60;
    set(minuteState, minute);
  },
});

export interface IToDo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: IToDo[];
}
export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "TO DO": [],
    DOING: [],
    DONE: [],
  },
});
