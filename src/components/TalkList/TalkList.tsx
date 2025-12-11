import React from "react";

interface Props {
  children?: React.ReactNode;
}

export const TalkList = ({ children }: Props) => {
  return <div>{children}</div>;
};
