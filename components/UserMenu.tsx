"use client";
// Importa bibliotecas externas
import { useRouter } from "next/navigation"; // Hook do Next.js para navegação
import { useContext, useState } from "react"; // Hooks do React
import { Drawer, Menu, MenuItem, Avatar } from "@mui/material"; // Componentes do Material UI
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link"; // Componente Link do Next.js para navegação entre páginas
// Importa funções e contextos internos
import { logout } from "@/utils/auth"; // Função para realizar logout
import { AuthContext } from "@/contexts/user-context"; // Contexto de autenticação
import { useScreen } from "@/contexts/screen-size-context"; //Contexto tamanho da tela

interface UserMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export type { UserMenuProps };

const UserMenu = ({ isOpen, setIsOpen }: UserMenuProps) => {
  // Hook para navegação
  const { push } = useRouter();
  // Hook para informações do usuário
  const { user } = useContext(AuthContext);
  // Hook para verificar tamanho da tela
  const { isSmallScreen } = useScreen();

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
    setIsOpen(true);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
    setIsOpen(false);
  };

  return !isSmallScreen ? (
    <>
      <div
        onClick={(e) => {
          handleOpenMenu(e);
        }}
      >
        <MenuIcon
          data-testid="UserIcon"
          sx={{
            fill: "white",
            fontSize: "32px",
            transition: "all 0.3s !important",
          }}
          className={`cursor-pointer p-1 rounded-lg ${
            isOpen
              ? "scale-[1.05] bg-[#645bfa]"
              : "hover:scale-[1.05] hover:bg-[#645bfa]"
          }`}
        />
      </div>
      <Menu
        id="user-menu"
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleCloseMenu}
      >
        <MenuItem
          sx={{
            pointerEvents: "none",
            fontWeight: "bold",
            fontSize: "16px",
            overflowWrap: "break-word",
            wordBreak: "break-word",
            whiteSpace: "normal",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#4F46E5",
              width: 30,
              height: 30,
              marginRight: "0.75rem",
              fontSize: "16px",
            }}
          >
            {user.name.charAt(0).toUpperCase()}
          </Avatar>
          {user.name}
        </MenuItem>
        <hr style={{ margin: "4px 16px 8px" }} />
        <MenuItem
          className="font-medium"
          onClick={() => {
            handleCloseMenu();
            push("/dashboard");
          }}
        >
          Dashboard
        </MenuItem>
        <MenuItem
          className="font-medium"
          onClick={() => {
            handleCloseMenu();
            push("/admin");
          }}
        >
          Painel Administrativo
        </MenuItem>
        <MenuItem
          onClick={() => {
            logout();
            push("/login");
            handleCloseMenu();
          }}
        >
          Sign Out
        </MenuItem>
      </Menu>
    </>
  ) : (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      sx={{
        width: "100vw", // Full viewport width
        height: "100vh", // Full viewport height
        "& .MuiDrawer-paper": {
          // Target the paper element
          width: "80vw", // Adjust as per your requirement
          height: "100vh", // Adjust as per your requirement
          maxWidth: "100%", // Prevent overflow
          maxHeight: "100%",
          borderRadius: "8px", // Optional, for rounded corners
          margin: "auto", // Center the drawer
        },
      }}
    >
      <aside
        id="side-menu"
        className={`p-4 w-full h-full flex flex-col justify-between bg-gray-700 gap-4`}
      >
        <div className="flex flex-col gap-8">
          <span className="font-semibold text-center text-white my-2">
            {user.name}
          </span>

          <Link
            href="/dashboard"
            className="flex flex-col w-full p-2 text-white hover:bg-gray-600 rounded-lg"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/earnings"
            className="flex flex-col w-full  p-2 text-white hover:bg-gray-600 rounded-lg"
            onClick={() => setIsOpen(false)}
          >
            Renda
          </Link>
          <Link
            href="/expenses"
            className="flex flex-col w-full p-2 text-white hover:bg-gray-600 rounded-lg"
            onClick={() => setIsOpen(false)}
          >
            Despesas
          </Link>
          <Link
            href="/simulations"
            className="flex flex-col w-full p-2 text-white hover:bg-gray-600 rounded-lg"
            onClick={() => setIsOpen(false)}
          >
            Simulações
          </Link>
        </div>
        <div
          id="sign-out-hover"
          className="flex flex-col w-full text-center p-2 mb-2 bg-gray-600 hover:bg-gray-500 rounded-lg"
          onClick={() => {
            logout();
            push("/login");
          }}
        >
          <span className="cursor-pointer text-white">Sign Out</span>
        </div>
      </aside>
    </Drawer>
  );
};

export default UserMenu;
