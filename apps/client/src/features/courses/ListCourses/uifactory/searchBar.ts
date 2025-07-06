import { FormFieldArrayType } from "@/common/types/uiFactory";
import { v4 } from "uuid";

export const txtInputsCourses: FormFieldArrayType[] = [
  {
    name: "title",
    label: "Title",
  },
  {
    name: "test",
    label: "Test",
  },
  {
    name: "test2",
    label: "Test2",
  },
  {
    name: "test3",
    label: "Test4",
  },
].map((el) => ({
  ...el,
  type: "text",
  field: "txtInputs",
  val: "",
  id: v4(),
}));
