import React from "react";

type Props = {
  children: React.ReactNode;
};

const BigText = ({ children }: Props) => {
  return <div className="text-big">{children}</div>;
};

export default BigText;
