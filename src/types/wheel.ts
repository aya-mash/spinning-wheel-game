export type WheelSegment = {
  id: number;
  label: string;
  color: string;
};

export type SpinResult = {
  segment: WheelSegment;
  degrees: number;
};

export type Theme = {
  background: string;
  text: string;
  card: string;
  border: string;
};
