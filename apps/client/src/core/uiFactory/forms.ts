import {
  FieldArrType,
  FieldDataType,
  FormFieldType,
} from "@/common/types/uiFactory";
import { ArrayPath, FieldValues, Path } from "react-hook-form";
import { v4 } from "uuid";

// export const fieldGenerator = <T extends FieldValues>(label: string) => ({
//   genTitleField: <K extends Path<T>>(): FormFieldType<T> => ({
//     name: "title" as K,
//     label: `${label} title *`,
//     type: "text",
//     required: true,
//   }),

//   genDescriptionField: <K extends Path<T>>(): FormFieldType<T> => ({
//     name: "description" as K,
//     label: `${label} description`,
//     type: "text",
//     required: false,
//   }),

//   genImagesField: <K extends Path<T>>(): FormFieldType<T> => ({
//     name: "images" as K,
//     label: `${label} images * (1-5)`,
//     type: "file",
//     required: true,
//   }),

//   genVideoField: <K extends Path<T>>(): FormFieldType<T> => ({
//     name: "video" as K,
//     label: `${label} video`,
//     type: "file",
//     required: false,
//   }),
// });

export class FieldGenerator<T extends FieldValues, K extends Path<T>> {
  constructor(private readonly prefixLabel: string) {}

  private fillGenericKeys(
    name: string,
    opt: { label?: string; type: FieldDataType; required: boolean },
  ) {
    return {
      id: v4(),
      name,
      label: `${opt.label ?? name} ${opt.required ? "*" : ""}`,
      type: opt.type,
      required: opt.required,
    };
  }

  public genHardCode(
    name: K,
    opt: {
      label?: string;
      type: FieldDataType;
      required: boolean;
      chainLabel?: boolean;
    },
  ): FormFieldType<T> {
    return {
      ...this.fillGenericKeys(name, {
        label: opt.label,
        type: opt.type,
        required: opt.required,
      }),
      label: `${opt.chainLabel ? this.prefixLabel : ""} ${opt.label ?? name} ${opt.required ? "*" : ""}`,
    } as FormFieldType<T>;
  }

  // ? only my array fields a val key, a normal field have already it included by default internally while RHF needs more management for custom array fields
  public genArrFieldTxt(
    name: ArrayPath<T>,
    opt: {
      field: K;
      label?: string;
      type: Exclude<FieldDataType, "file">;
      required: boolean;
    },
  ): FieldArrType<T, K> {
    return {
      ...this.fillGenericKeys(name, {
        label: opt.label,
        type: opt.type,
        required: opt.required,
      }),
      val: "",
      field: opt.field,
    } as FieldArrType<T, K>;
  }

  public genArrFieldBool(
    name: string,
    opt: {
      label?: string;
    },
  ) {
    return {
      name,
      label: opt.label ?? name,
      type: "",
      required: false,
      val: false,
    };
  }

  public genTitle(): FormFieldType<T> {
    return this.genHardCode("title" as K, {
      type: "text",
      required: true,
      chainLabel: true,
    });
  }

  public genDesc(): FormFieldType<T> {
    return this.genHardCode("description" as K, {
      type: "text",
      required: false,
      chainLabel: true,
    });
  }

  public genImages(): FormFieldType<T> {
    return this.genHardCode("images" as K, {
      type: "file",
      required: true,
      chainLabel: true,
    });
  }

  public genVideo(): FormFieldType<T> {
    return this.genHardCode("video" as K, {
      type: "file",
      required: false,
      chainLabel: true,
    });
  }

  public genMark(): FormFieldType<T> {
    return this.genHardCode("markdown" as K, {
      type: "file",
      required: true,
      chainLabel: true,
    });
  }
}
