import React from "react";

type Props = {
  children: React.ReactNode;
  smallPadding?: boolean;
  noPadding?: boolean;
  mediumPadding?: boolean;
};

const ContentGroup = ({
  children,
  smallPadding,
  noPadding,
  mediumPadding,
}: Props) => {
  const padding = (() => {
    if (smallPadding) {
      return "mb-[.75em]";
    }
    if (mediumPadding) {
      return "mb-[1.2em]";
    }
    if (noPadding) {
      return "mb-0";
    }

    //default
    return "mb-[1em]";
  })();

  return <div className={padding}>{children}</div>;
};

export default ContentGroup;
