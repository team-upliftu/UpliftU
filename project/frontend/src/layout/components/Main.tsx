import { Box } from "@mui/material";
import React from "react";
import { DRAWWIDTH } from "../constants";

// MainPropsインターフェースを定義
interface MainProps {
  open: boolean;    // openプロパティ: ドロワーの開閉状態を表すブール値
  children: React.ReactNode;    // childrenプロパティ: メインコンテンツとして表示する子要素
}

// メインを実装します。
const Main: React.FC<MainProps> = (props) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        overflowX: "auto",
        height: "100vh",
        // ドロワーが閉じている場合は、marginLeftに負の値を設定して、メインコンテンツを左側に移動させます。
        // transition: (theme) =>
        //   theme.transitions.create("margin", {
        //     easing: theme.transitions.easing.sharp,
        //     duration: theme.transitions.duration.leavingScreen,
        //   }),
        // marginLeft: `-${DRAWWIDTH}`,    // DRAWWIDTHは、ドロワーの幅を表す定数で、別のファイルから読み込んでいます。
        // ドロワーが開いている場合は、marginLeftを0に設定して、メインコンテンツを元の位置に戻します。
        // ...(props.open && {
        //   transition: (theme) =>
        //     theme.transitions.create("margin", {
        //       easing: theme.transitions.easing.easeOut,
        //       duration: theme.transitions.duration.enteringScreen,
        //     }),
          // marginLeft: 0,
        // }),
      }}
    >
      {props.children}
    </Box>
  );
};

export default Main;