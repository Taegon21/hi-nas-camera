const SHARED = {
  POSITION: "Please enter position",
  SCALE: "Please enter scale",
} as const;

interface CategoryPlaceholder {
  default: string;
  [fieldName: string]: string;
}

export const CATEGORY_PLACEHOLDERS: Record<string, CategoryPlaceholder> = {
  "Ship Information": {
    default: "",
    ship_name: "Please enter ship name",
    call_sign: "Please enter call sign",
    ship_type: "",
    length: "Please enter ship length",
    beam: "Please enter ship beam",
    draft: "Please enter ship draft",
    engine: "",
  },
  "Cam Focal Length": {
    default: SHARED.POSITION,
  },
  "Cam Principal Length": {
    default: SHARED.POSITION,
  },
  "Roll Pitch Yaw": {
    default: SHARED.SCALE,
  },
};
