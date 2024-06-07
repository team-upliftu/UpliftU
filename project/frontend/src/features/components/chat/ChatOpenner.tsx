import React from 'react'
import { Box } from '@mui/material'
//mui のチャットアイコンをインポート
import ChatIcon from '@mui/icons-material/Chat';

type Props = {
    onClick: () => void;
}

const ChatOpenner = (props : Props) => {
  return (
    <Box
      onClick={props.onClick}
      sx={{
        width: "15vw",
        height: "7.5vw",
        backgroundColor: "#F2CC8F",
        margin: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "10px",
        fontWeight: "bold",
        marginBottom: "10vh",
        marginLeft: "20vw",
        borderRadius: "10px"
      }}
      >
        <ChatIcon />
      </Box>
  )
}

export default ChatOpenner