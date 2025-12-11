import React from "react";

interface Props {
  time: string;
  graduation: string;
  role: string;
  children: React.ReactNode;
}

export const TalkItem = ({ time, graduation, role, children }: Props) => {
  return (
    <div className="grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr_4fr] sm:gap-4 text-big px-4 sm:px-document-side mt-[.5em] border-b-[1px] border-black">
      <div className="text-tiny">
        <span className="font-script mr-2">Time</span>
        <span>{time}</span>
      </div>
      <div className="text-tiny">
        {graduation && (
          <>
            <span className="font-script mr-2">Grad</span>
            <span>{graduation}</span>
          </>
        )}
      </div>
      <div className="text-tiny">
        {role && (
          <>
            <span className="font-script mr-2">Role</span>
            <span>{role}</span>
          </>
        )}
      </div>
      <div className="pt-[.3em] sm:pt-0 sm:col-span-3 leading-[90%] tracking-tighter relative top-[.084em] -mt-[.084em]">
        {children}
      </div>
    </div>
  );
};
