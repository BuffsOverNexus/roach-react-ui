import { discordUserAtom } from "@/utils/atoms";
import { useAtom } from "jotai";
import { Button } from "primereact/button";
import { useNavigate } from "react-router";

function Account() {
    const [discordUser, setDiscordUser] = useAtom(discordUserAtom);
    const router = useNavigate();

    // Make sure we do not render the page if user is not logged in.
    if (!discordUser) {
        router("/");
        return;
    }

    return (
      <div>
        <div className="flex flex-col justify-center items-center mb-4">
          <h1>{discordUser.username.toUpperCase()}</h1>
        </div>
        <div>
          <Button onClick={() => setDiscordUser(undefined)}>Logout</Button>
        </div>
      </div>
    );
}
export default Account;