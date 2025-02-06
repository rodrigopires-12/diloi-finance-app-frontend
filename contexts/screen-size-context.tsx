import React, { createContext, useContext, useEffect, useState } from "react";

//Interface de Props para o tipo do contexto
interface ScreenContextType {
  isSmallScreen: boolean;
}

// Cria o contexto
const ScreenContext = createContext<ScreenContextType | undefined>(undefined);

// Provedor do contexto
export const ScreenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  // Função que manipula o evento de redimensionamento da janela
  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 768);
  };

  // Efeito que é executado na montagem do componente e escuta eventos de redimensionamento da janela
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ScreenContext.Provider value={{ isSmallScreen }}>
      {children}
    </ScreenContext.Provider>
  );
};

// Hook para usar o contexto
export const useScreen = (): ScreenContextType => {
  const context = useContext(ScreenContext);
  if (!context) {
    throw new Error("useScreen must be used within a ScreenProvider");
  }
  return context;
};
