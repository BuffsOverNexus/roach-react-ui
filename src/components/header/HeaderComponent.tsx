import { Menubar } from "primereact/menubar";
import type { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router-dom";
import HeaderNavBarStartComponent from "./HeaderNavBarStartComponent";
import HeaderAccountComponent from "./HeaderAccountComponent";

function HeaderComponent() {
    const navigate = useNavigate();
    const items: MenuItem[] = [
      {
        label: "Home",
        icon: "pi pi-home",
        command: () => {
          navigate("/");
        },
      },
      {
        label: "Setup",
        icon: "pi pi-info-circle",
        command: () => {
          navigate("/setup");
        },
      },
      {
        label: "My Discords",
        icon: "pi pi-discord",
        command: () => {
          navigate("/discords");
        },
      }
    ];
    return (
        <Menubar start={<HeaderNavBarStartComponent />} model={items} end={<HeaderAccountComponent />} />
    );
}

export default HeaderComponent;