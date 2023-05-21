import { ReactNode } from "react";
import IconMenu from "./icons/iMenu";
import IconAdd from "./icons/iAdd";

type Props = {
  open: Boolean;
  title: string;
  onOpen: () => void;
  onNewChat: () => void;
};

export const Header = ({ onOpen, onNewChat, title, open }: Props) => {
  return (
    <header
      className="flex justify-between items-center w-full border-b border-gray-600 
    p-2 md:hidden"
    >
      <div
        onClick={onOpen}
        className={`cursor-pointer ${open ? "" : "opacity-60"}`}
      >
        <IconMenu width={24} height={24} />
      </div>
      <div className="mx-2">{title}</div>
      <div onClick={onNewChat} className="cursor-pointer opacity-60">
        <IconAdd width={24} height={24} />
      </div>
    </header>
  );
};
