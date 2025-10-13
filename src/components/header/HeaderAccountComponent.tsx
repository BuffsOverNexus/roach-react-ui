import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

function HeaderAccountComponent() {
    const navigate = useNavigate();
    return (
      <div className="flex align-items-center gap-2 pr-2">
          <Button onClick={() => navigate("/login")} label="Login" size="small" severity="contrast" icon="pi pi-user" />
      </div>
    );
}

export default HeaderAccountComponent;