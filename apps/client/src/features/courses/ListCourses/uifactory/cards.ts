import { v4 } from "uuid";
import { CourseType } from "../../types/courses";

export const genRowsInfo = (course: CourseType) =>
  [
    {
      label: "Difficulty",
      val: course.grade,
    },
    {
      label: "Stack",
      val: course.stack,
    },
    {
      label: "Tech",
      val: course.tech,
    },
  ].map((el) => ({ ...el, id: v4() }));
