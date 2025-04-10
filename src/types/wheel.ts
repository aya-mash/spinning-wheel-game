export type WheelSegment = {
  id: number;
  label: string;
  color: string;
};

export type SpinResult = {
  segment: WheelSegment;
  degrees: number;
};
