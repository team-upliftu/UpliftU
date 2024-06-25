import React from 'react';
import { useNavigate } from 'react-router-dom';
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

export const AddProjectStep3: React.FC<Props> = ({ setStep }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    setStep(2);
  };

  const handleNext = () => {
    setStep(1); // ステップを 1 に設定
    navigate('/');
  };

  return (
    <Container>
      <FormContainer>
        <TitleArea>何のプレゼント?</TitleArea>
        <TextField placeholder="例：誕生日プレゼント" variant="filled" InputProps={inputProps} fullWidth />
        <TitleArea>予算</TitleArea>
        <TextField placeholder="例：5,000円" variant="filled" InputProps={inputProps} fullWidth />
        <TitleArea>プレゼントを買う日</TitleArea>
        <TextField placeholder="例：2024年7月12日" variant="filled" InputProps={inputProps} fullWidth />
        <TitleArea>プレゼントを渡す日</TitleArea>
        <TextField placeholder="例：2024年8月12日" variant="filled" InputProps={inputProps} fullWidth />
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
          登録
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default AddProjectStep3;
