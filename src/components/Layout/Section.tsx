import React, { MutableRefObject, useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  id?: string;
  noStyling?: boolean;
  separatorOnly?: boolean;
  noSeparator?: boolean;
};

const Section = ({
  children,
  id,
  noStyling,
  separatorOnly,
  noSeparator,
}: Props) => {
  const sectionRef = useRef() as MutableRefObject<HTMLElement>;

  if (noStyling)
    return (
      <section id={id} ref={sectionRef}>
        {children}
      </section>
    );

  if (noSeparator)
    return (
      <section
        id={id}
        className="pb-[1.5em] pt-[1.5em] px-4 md:px-document-side text-big"
      >
        {children}
      </section>
    );

  if (separatorOnly)
    return (
      <section
        ref={sectionRef}
        id={id}
        className="border-t border-black text-big"
      >
        {children}
      </section>
    );

  return (
    <section
      ref={sectionRef}
      id={id}
      className="pb-[1.5em] pt-[1.5em] px-4 md:px-document-side border-t border-black text-big"
    >
      {children}
    </section>
  );
};

export default Section;
