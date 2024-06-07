import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { useNavigate } from "react-router-dom";
import React from "react";
import { DRAWWIDTH } from "../constants";
import RecyclingOutlinedIcon from "@mui/icons-material/RecyclingOutlined";
import Signout from "../../features/auth/Signout";

interface SidebarProps {
  open: boolean;
}

// サイドバーに表示するリストアイテムの配列を定義
const SidebarListItems = [
  {
    text: "hoge",
    icon: <RecyclingOutlinedIcon />,
    to: "/hoge",
  },
];

// サイドバーを実装します。
const Sidebar: React.FC<SidebarProps> = (props) => {
  const navigate = useNavigate();

  // リストアイテムがクリックされたときの処理
  const handleItemClick = (to: string) => {
    navigate(to);
  };

  return (
    <Box>
      <CssBaseline />
      <Drawer
        sx={{
          width: DRAWWIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWWIDTH,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={props.open}
      >
        <Toolbar
          variant="regular"
          sx={{ fontSize: "22px", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          App
        </Toolbar>
        <Divider />
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <List>
              {SidebarListItems.map((item, index) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton onClick={() => handleItemClick(item.to)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
          </Box>
          <Signout />
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;