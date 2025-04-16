export type ShipType = "container" | "bulk_carrier" | "LNGC" | "PCTC" | "naval" | "passenger";

export type EngineType = "single" | "twin";

export type FieldType = "text" | "radio" | "number";

export interface FormField {
  category: string;
  name: string;
  label: string;
  type: FieldType;
}

export interface FormDataType {
  ship_name: string;
  ship_type: ShipType;
  call_sign: string;
  engine: EngineType;
  length: number;
  beam: number;
  draft: number;
  cam_fx: [number, number, number];
  cam_fy: [number, number, number];
  cam_px: [number, number, number];
  cam_py: [number, number, number];
  rpy: [number, number, number, number, number, number, number, number, number];
}
