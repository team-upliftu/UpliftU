import { Box} from "@mui/material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Fab from '@mui/material/Fab';
import { styled } from '@mui/material/styles';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'; // CancelRoundedアイコンのインポート
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import QrCode2Rounded from '@mui/icons-material/QrCode2Rounded';
import Signout from "../../features/auth/Signout";
import { useAuthContext } from "../auth/AuthContext";
import { fetchAsyncLogoutUser } from "../auth/api";
import { useNavigate } from "react-router-dom";

type Props = {
  isOpen: boolean;
  onToggleUserProfile: () => void;
  onToggleFlowerGarden: () => void;
  profileImageUrl: string; 
};

const FabButton = styled(Fab)({
	position: 'fixed',
	right: 15,
	top: 15,
	disableRipple: true,
	zIndex: 10000,
  backgroundColor: 'transparent',
  width: '20px',
  height: '20px',
  elevation: 0,
});

const ProfileImage = styled('img')({
  width: '200px',
  height: '200px',
  borderRadius: '50%',
  position: 'absolute',
  left: '50%',
  top: '15%', // 上部に移動
  transform: 'translate(-50%, 0)', // 左右の中心に配置
  zIndex: 10,
});

const ProfileContainer = styled('div')({
  position: 'relative', // 子要素の絶対位置指定の基準に
  height: '100%',
  display: 'flex',
  flexDirection: 'column', // 垂直方向に並べる
  justifyContent: 'center', // 中央に配置
  alignItems: 'center', // 中央に配置
});

const RoundedListItem = styled(ListItem)({
  backgroundColor: 'white',
  borderRadius: '10px', // 角丸の半径を設定
  padding: '8px 16px', // 余白を設定
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // 影を設定
  backgroundcolor: 'transparent',
});


export const UserProfile = (props: Props) => {
  const { user } = useAuthContext();
 
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
        zIndex: 18000,
      }}
    >
      <ProfileContainer>
       <ProfileImage src={props.profileImageUrl} alt="Profile" /> {/* 画像のURLを渡す */}
       <List >
        <ListItem >
            <ListItemText primary={<>{user.user_name}</>} />
        </ListItem>
        <ListItem>
            <ListItemText primary={<>{user.id}</>} />
        </ListItem>
        <ListItem disablePadding>
            <ListItemButton >
              <ListItemText primary="Introduce Myself" />
            </ListItemButton>
          </ListItem>
          <RoundedListItem>
            <ListItemButton onClick={props.onToggleFlowerGarden}>
                <ListItemIcon>
                  <LocalFloristIcon />
                </ListItemIcon>
                <ListItemText primary="Go To お花畑" />
             </ListItemButton>
          </RoundedListItem>
          <RoundedListItem>
            <ListItemButton >
                <ListItemIcon>
                  <QrCode2Rounded />
                </ListItemIcon>
                <ListItemText primary="My QR" />
             </ListItemButton>
          </RoundedListItem>
       </List>
       </ProfileContainer>

      <FabButton
        onClick={props.onToggleUserProfile}>
        <CancelRoundedIcon sx={{ color: 'white' }} /> {/* アイコンの色を白に設定 */}
      </FabButton>
    </Box>
  );
}