import { FormFieldType } from "@/common/types/uiFactory";
import { FieldValues, Path } from "react-hook-form";
import { v4 } from "uuid";

export const fieldGenerator = <T extends FieldValues>(label: string) => ({
  genTitleField: <K extends Path<T>>(): FormFieldType<T> => ({
    name: "title" as K,
    label: `${label} title *`,
    type: "text",
    required: true,
  }),

  genDescriptionField: <K extends Path<T>>(): FormFieldType<T> => ({
    name: "description" as K,
    label: `${label} description`,
    type: "text",
    required: false,
  }),

  genImagesField: <K extends Path<T>>(): FormFieldType<T> => ({
    name: "images" as K,
    label: `${label} images * (1-5)`,
    type: "file",
    required: true,
  }),

  genVideoField: <K extends Path<T>>(): FormFieldType<T> => ({
    name: "video" as K,
    label: `${label} video`,
    type: "file",
    required: false,
  }),
});

export class FieldGenerator<T extends FieldValues, K extends Path<T>> {
  constructor(private readonly prefixLabel: string) {}

  private genField(
    name: K,
    label: string,
    type: "file" | "text" | "number",
    required: boolean,
  ): FormFieldType<T> {
    return {
      name,
      label: `${this.prefixLabel} ${label} ${required ? "*" : ""}`,
      type,
      id: v4(),
    };
  }

  genTitle(): FormFieldType<T> {
    return this.genField("title" as K, "title", "text", true);
  }

  genDesc(): FormFieldType<T> {
    return this.genField("description" as K, "description", "text", false);
  }

  genImages(): FormFieldType<T> {
    return this.genField("images" as K, "images", "file", true);
  }

  genVideo(): FormFieldType<T> {
    return this.genField("video" as K, "video", "file", false);
  }
}
