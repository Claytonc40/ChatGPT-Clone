import { Chat } from "@/types/Chat";
import { useState } from "react";
import IconChatLeft from "./icons/iChat";
import IconTrash3 from "./icons/ITrash";
import IconEdit from "./icons/iEdite";
import IconClose from "./icons/iClose";
import IconCheck from "./icons/iCheck";

type Props = {
  chatItem: Chat;
  active: boolean;
  onClick: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
};
export const SidebarChatButton = ({
  chatItem,
  active,
  onClick,
  onDelete,
  onEdit,
}: Props) => {
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [titleInput, setTitleInput] = useState(chatItem.title);

  const handlerConfirmButton = () => {
    if (deleting) onDelete(chatItem.id);
    if (editing && titleInput.trim() !== "") {
      onEdit(chatItem.id, titleInput.trim());
    }
    setDeleting(false);
    setEditing(false);
  };
  const handlerCancelButton = () => {
    setDeleting(false);
    setEditing(false);
  };
  const handlerClickButton = () => {
    if (!deleting && !editing) {
      onClick(chatItem.id);
    }
  };

  return (
    <div
      onClick={handlerClickButton}
      className={`
        flex 
        items-center 
        rounded-md 
        p-3 
        text-sm 
        cursor-pointer
        hover:bg-gray-500/10
        ${active ? "bg-gray-500/10" : "bg-transparent"}
      `}
    >
      <div className="mr-3">
        {!deleting && <IconChatLeft width={16} height={16} />}
        {deleting && <IconTrash3 width={16} height={16} />}
      </div>

      <div className="flex-1 overflow-x-hidden">
        {editing && (
          <input
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            className="bg-transparent w-full text-sm outline-none border border-blue-500"
          />
        )}
        {!editing && (
          <div className="border border-transparent truncate">
            {!deleting && chatItem.title}
            {deleting && `Delete "${chatItem.title}"`}
          </div>
        )}
      </div>
      {active && !deleting && !editing && (
        <div className="flex">
          <div
            onClick={() => setEditing(true)}
            className="cursor-pointer mx-1 opacity-60 hover:opacity-100"
          >
            <IconEdit width={16} height={16} />
          </div>
          <div
            onClick={() => setDeleting(true)}
            className="cursor-pointer mx-1 opacity-60 hover:opacity-100"
          >
            <IconTrash3 width={16} height={16} />
          </div>
        </div>
      )}
      {(deleting || editing) && (
        <div className="flex">
          <div
            onClick={handlerConfirmButton}
            className="cursor-pointer mx-1 opacity-60 hover:opacity-100"
          >
            <IconCheck width={16} height={16} />
          </div>
          <div
            onClick={handlerCancelButton}
            className="cursor-pointer mx-1 opacity-60 hover:opacity-100"
          >
            <IconClose width={16} height={16} />
          </div>
        </div>
      )}
    </div>
  );
};
