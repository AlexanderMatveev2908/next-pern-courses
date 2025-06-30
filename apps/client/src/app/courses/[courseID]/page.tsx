import type { FC } from "react";

type PropsType = {
  params: Promise<{ courseID: string }>;
};

const page: FC<PropsType> = async ({ params }) => {
  const { courseID } = await params;

  console.log(courseID);

  return <div className="tc">{courseID}</div>;
};

export default page;
