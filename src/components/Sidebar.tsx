import { ReactNode } from "react";
import IconClose from "./icons/iClose";
import IconAdd from "./icons/iAdd";
import { SidebarButton } from "./SidebarButton";
import IconTrash3 from "./icons/ITrash";
import IconGear from "./icons/iGear";
import IconLogout from "./icons/iLogout";

type Props = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  onClear: () => void;
  onNewChat: () => void;
};
export const Sidebar = ({
  open,
  children,
  onClose,
  onClear,
  onNewChat,
}: Props) => {
  return (
    <section
      className={`transition-all duration-200 fixed left-0 top-0 bottom-0 text-white ${
        open ? "w-screen bg-gray-600/75" : "w-0"
      } md:w-64 md:static`}
    >
      <div className={`flex h-screen ${open ? "ml-0" : "-ml-96"} md:ml-0`}>
        <div className="flex flex-col w-64 p-2 bg-gray-900">
          <div
            onClick={onNewChat}
            className="flex items-center p-3 rounded-md text-sm cursor-pointer border border-white/20 hover:bg-gray-500/20"
          >
            <IconAdd width={16} height={16} className="mr-3" />
            Nova conversa
          </div>
          <nav className="flex-1 pt-2 overflow-y-auto">{children}</nav>
          <div className="border-t border-gray-700 pt-2">
            <SidebarButton
              icon={<IconTrash3 width={16} height={16} />}
              label="Limpar conversas"
              onClick={onClear}
            />
            <SidebarButton
              icon={<IconGear width={16} height={16} />}
              label="Configuração"
              onClick={onClear}
            />
          </div>
          <div className="border-t border-gray-700 pt-2">
            <SidebarButton
              icon={<IconLogout width={16} height={16} />}
              label="Sair"
              onClick={onClear}
            />
          </div>
        </div>
        <div
          onClick={onClose}
          className="flex justify-center items-center w-10 h-10 cursor-pointer md:hidden"
        >
          <IconClose width={24} height={24} />
        </div>
      </div>
    </section>
  );
};
