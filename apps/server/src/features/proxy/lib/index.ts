import { genRandomByMinMax, pickRandom } from "@src/dev_only/mock/utils.js";
import axios from "axios";

export const grabJsonDummyAssets = async () => {
  const { data: jsonData } = await axios.get(`https://picsum.photos/v2/list`, {
    params: {
      page: genRandomByMinMax(0, 10),
      limit: 10,
    },
  });

  const picked = Array.from(
    {
      length: 5,
    },
    () => pickRandom(jsonData),
  );

  return {
    picked,
  };
};
