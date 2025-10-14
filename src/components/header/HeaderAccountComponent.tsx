import { discordUserAtom } from "@/utils/atoms";
import useDiscordAuth from "@/utils/discord";
import { useAtom } from "jotai";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

function HeaderAccountComponent() {
    const navigate = useNavigate();
    const [discordUser] = useAtom(discordUserAtom);
    const discord = useDiscordAuth();
    return (
      <div>
        {discordUser ? (
            <Button
              onClick={() => navigate("/account")}
              label="My Account"
              size="small"
              icon="pi pi-user"
              text
            />
        ) : (
          <Button
            onClick={() => discord.login()}
            label="Login"
            size="small"
            severity="info"
            icon="pi pi-discord"
          />
        )}
      </div>
    );
}

export default HeaderAccountComponent;