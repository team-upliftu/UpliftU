import React from "react";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { fetchAsyncLogoutUser } from "./api";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";

// サインアウトを実装します。
const Signout: React.FC = () => {
  const navigate = useNavigate();
  const { signout } = useAuthContext();

  const handleLogout = async () => {
    await fetchAsyncLogoutUser();
    signout();
    navigate("/signin");
  };

  return (
    <List>
      <ListItem key="signout" disablePadding>
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Signout" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default Signout;