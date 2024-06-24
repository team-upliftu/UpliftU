import { styled } from '@mui/material/styles';
import { Box, Button, TextField } from '@mui/material';

type Props = {
  setStep: (step: number) => void;
};

const TitleArea = styled('div')({
  fontSize: '17.5px',
  fontWeight: 'bold',
  color: '#333333',
  paddingLeft: "5vw",
  marginTop: "4vw",
  marginBottom: "1vw",
});

const Container = styled('div')({
  width: '100vw',
  padding: '7.5vw',
  boxSizing: 'border-box',
  position: 'relative',
});

const inputProps = {
  style: {
    backgroundColor: '#eee',
    borderRadius: '10px',
    height: "11vw",
    paddingLeft: "1.5vw",
    paddingBottom: '3.5vw',
  },
  disableUnderline: true,
};

const FormContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const ButtonContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  position: 'fixed',
  bottom: '10vw',
  left: '10vw',
  right: '10vw',
});

export const AddProjectStep2: React.FC<Props> = ({ setStep }) => {
  const handleBack = () => {
    setStep(1);
  };

  const handleNext = () => {
    setStep(3);
  };

  return (
    <Container>
      <FormContainer>
        <TitleArea>名前</TitleArea>
        <TextField placeholder="例：田中　花子" variant="filled" InputProps={inputProps} fullWidth />
        <TitleArea>年齢</TitleArea>
        <TextField placeholder="例：18" variant="filled" InputProps={inputProps} fullWidth />
        <TitleArea>性別</TitleArea>
        <TextField placeholder="例：女" variant="filled" InputProps={inputProps} fullWidth />
        <TitleArea>趣味</TitleArea>
        <TextField placeholder="例：ランニング、登山、料理" variant="filled" InputProps={inputProps} fullWidth />
        <TitleArea>関係</TitleArea>
        <TextField placeholder="例：友人" variant="filled" InputProps={inputProps} fullWidth />
      </FormContainer>
      <ButtonContainer>
        <Button variant="contained" sx={{
          backgroundColor: '#A8D1D1',
          color: '#333',
          borderRadius: '25px',
          padding: '8px 35px',
          fontWeight: 'bold',
          fontSize: '17px',
        }} onClick={handleBack}>
          戻る
        </Button>
        <Button variant="contained" sx={{
          backgroundColor: '#FD8A8A',
          color: '#fff',
          borderRadius: '25px',
          padding: '8px 35px',
          fontWeight: 'bold',
          fontSize: '17px',
        }} onClick={handleNext}>
          次へ
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default AddProjectStep2;
