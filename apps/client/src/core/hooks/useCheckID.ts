import { isIdOk } from "@shared/first/lib/validators.js";
import { useParams, useRouter } from "next/navigation";

type Params = {
  keyID: "courseID" | "conceptID";
};

export const useCheckID = ({
  keyID,
}: Params): { id: string; isValid: boolean } => {
  const id = useParams()?.[keyID];

  const nav = useRouter();
  const isValid = isIdOk(id as string);

  if (!isValid) nav.replace("/404");

  return {
    id: id as string,
    isValid,
  };
};
