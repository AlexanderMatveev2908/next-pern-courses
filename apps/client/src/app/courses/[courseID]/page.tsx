import type { FC } from "react";

type PropsType = {
  params: Promise<{ courseID: string }>;
};

const CoursePage: FC<PropsType> = async ({ params }) => {
  const { courseID } = await params;

  return <div className="tc">{courseID}</div>;
};

export default CoursePage;
