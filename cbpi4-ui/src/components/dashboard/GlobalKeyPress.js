import { useState, useEffect } from "react";

export const isInputDOMNode = (e) => {
  const target = e?.target;
  return ["INPUT", "SELECT", "TEXTAREA", "BUTTON"].includes(target?.nodeName) || target?.hasAttribute("contenteditable");
};

const useKeyPress = (key) => {
  const [keyPressed, setKeyPressed] = useState(false);

  
  useEffect(() => {
    const downHandler = (e) => {
        console.log("KEY DOWN")
        
      if (!isInputDOMNode(e) && key === e.keyCode) {
        setKeyPressed(() => true);
      }
    };

    const upHandler = (e) => {
        console.log("KEY UP")
      if (!isInputDOMNode(e) && key === e.keyCode) {
        setKeyPressed(() => false);
      }
    };

    const resetHandler = () => setKeyPressed(false);

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    window.addEventListener("blur", resetHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
      window.removeEventListener("blur", resetHandler);
    };
  }, [setKeyPressed]);
  return keyPressed;
};

export default useKeyPress;
