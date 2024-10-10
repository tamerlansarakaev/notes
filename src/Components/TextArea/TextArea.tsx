import { TextareaAutosize } from "@mui/material";
import { useState } from "react";
import TextAreaContextMenu from "../TextAreaContextMenu/TextAreaContextMenu";
import { detectMob, textToSpeech } from "../../utils/utils";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import textAreaClassNames from "./TextArea.module.scss";

interface ITextAreaProps {
  handleWrite?: (value: string) => void;
  value: string;
  onBlur?: () => void;
  name?: string;
  maxLength?: number;
  placeholder?: string;
  isSpeechText?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const TextArea: React.FC<ITextAreaProps> = ({
  handleWrite,
  value,
  className,
  style,
  onBlur,
  isSpeechText,
  name,
  placeholder,
  maxLength,
}) => {
  const [textAreaContextActive, setTextAreaContextActive] = useState(false);
  const [textAreaClickPosition, setTextAreaClickPosition] = useState({
    top: 0,
    left: 0,
  });

  const handleSpeechText = () => {
    textToSpeech({ text: value });
  };

  const isMobile = detectMob();

  const handleContextMenu = (
    e: React.MouseEvent<HTMLTextAreaElement, MouseEvent>
  ) => {
    if (isMobile) return;

    setTextAreaClickPosition({
      top: e?.clientY,
      left: e?.clientX,
    });

    e.preventDefault();
    setTextAreaContextActive(!textAreaContextActive);
  };

  return (
    <div className={textAreaClassNames.container}>
      {isSpeechText && (
        <button
          onClick={handleSpeechText}
          className={textAreaClassNames.speechText}
        >
          <GraphicEqIcon style={{ color: "white" }} />
        </button>
      )}
      <TextareaAutosize
        onContextMenu={handleContextMenu}
        onBlur={onBlur}
        className={className}
        style={style}
        name={name}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={(e) => handleWrite?.(e.target.value)}
      />
      {!isMobile && (
        <TextAreaContextMenu
          handleClickOutside={() => setTextAreaContextActive(false)}
          handleSpeechText={handleSpeechText}
          isActive={textAreaContextActive}
          left={textAreaClickPosition.left}
          top={textAreaClickPosition.top}
        />
      )}
    </div>
  );
};

export default TextArea;
