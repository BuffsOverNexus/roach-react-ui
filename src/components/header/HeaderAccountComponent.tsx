import { discordUserAtom } from "@/utils/atoms";
import useDiscordAuth from "@/utils/discord";
import { formatDiscordUsername, getDiscordAvatarUrl } from "@/utils/discord";
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
              size="small"
              text
              severity="info"
              className="!text-xl"
              style={{ fontSize: '1.25rem' }}
            >
              <div className="flex items-center gap-2">
                <img 
                  src={getDiscordAvatarUrl(discordUser.id, discordUser.avatar, 32)} 
                  alt={`${discordUser.username}'s avatar`}
                  className="w-8 h-8 rounded-full"
                />
                <span>{formatDiscordUsername(discordUser).toUpperCase()}</span>
              </div>
            </Button>
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