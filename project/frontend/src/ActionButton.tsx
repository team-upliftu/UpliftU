import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { styled } from '@mui/material/styles';

const FabButton = styled(Fab)({
  position: 'fixed',
  left: 15,
  bottom: 15,
});

export const ActionButton = () => {
  return (
    <FabButton color="secondary">
			<AddIcon fontSize="large"></AddIcon>
    </FabButton>
  );
};