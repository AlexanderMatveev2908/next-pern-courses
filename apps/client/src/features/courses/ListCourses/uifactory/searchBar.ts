import { FormFieldArrayType } from "@/common/types/uiFactory";

export const txtInputsCourses: FormFieldArrayType[] = [
  {
    name: "title",
    label: "Title",
  },
  {
    name: "test",
    label: "Test",
  },
].map((el) => ({
  ...el,
  type: "text",
  field: "txtInputs",
  val: "",
  id: "",
}));
