import { Box, ListItem } from "@mui/material";
import Fab from '@mui/material/Fab';
import { styled } from '@mui/material/styles';
import { ThreeTest } from './ThreeTest';

type Props = {
  isOpen: boolean;
  onToggleFlowerGarden: () => void;
};

const FabButton = styled(Fab)({
	position: 'fixed',
	right: 15,
	top: 15,
	disableRipple: true,
	zIndex: 10000,
});

export const FlowerGarden = (props: Props) => {
  if (!props.isOpen) {
    return null;
  }

  return (
    <Box
      sx={{
        width:"100vw",
        height:"100vh",
        // backgroundColor: "#8ecae6",
        position: "fixed",
        zIndex: 20000
      }}
    > 

      <FabButton
        sx={{
          backgroundColor: "#3D405B",
          '&:hover': {
            backgroundColor: "#3D405B",
          },
          '&:active': {
            backgroundColor: "#3D405B",
          },
        }}
        onClick={props.onToggleFlowerGarden}>
      </FabButton>
      <ThreeTest />
    </Box>
  );
};