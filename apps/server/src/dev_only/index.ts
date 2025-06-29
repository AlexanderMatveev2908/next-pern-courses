import { TestA } from "@prisma/client";
import db from "src/conf/db.js";

export const doStuff = async () => {
  const newTest = await db.testA.create({
    data: {
      count: 5,
      name: "john",
    },
  });

  console.log(newTest);
};

export const doStuffB = async () => {
  const res = await db.$transaction(async (trx) => {
    const testA: TestA | null = await db.testA.findFirst({
      where: {
        name: "john",
      },
    });

    const testB = await db.testB.create({
      data: {
        name: "jane",
        count: 2,
        testA_ID: testA!.id,
      },
    });
  });

  //   console.log(res);
};
