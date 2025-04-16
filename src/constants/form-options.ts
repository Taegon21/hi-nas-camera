import type { ShipType, EngineType } from "@/types/form";

interface Option<T extends string> {
  value: T;
  label: string;
}

export const SHIP_OPTIONS: Option<ShipType>[] = [
  { value: "container", label: "Container" },
  { value: "bulk_carrier", label: "Bulk Carrier" },
  { value: "LNGC", label: "LNGC" },
  { value: "PCTC", label: "PCTC" },
  { value: "naval", label: "Naval" },
  { value: "passenger", label: "Passenger" },
];

export const ENGINE_OPTIONS: Option<EngineType>[] = [
  { value: "single", label: "Single" },
  { value: "twin", label: "Twin" },
];

export const SHIP_TYPE_VALUES = SHIP_OPTIONS.map((option) => option.value) as [
  ShipType,
  ...ShipType[],
];
export const ENGINE_TYPE_VALUES = ENGINE_OPTIONS.map((option) => option.value) as [
  EngineType,
  ...EngineType[],
];
