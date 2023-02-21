import React from "react";
import styled from "styled-components";

type ModalProps = {
  left: number;
  top: number;
};

const ModalHelperDiv = styled.div<{ left: number; top: number }>`
  width: 224px;
  height: 29px;
  left: ${(props) => props.left + 15 + "px"};
  top: ${(props) => props.top + 30 + "px"};
  position: absolute;
  background: rgba(1, 1, 1, 0.75);
  border-radius: 1px 8px 2px;

  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #fefefe;
  text-align: center;
`;

const ModalHelper = ({ left, top }: ModalProps) => {
  return (
    <div>
      <ModalHelperDiv left={left} top={top}>
        Right click to open settings
      </ModalHelperDiv>
    </div>
  );
};

export default ModalHelper;
