export type FormFieldType = {
  name: string;
  label: string;
  type?: "text" | "file";
  required?: boolean;
  id?: string;
  place?: string;
};
