import { Box } from "@mui/material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";
import { styled } from '@mui/material/styles';
import LogoutIcon from "@mui/icons-material/Logout";
import Fab from '@mui/material/Fab';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import IosShare from '@mui/icons-material/IosShare';
import Signout from "../../features/auth/Signout";
import Yard from '@mui/icons-material/Yard';
import { useAuthContext } from "../auth/AuthContext";
import { fetchAsyncLogoutUser } from "../auth/api";
import { useNavigate } from "react-router-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onToggleFlowerGarden: () => void;
  onToggleUserProfile: () => void;
};

const ProfileContainer = styled('div')({
  position: 'relative', // 子要素の絶対位置指定の基準に
  height: '100%',
  display: 'flex',
  flexDirection: 'column', // 垂直方向に並べる
  justifyContent: 'center', // 中央に配置
  alignItems: 'center', // 中央に配置
});

export const UserInfo = (props: Props) => {
  const { user } = useAuthContext();

  const navigate = useNavigate();
  const { signout } = useAuthContext();

  const handleLogout = async () => {
    await fetchAsyncLogoutUser();
    signout();
    navigate("/signin");
  };

  if (!props.isOpen) {
    return null;
  }

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#FF7F7F",
        position: "fixed",
        zIndex: 10000,
        fontFamily: 'Helvetica', 
      }}
    >
      <ProfileContainer>
      <Fab sx={{ 
　　　 　　　　　width: '50px',
              height: '50px',
              minWidth: 120,
              minHeight: 120,
        			backgroundColor: user.color,
              '&:hover': {
                backgroundColor: user.color,
              },
              '&:active': {
                backgroundColor: user.color,
              },
              margin:2,
     }}>
      　<LocalFloristIcon
            sx={{
              fontSize: '100px', // アイコンのサイズを調整
              color: "#ffffff",
              position: 'absolute', // 絶対位置を指定
              top: '50%', // 上端から50%の位置
              left: '50%', // 左端から50%の位置
              transform: 'translate(-50%, -50%)', // 中央に配置するために移動
            }}
          />
      </Fab>
        <List>
          <ListItem>
          <ListItemText 
              primary={
                <Typography sx={{ fontSize: '28px', fontWeight: 'bold', textAlign: 'center' }}>
                  {user.user_name}
                </Typography>
              } 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
               primary={<Typography sx={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>
              My color : {user.color}
              </Typography>
            } 
            />
          </ListItem>
          <ListItem
            disablePadding
            sx={{ 
              borderBottom:2,
              borderColor:"#dbe9f4",
              textAlign: 'center',
            }}>
            <ListItemButton onClick={props.onToggleFlowerGarden}>
                <ListItemIcon>
                  <Yard/>
                </ListItemIcon>
                <ListItemText primary="Go To お花畑" sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
          <ListItem key="signout" disablePadding>
            <ListItemButton onClick={handleLogout}
            sx={{ justifyContent: 'center' }}
            >
              <ListItemIcon>
                <Signout/>
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
       </ProfileContainer>
    </Box>
  );
};
