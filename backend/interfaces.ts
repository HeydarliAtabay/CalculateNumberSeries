export interface InputBody {
  number: number;
  type: number;
    data: {
    start: number;
    common: number;
  };
  ticket:number
}

export interface Progression {
  id: number;
  name: string;
}

export const progressions: Progression[] = [
  { id: 1, name: "arithmetic progression" },
  { id: 2, name: "geometric progression" },
  { id: 3, name: "harmonic progression" },
  { id: 4, name: "fibonacci" }
];
