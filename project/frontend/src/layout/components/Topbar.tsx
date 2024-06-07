import React from "react";
import { Box, IconButton, Toolbar } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { DRAWWIDTH } from "../constants";

// TopbarPropsインターフェースを定義
interface TopbarProps {
  open: boolean;    // open: サイドバーの開閉状態を表すブール値
  handleOpenClose: () => void;    // handleOpenClose: サイドバーの開閉を制御する関数
}

// トップバーを実装します。
const Topbar: React.FC<TopbarProps> = (props) => {
  return (
    // MuiAppBarコンポーネントを使用して、トップバーを表示しています。
    <MuiAppBar
      component={Box}
      sx={{
        // サイドバーが閉じているときは、トップバーは画面の上部に表示されます。
        transition: (theme) =>
          theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        // サイドバーが開いているときは、トップバーの幅が調整され、サイドバーの幅分だけ右側にずれます。
        ...(props.open && {
          width: `calc(100% - ${DRAWWIDTH})`,
          marginLeft: `${DRAWWIDTH}`,
          transition: (theme) =>
            theme.transitions.create(["margin", "width"], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
        }),
      }}
    >
      <Toolbar>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            {/* メニューアイコンボタンがクリックされると、handleOpenCloseプロパティで渡された関数が呼び出され、サイドバーの開閉状態が切り替わります。 */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={props.handleOpenClose}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default Topbar;