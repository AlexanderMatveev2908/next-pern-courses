/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsxImportSource @emotion/react */
"use client";

import FormFiledMiniCheck from "@/common/components/forms/inputs/FormFiledMiniCheck/FormFiledMiniCheck";
import { type FC } from "react";
import { css } from "@emotion/react";
import { FormConceptType } from "@shared/first/paperwork/concepts/schema.post.js";
import FormFieldTxt from "@/common/components/forms/inputs/FormFieldTxt";
import { useFormContext } from "react-hook-form";
import { FieldDataType } from "@/common/types/uiFactory";
import { resp } from "@/core/lib/style";
import WrapArrField from "@/common/components/forms/HOC/WrapArrField";

type PropsType = {
  el: FormConceptType["quiz"][number];
  outerIdx: number;
};

const VariantsQuiz: FC<PropsType> = ({ el, outerIdx }) => {
  const {
    control,
    formState: { errors },
    register,
    trigger,
  } = useFormContext();

  // const { append, remove } = useFieldArray({
  //   control,
  //   name: `${el.field}.${outerIdx}.variants`,
  // });

  // const fields = watch(
  //   `${el.field}.${outerIdx}.variants` as Path<FormConceptType>,
  // );

  // useEffect(() => {
  //   __cg("nested", fields);
  // }, [fields]);

  const syncCB = () => trigger(`${el.field}.${outerIdx}.variants`);

  return (
    <WrapArrField
      {...{
        el: {
          label: "Variants (5) *",
          name: `${el.field}.${outerIdx}.variants`,
        },
        errors,
        register,
        manualErr:
          (errors as any)?.quiz?.[outerIdx]?.variants?.root?.message ??
          (errors as any)?.quiz?.[outerIdx]?.variants?.message,
      }}
    >
      <div className="w-full grid grid-cols-1 gap-6">
        <div
          className="w-full"
          css={css`
            display: grid;
            grid-template-columns: 1fr;
            row-gap: 1.5rem;
            column-gap: 2.5rem;

            ${resp("md")} {
              grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            }
          `}
        >
          {el.variants.map((opt, varIdx) => (
            <div
              key={opt.id}
              className="w-full gap-3 relative"
              css={css`
                display: grid;
                place-items: end;
                grid-template-columns: 50px 1fr;
              `}
            >
              {/* <BtnTrash
                {...{
                  handleClick: remove.bind(null, varIdx),
                }}
              /> */}

              <div className="w-full max-w-full h-fit self-end">
                <FormFiledMiniCheck
                  {...{
                    el: {
                      ...opt.isCorrect,
                      name: `${el.field}.${outerIdx}.${opt.field}.${varIdx}.${opt.isCorrect.name}.val`,
                    },
                    showLabel: false,
                    cb: syncCB,
                  }}
                />
              </div>

              <FormFieldTxt
                {...{
                  control,
                  errors,
                  showLabel: false,
                  manualErr: (errors as any)?.[el.field]?.[outerIdx]?.[
                    opt.field
                  ]?.[varIdx]?.[opt.answer.name]?.val?.message,
                  cb: syncCB,
                  el: {
                    ...opt.answer,
                    name: `${el.field}.${outerIdx}.${opt.field}.${varIdx}.${opt.answer.name}.val`,
                    type: opt.answer.type as Exclude<FieldDataType, "file">,
                  },
                }}
              />
            </div>
          ))}
        </div>

        {/* <div className="max-w-[275px]">
          <BtnShadow
            {...{
              btnActType: BtnActType.SUCCESS,
              isEnabled: true,
              label: "Add answer",
              type: "button",
              Svg: MdFormatListBulletedAdd,
              handleClick: () => append(grabAnswerShape(fields.length)),
            }}
          />
        </div> */}
      </div>
    </WrapArrField>
  );
};

export default VariantsQuiz;
