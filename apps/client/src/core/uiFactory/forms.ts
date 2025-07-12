import { FieldDataType, FormFieldType } from "@/common/types/uiFactory";
import { FieldValues, Path } from "react-hook-form";
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

  private genField(
    name: K,
    opt: { label?: string; type: FieldDataType; required: boolean },
  ): FormFieldType<T> {
    return {
      ...this.fillGenericKeys(name, {
        label: opt.label,
        type: opt.type,
        required: opt.required,
      }),
      name: name as K,
      label: `${this.prefixLabel} ${opt.label ?? name} ${opt.required ? "*" : ""}`,
    };
  }

  public genHardCode(
    name: K,
    opt: { label?: string; type: FieldDataType; required: boolean },
  ): FormFieldType<T> {
    return {
      ...this.fillGenericKeys(name, {
        label: opt.label,
        type: opt.type,
        required: opt.required,
      }),
      name: name as K,
    };
  }

  public genArrFieldTxt(
    name: string,
    opt: { label?: string; type: FieldDataType; required: boolean },
  ) {
    return {
      ...this.fillGenericKeys(name, {
        label: opt.label,
        type: opt.type,
        required: opt.required,
      }),
      val: "",
    };
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
    return this.genField("title" as K, { type: "text", required: true });
  }

  public genDesc(): FormFieldType<T> {
    return this.genField("description" as K, { type: "text", required: false });
  }

  public genImages(): FormFieldType<T> {
    return this.genField("images" as K, { type: "file", required: true });
  }

  public genVideo(): FormFieldType<T> {
    return this.genField("video" as K, { type: "file", required: false });
  }

  public genMark(): FormFieldType<T> {
    return this.genField("markdown" as K, { type: "file", required: true });
  }
}
