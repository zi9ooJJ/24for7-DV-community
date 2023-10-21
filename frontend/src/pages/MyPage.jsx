import React from "react";
import UserInfo from "../components/pages/users/UserInfo";
import SuppoterInfo from "../components/pages/users/SuppoterInfo";

function MyPage() {
  const role = localStorage.getItem("role");

  return (
    <div>
      {role === "user" && <UserInfo />}
      {role !== "user" && <SuppoterInfo />}
    </div>
  );
}

export default MyPage;
