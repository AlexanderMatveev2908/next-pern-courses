/** @jsxImportSource @emotion/react */
"use client";

import type { FC } from "react";

type PropsType = {
  handleSave: () => void;
};

const ConceptForm: FC<PropsType> = ({ handleSave }) => {
  return <form onSubmit={handleSave} className=""></form>;
};

export default ConceptForm;
