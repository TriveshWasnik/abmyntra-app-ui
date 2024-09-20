import React from "react";
import Container from "./Container";

// Heading Component
function Heading({ text, className = "" }) {
  return (
    <Container>
      <p className={`w-full  ${className} text-[#3E3F45] font-bold `}>{text}</p>
    </Container>
  );
}

export default Heading;
