export const SHARED = {
  REQUIRED: "Required",
  REQUIRED_TEXT: "Required text",
  POSITIVE: "Value must be positive",
  ANGLE_RANGE: "Value must be between -180 and 180",
  DEFAULT: "Invalid value",
  INVALID_NUMBER: "Please enter a valid number",
} as const;

interface CategoryErrorMessage {
  default: string;
  [fieldName: string]: string;
}

export const CATEGORY_ERROR_MESSAGES: Record<string, CategoryErrorMessage> = {
  "Ship Information": {
    default: SHARED.DEFAULT,
    ship_name: "Invalid ship name",
    call_sign: "Invalid call sign",
    ship_type: 'Invalid literal value, expected "container"',
    length: SHARED.POSITIVE,
    beam: SHARED.POSITIVE,
    draft: SHARED.POSITIVE,
    engine: 'Invalid literal value, expected "single"',
  },
  "Cam Focal Length": {
    default: SHARED.DEFAULT,
    messages: SHARED.POSITIVE,
  },
  "Cam Principal Length": {
    default: SHARED.DEFAULT,
    messages: SHARED.POSITIVE,
  },
  "Roll Pitch Yaw": {
    default: SHARED.DEFAULT,
    messages: SHARED.ANGLE_RANGE,
  },
};
