import { useEffect, useRef, useState } from "react";
import IconSend from "./icons/iSend";

type Props = {
  disabled: boolean;
  onSend: (message: string) => void;
};

export const ChatMessageInput = ({ onSend, disabled }: Props) => {
  const [text, setText] = useState("");
  const textElement = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textElement.current) {
      textElement.current.style.height = "0px";
      let scrollHeight = textElement.current.scrollHeight;
      textElement.current.style.height = `${scrollHeight}px`;
    }
  }, [text, textElement]);

  const handleTextKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code.toLowerCase() === "enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (!disabled && text.trim() !== "") {
      onSend(text);
      setText("");
    }
  };

  return (
    <div
      className={`
        flex 
        border 
        border-gray-800/50 
        bg-gpt-lightgray 
        p-2 
        rounded-md
        ${disabled && "opacity-50"}
      `}
    >
      <textarea
        ref={textElement}
        className="
          flex-1 
          border-0 
          bg-transparent 
          resize-none 
          outline-none
          h-7
          max-h-48
          overflow-y-auto
        "
        placeholder="Digite uma mensagem"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyUp={handleTextKeyUp}
        disabled={disabled}
      ></textarea>
      <div
        onClick={handleSendMessage}
        className={`self-end p-1 rounded ${
          text.length
            ? "opacity-50 hover:bg-black/80 cursor-pointer"
            : "opacity-20"
        }`}
      >
        <IconSend width={16} height={16} />
      </div>
    </div>
  );
};
