import React from 'react'
import { Box } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';

type Props = {
    onClick: () => void;
}

const ChatExitButton = (props: Props) => {
  return (
    <Box
      onClick={props.onClick}
      sx={{
        width: "15vw",
        height: "5vh",
        backgroundColor: "#F2CC8F",
        margin: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "15px",
        fontWeight: "bold",
        marginBottom: "1vh",
        marginRight: "20vw",
        borderRadius: "10px"
      }}
      >
        <LogoutIcon />
    </Box>
  )
}

export default ChatExitButton