import Fab from '@mui/material/Fab';
import Icon from '@mui/material/Icon';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'; 
import { styled } from '@mui/material/styles';

const FabButton = styled(Fab)({
	position: 'fixed',
	right: 15,
	top: 15,
	disableRipple: true,
	zIndex: 15000,
});

export const ToUserProfile: React.FC = () => {
	return (
	<FabButton
		sx={{
			backgroundColor: "transparent",
			'&:hover': {
				backgroundColor: "transparent",
			},
			'&:active': {
				backgroundColor: "transparent",
			},
		}}>
		<Icon sx= {{width: '100%', height: '100%'}}>
                <AccountCircleRoundedIcon sx= {{fontSize: 56}} /> {/* AccountCircleRoundedアイコンの表示 */}
        </Icon>
	</FabButton>
	);
};

export default ToUserProfile;