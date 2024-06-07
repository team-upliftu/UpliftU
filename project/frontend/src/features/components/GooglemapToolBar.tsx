import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

type Props = {
    MapClick: boolean;
    showWarning: boolean;
  };

  export const GooglemapToolBar = (props: Props) => {
    const renderContent = () => {
      if (props.MapClick) {
        return <p style={{ fontSize: '20px', textAlign: 'center' }}>集合場所を選択してください</p>;
      }
      if (props.showWarning) {
        return <p style={{ fontSize: '20px', textAlign: 'center' }}>全てのフィールドを入力してください</p>;
      }
      return null;
    };
    return ((props.MapClick || props.showWarning) && 
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
				position="fixed"
				sx={{ top: 0 }}
			>
        <Toolbar>
          <div>{renderContent()}</div>
        </Toolbar>
      </AppBar>
    </Box>
  )};