import type { ShipType, EngineType, FormOption } from "@/types/form";

export const SHIP_OPTIONS: FormOption<ShipType>[] = [
  { value: "container", label: "Container" },
  { value: "bulk_carrier", label: "Bulk Carrier" },
  { value: "LNGC", label: "LNGC" },
  { value: "PCTC", label: "PCTC" },
  { value: "naval", label: "Naval" },
  { value: "passenger", label: "Passenger" },
];

export const ENGINE_OPTIONS: FormOption<EngineType>[] = [
  { value: "single", label: "Single" },
  { value: "twin", label: "Twin" },
];
