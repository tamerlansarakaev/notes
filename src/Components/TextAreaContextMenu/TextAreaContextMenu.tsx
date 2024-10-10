import textAreaClassNames from "./style.module.scss";

interface ITextAreaContextMenuProps {
  isActive: boolean;
  top: number;
  handleClickOutside: () => void;
  left: number;
  handleSpeechText?: () => void;
}

const TextAreaContextMenu: React.FC<ITextAreaContextMenuProps> = ({
  top,
  left,
  isActive,
  handleSpeechText,
  handleClickOutside,
}) => {
  const handleCopyClick = async () => {
    try {
      await copyText();
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      onMouseLeave={handleClickOutside}
      style={{ top: `${top - 10}px`, left: `${left - 10}px` }}
      className={`${textAreaClassNames.modal} ${
        isActive && textAreaClassNames.active
      }`}
    >
      <ul className={textAreaClassNames.elementContainer}>
        <li>
          <button onClick={handleCopyClick}>Copy</button>
        </li>
        {/* <li>
          <button>Past</button>
        </li> */}
        <li>
          <button onClick={handleSpeechText}>
            Play
          </button>
        </li>
      </ul>
    </div>
  );
};

async function copyText() {
  const textToCopy = window?.getSelection?.()?.toString();
  await navigator.clipboard.writeText(textToCopy || "");
}

export default TextAreaContextMenu;
