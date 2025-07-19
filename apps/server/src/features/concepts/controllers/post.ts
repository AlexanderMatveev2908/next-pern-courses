import { handleUploadAssets } from "@src/lib/assetsHOF.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { postConceptSvc } from "../services/postConcept.js";
import { UserAnswer } from "@prisma/client";
import { ServerConceptFormType } from "../paperwork/postConept.js";
import { GenericReq } from "@src/types/fastify.js";
import { getInfoConceptSvc } from "../services/getInfoConcept.js";
import { checkQuizSvc } from "../services/checkQuiz.js";

export const postCourseCtrl = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  const { myFancyForm } = req;
  const { imageFiles, videoFile } = myFancyForm ?? {};
  const { params: { courseID } = {} } = req as {
    params: {
      courseID: string;
    };
  };

  const { imagesUploaded, videoUploaded } = await handleUploadAssets({
    imageFiles,
    videoFile,
    folder: "course",
  });

  const concept = await postConceptSvc({
    data: myFancyForm as ServerConceptFormType,
    imagesUploaded,
    videoUploaded,
    videoFile,
    courseID: courseID!,
  });

  return res.res201({
    msg: "Concept added",
    concept,
  });
};

export const checkQuizCtrl = async (req: FastifyRequest, res: FastifyReply) => {
  const {
    body: { quiz },
    params: { conceptID },
  } = req as GenericReq;

  const { concept } = await getInfoConceptSvc(conceptID);
  const { questions } = concept;

  const userAnswersArg: Partial<UserAnswer>[] = [];
  let score = 0;

  for (const inputQ of quiz) {
    const userAsw = inputQ.answerIDs[0];

    const parallelQuestionID = questions.find(
      (q) => q.id === inputQ.questionID,
    );
    const parallelVariantID = parallelQuestionID!.variants.find(
      (vrt) => vrt.id === userAsw,
    );

    if ([parallelQuestionID, parallelVariantID].filter(Boolean).length < 2)
      return res.err500({
        msg: "Error processing test",
      });

    userAnswersArg.push({
      questionID: parallelQuestionID!.id,
      variantID: parallelVariantID!.id,
      isCorrect: parallelVariantID!.isCorrect,
    });

    score += parallelVariantID!.isCorrect ? 1 : 0;
  }

  const fancyScore = +(
    (score / questions.length) *
    concept.pointsGained
  ).toFixed(2);

  const result = await checkQuizSvc({ concept, userAnswersArg, fancyScore });

  return res.res200({
    msg: "here u are your degree sir",
    result,
  });
};
