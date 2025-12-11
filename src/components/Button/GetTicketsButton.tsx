import React from "react";
import Button from "./Button";

type Props = {};

const GetTicketsButton = (props: Props) => {
  return (
    <Button
      noDescender
      href="https://touchpointsfu.eventbrite.ca/"
      target="_blank"
    >
      Get Tickets
    </Button>
  );
};

export default GetTicketsButton;
