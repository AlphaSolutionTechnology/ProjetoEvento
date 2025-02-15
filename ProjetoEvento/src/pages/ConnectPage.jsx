// path src/pages/ConnectPage.jsx

import React from "react";
import ProfileComponent2 from "../components/profile/ProfileComponent_b";

function ConnectPage() {
  return (
    <div className="flex flex-col items-center p-5">
      <div className="absolute w-72 h-72 bg-blue-400/30 rounded-full blur-3xl top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-purple-400/30 rounded-full blur-3xl bottom-10 right-10"></div>
      <ProfileComponent2/>
    </div>
  );
}
export default ConnectPage;
