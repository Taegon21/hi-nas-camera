import { z } from "zod";
import type { FormDataType } from "@/types/form";
import { SHIP_TYPE_VALUES, ENGINE_TYPE_VALUES } from "@/constants/form-options";
import { CATEGORY_ERROR_MESSAGES, SHARED } from "@/constants/form-error-messages";
import { FORM_FIELDS } from "@/constants/form-fields";
import { extractCategories } from "@/shared/utils/category";

const CATEGORIES = extractCategories(FORM_FIELDS);

const getErrorMessage = (category: string, fieldName?: string): string => {
  const messages = CATEGORY_ERROR_MESSAGES[category];

  return fieldName && messages[fieldName]
    ? messages[fieldName]
    : messages.messages || messages.default;
};

const schemaCreators = {
  string: (category: string, fieldName: string) =>
    z
      .string({
        required_error: SHARED.REQUIRED,
      })
      .min(1, getErrorMessage(category, fieldName)),

  number: (category: string, fieldName?: string) =>
    z
      .number({
        required_error: SHARED.REQUIRED,
        invalid_type_error: SHARED.INVALID_NUMBER,
      })
      .positive(getErrorMessage(category, fieldName || "messages")),

  angle: (category: string, fieldName?: string) =>
    z
      .number({
        required_error: SHARED.REQUIRED,
        invalid_type_error: SHARED.INVALID_NUMBER,
      })
      .min(-180, getErrorMessage(category, fieldName || "messages"))
      .max(180, getErrorMessage(category, fieldName || "messages")),

  shipType: () =>
    z.enum(SHIP_TYPE_VALUES, {
      errorMap: () => ({ message: getErrorMessage(CATEGORIES.SHIP_INFORMATION, "ship_type") }),
    }),

  engineType: () =>
    z.enum(ENGINE_TYPE_VALUES, {
      errorMap: () => ({ message: getErrorMessage(CATEGORIES.SHIP_INFORMATION, "engine") }),
    }),

  cameraArray: (category: string) =>
    z.tuple([
      schemaCreators.number(category), // Left Camera
      schemaCreators.number(category), // Center Camera
      schemaCreators.number(category), // Right Camera
    ]),

  rpyArray: (category: string) =>
    z.tuple([
      schemaCreators.angle(category), // Left Roll
      schemaCreators.angle(category), // Left Yaw
      schemaCreators.angle(category), // Left Pitch
      schemaCreators.angle(category), // Center Roll
      schemaCreators.angle(category), // Center Yaw
      schemaCreators.angle(category), // Center Pitch
      schemaCreators.angle(category), // Right Roll
      schemaCreators.angle(category), // Right Yaw
      schemaCreators.angle(category), // Right Pitch
    ]),
};

export const formSchema = z.object({
  ship_name: schemaCreators.string(CATEGORIES.SHIP_INFORMATION, "ship_name"),
  ship_type: schemaCreators.shipType(),
  call_sign: schemaCreators.string(CATEGORIES.SHIP_INFORMATION, "call_sign"),
  engine: schemaCreators.engineType(),
  length: schemaCreators.number(CATEGORIES.SHIP_INFORMATION, "length"),
  beam: schemaCreators.number(CATEGORIES.SHIP_INFORMATION, "beam"),
  draft: schemaCreators.number(CATEGORIES.SHIP_INFORMATION, "draft"),
  cam_fx: schemaCreators.cameraArray(CATEGORIES.CAM_FOCAL_LENGTH),
  cam_fy: schemaCreators.cameraArray(CATEGORIES.CAM_FOCAL_LENGTH),
  cam_px: schemaCreators.cameraArray(CATEGORIES.CAM_PRINCIPAL_LENGTH),
  cam_py: schemaCreators.cameraArray(CATEGORIES.CAM_PRINCIPAL_LENGTH),
  rpy: schemaCreators.rpyArray(CATEGORIES.ROLL_PITCH_YAW),
}) satisfies z.ZodType<FormDataType>;

export type FormSchema = z.infer<typeof formSchema>;
