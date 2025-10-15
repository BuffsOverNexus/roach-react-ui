import { Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import NotFound from "@pages/NotFound";
import Discords from "@/pages/Discords";
import Messages from "@/pages/Messages";
import Reactions from "@/pages/Reactions";
import Setup from "@/pages/Setup";
import LoginSuccess from "@/pages/LoginSuccess";
import Account from "@/pages/Account";
import IntegrateDiscord from "@/pages/IntegrateDiscord";

function PageRouter() {
    return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/discords" element={<Discords />} />
        <Route path="/messages/:discordId" element={<Messages />} />
        <Route path="/reactions/:messageId" element={<Reactions />} />
        <Route path="/login/success" element={<LoginSuccess />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/account" element={<Account />} />
        <Route path="/discords/integrate/:discordId" element={<IntegrateDiscord />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
    );
}

export default PageRouter;