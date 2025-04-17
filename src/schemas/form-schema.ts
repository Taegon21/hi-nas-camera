import { z } from "zod";
import { FormDataType, FormOption } from "@/types/form";
import { SHIP_OPTIONS, ENGINE_OPTIONS } from "@/constants/form-options";
import { ERROR_MESSAGES } from "@/constants/form-error-messages";

const createInvalidMessage = (fieldName: string): string =>
  `${ERROR_MESSAGES.INVALID} ${fieldName}`;

const createRadioErrorMessage = (options: FormOption<string>[]): string => {
  if (options.length === 0) return ERROR_MESSAGES.DEFAULT;
  if (options[0].label === undefined) return ERROR_MESSAGES.DEFAULT;
  return `${ERROR_MESSAGES.INVALID_LITERAL} "${options[0].label}"`;
};

const schemaCreators = {
  string: (fieldName: string) =>
    z
      .string({
        required_error: ERROR_MESSAGES.DEFAULT,
      })
      .min(1, createInvalidMessage(fieldName)),

  number: () =>
    z
      .number({
        required_error: ERROR_MESSAGES.DEFAULT,
        invalid_type_error: ERROR_MESSAGES.INVALID_NUMBER,
      })
      .positive(ERROR_MESSAGES.POSITIVE),

  angle: () =>
    z
      .number({
        required_error: ERROR_MESSAGES.DEFAULT,
        invalid_type_error: ERROR_MESSAGES.INVALID_NUMBER,
      })
      .min(-180, ERROR_MESSAGES.ANGLE_RANGE)
      .max(180, ERROR_MESSAGES.ANGLE_RANGE),

  radioType: <T extends string>(values: FormOption<T>[]) =>
    z.enum([...values.map((option) => option.value)] as [T, ...T[]], {
      errorMap: () => ({ message: createRadioErrorMessage(values) }),
    }),

  cameraArray: () =>
    z.tuple([
      schemaCreators.number(), // Left Camera
      schemaCreators.number(), // Center Camera
      schemaCreators.number(), // Right Camera
    ]),

  rpyArray: () =>
    z.tuple([
      schemaCreators.angle(), // Left Roll
      schemaCreators.angle(), // Left Yaw
      schemaCreators.angle(), // Left Pitch
      schemaCreators.angle(), // Center Roll
      schemaCreators.angle(), // Center Yaw
      schemaCreators.angle(), // Center Pitch
      schemaCreators.angle(), // Right Roll
      schemaCreators.angle(), // Right Yaw
      schemaCreators.angle(), // Right Pitch
    ]),
};

export const formSchema = z.object({
  ship_name: schemaCreators.string("ship name"),
  call_sign: schemaCreators.string("call sign"),
  ship_type: schemaCreators.radioType(SHIP_OPTIONS),
  length: schemaCreators.number(),
  beam: schemaCreators.number(),
  draft: schemaCreators.number(),
  engine: schemaCreators.radioType(ENGINE_OPTIONS),
  cam_fx: schemaCreators.cameraArray(),
  cam_fy: schemaCreators.cameraArray(),
  cam_px: schemaCreators.cameraArray(),
  cam_py: schemaCreators.cameraArray(),
  rpy: schemaCreators.rpyArray(),
}) satisfies z.ZodType<FormDataType>;

export type FormSchema = z.infer<typeof formSchema>;
