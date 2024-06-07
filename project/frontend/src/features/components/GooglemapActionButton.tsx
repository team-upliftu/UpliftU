import Fab from '@mui/material/Fab';
import Icon from '@mui/material/Icon';
import { IoIosAddCircleOutline } from "react-icons/io";
import { styled } from '@mui/material/styles';

type Props = {
  SubmitFormOpen: boolean;
  onToggleSubmitForm: () => void;
  MapClick: boolean;
};

const FabButton = styled(Fab)({
  position: 'fixed',
  left: 20,
  bottom: 40,
});

export const GooglemapActionButton = (props: Props) => {
  return (
    <FabButton
    	color="primary"
		  onClick={props.onToggleSubmitForm}
		  disabled={props.SubmitFormOpen || props.MapClick}
      style={{verticalAlign: 'middle'}}
    >
	<IoIosAddCircleOutline size={55}/>
    </FabButton>
  );
};