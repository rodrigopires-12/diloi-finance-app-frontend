import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

/**
 * Interface do componente Toast, utilizado para definir as características das mensagens de notificação para os usuários.
 *
 * @property {"success" | "error" | "warning" | "info"} type - Tipo de notificação, que determina a cor e o ícone exibidos.
 * @property {string} message - A mensagem que será exibida no componente.
 * @property {boolean} open - Indica se o toast está visível (`true`) ou oculto (`false`).
 * @property {"top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center"} position - A posição na tela onde o toast será exibido.
 */
interface ToastProps {
  type: "success" | "error" | "warning" | "info";
  message: string | React.ReactNode;
  open: boolean;
  position:
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center";
}
export type { ToastProps };

/**
 * O componente Toast é utilizado para exibir mensagens de notificação para os usuários, utilizando a biblioteca `react-toastify`.
 * @param ToastProps
 *
 * @returns
 * @category Component
 */
const Toast = ({ type, message, position, open }: ToastProps) => {
  const customId = "custom-id-yes";

  if (open) {
    return toast[type](message, {
      toastId: customId,
      position,
    });
  }

  return null;
};

export default Toast;
