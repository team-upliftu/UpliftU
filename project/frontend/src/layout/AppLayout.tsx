import { Box } from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Main from "./components/Main";

import { useAuthContext } from "../features/auth/AuthContext";

// デザインを統一するためのコンポーネントを実装します。メイン、サイドバー、トップバーで構成されます。
const AppLayout: React.FC = () => {
  // サイドバーの開閉状態を管理するステート変数
  const [open, setOpen] = useState(true);
  // サイドバーの開閉状態を切り替える関数
  const handleDrawerOpenClose = () => {
    setOpen(!open);
  };
  const { user } = useAuthContext();

  return (
    <Box sx={{ display: "flex" }}>
      {/* aaa<br/>
      aaa<br/>
      aaa<br/>
      aaa<br/>
      aaa<br/>
      {user && (
          <div>
            <h2>User Information</h2>
            <p>Name: {user.first_name} {user.last_name}</p>
            <p>Email: {user.email}</p>
          </div>
        )} */}
      {/* <Sidebar open={open} />
      <Topbar open={open} handleOpenClose={handleDrawerOpenClose} /> */}
      <Main open={open}>
        {/* Outletコンポーネントを使用して、ルーティングされたコンポーネントを表示 */}
        <Outlet />
      </Main>
    </Box>
  );
};

export default AppLayout;