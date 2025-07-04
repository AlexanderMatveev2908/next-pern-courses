/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsxImportSource @emotion/react */
"use client";

import BtnIcon from "@/common/components/buttons/BtnIcon/BtnIcon";
import FormFieldTxt from "@/common/components/forms/inputs/FormFieldTxt";
import { BtnActType } from "@/common/types/uiFactory";
import { css } from "@emotion/react";
import { CourseFormType } from "@shared/first/paperwork/courses/schema.post";
import { ClipboardPlus, Trash2 } from "lucide-react";
import type { FC } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { fieldTags, genTagField } from "../uiFactory";
import ErrFormField from "@/common/components/forms/errors/ErrFormField";
import Anchor from "@/common/components/forms/etc/Anchor";

const TagsForm: FC = () => {
  const {
    control,
    formState: { errors },
    register,
  } = useFormContext<CourseFormType>();

  const { append, fields, remove } = useFieldArray<CourseFormType, "tags">({
    control,
    name: "tags",
  });

  return (
    <div className="w-full max-w-full grid grid-cols-1 gap-4">
      <span className="txt__lg text-neutral-200">Tags (0-5)</span>

      <div className="w-full grid grid-cols-1 gap-3 relative">
        <ErrFormField
          {...({
            el: fieldTags,
            errors,
          } as any)}
        />
        <Anchor
          {...({
            el: fieldTags,
            register,
          } as any)}
        />

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 justify-items-center">
          {(fields ?? []).map((el, i) => (
            <div key={el.id} className="w-full flex  items-center gap-5">
              <FormFieldTxt
                {...({
                  control,
                  el: {
                    ...el,
                    name: `tags.${i}.val`,
                  },
                  showLabel: false,
                  errors,
                  index: i,
                } as any)}
              />

              <div className="w-[90px]">
                <BtnIcon
                  {...{
                    Svg: Trash2,
                    btnActType: BtnActType.ERROR,
                    isEnabled: true,
                    type: "button",
                    $svgCSS: {
                      css: css`
                        min-width: 30px;
                        min-height: 30px;
                      `,
                    },
                    handleClick: () => remove(i),
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="w-[250px] justify-self-center">
          <BtnIcon
            {...{
              Svg: ClipboardPlus,
              btnActType: BtnActType.SUCCESS,
              isEnabled: true,
              type: "button",
              label: "Add Tag",
              handleClick: () => append(genTagField()),
              $svgCSS: {
                css: css`
                  min-width: 30px;
                  min-height: 30px;
                `,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TagsForm;
