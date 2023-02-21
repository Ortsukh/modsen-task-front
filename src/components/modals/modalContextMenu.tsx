import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import styles from "./modalContextMenu.module.css";

type ModalProps = {
  left: string;
  top: string;
  id: string;
  closeContextMenu: () => void;
  colorChangeHandler: (color: "blue" | "pink" | "orange" | "yellow" | "green" | "violet") => void;
  removeNote:(id:string) => void
};

const ContextMenu = styled.div<{ left: string; top: string }>`
  display: flex;
  justify-content: space-between;
  width: 315px;
  height: 40px;
  left: ${(props) => props.left + "px"};
  top: ${(props) => props.top + "px"};
  position: absolute;
`;

const ModalContextMenu = ({
  left,
  top,
  id,
  closeContextMenu,
  colorChangeHandler,
  removeNote,
}: ModalProps) => {

  const root = useRef(document.createElement("div"));

  useEffect(() => {
    if (root.current) {
      const onClick = (e: any) =>
        root.current.contains(e.target) || closeContextMenu();
      document.addEventListener("click", onClick);
      return () => document.removeEventListener("click", onClick);
    }
  }, []);

  return (
    <div ref={root}>
      <ContextMenu left={left} top={top}>
        <div className={styles.color_button_containers}>
          <div
            className={`${styles.color_button} ${styles.pink}`}
            onClick={() => {
              colorChangeHandler("pink");
              closeContextMenu();
            }}
          ></div>
          <div
            className={`${styles.color_button} ${styles.blue}`}
            onClick={() => {
              colorChangeHandler("blue");
              closeContextMenu();
            }}
          ></div>
          <div
            className={`${styles.color_button} ${styles.yellow}`}
            onClick={() => {
              colorChangeHandler("yellow");
              closeContextMenu();
            }}
          ></div>
          <div
            className={`${styles.color_button} ${styles.green}`}
            onClick={() => {
              colorChangeHandler("green");
              closeContextMenu();
            }}
          ></div>
          <div
            className={`${styles.color_button} ${styles.violet}`}
            onClick={() => {
              colorChangeHandler("violet");
              closeContextMenu();
            }}
          ></div>
          <div
            className={`${styles.color_button} ${styles.orange}`}
            onClick={() => {
              colorChangeHandler("orange");
              closeContextMenu();
            }}
          ></div>
        </div>
        <div className={styles.removeButton} onClick={() => {
             removeNote(id);
            }}>Remove</div>
      </ContextMenu>
    </div>
  );
};

export default ModalContextMenu;
