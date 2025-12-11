import React from "react";

type Props = {
  children: React.ReactNode;
};

const ContentGroupLabel = ({ children }: Props) => {
  return <div className="font-script text-small">{children}</div>;
};

export default ContentGroupLabel;
