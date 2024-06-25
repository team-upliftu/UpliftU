import { Box, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';

type Props = {
  step: number;
  setStep: (step: number) => void;
};

const Container = styled('div')({
  width: '80vw',
  margin: 'auto',
  textAlign: 'center',
});

const StepContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '2vw',
});

const Step = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Line = styled(Box)({
  height: '2px',
  width: '80%',
  backgroundColor: '#ddd',
  position: 'absolute',
  top: '27.5%',
  left: '10%',
  zIndex: 1,
});

const StepNumber = styled(Avatar)<{ active: boolean }>(({ active }) => ({
  backgroundColor: active ? '#FB5555' : '#ccc',
  color: active ? '#fff' : '#333',
  zIndex: 2,
  width: '7vw',
  height: '7vw',
  fontWeight: 'bold',
}));

const StepLabel = styled(Typography)({
  marginTop: '1vw',
  fontSize: '12px',
  color: '#333',
  fontWeight: 'bold',
});

export const AddProjectProgress: React.FC<Props> = ({ step, setStep }) => {
  return (
    <Container>
      <Typography sx={{
        marginBottom: '5vw',
        paddingTop: '10vw',
        fontWeight: 'bold',
        fontSize: '25px',
        color: '#333',
      }}>
        基本情報の入力
      </Typography>
      <Box sx={{ position: 'relative', width: '100%' }}>
        <Line />
        <StepContainer>
          <Step onClick={() => setStep(1)}>
            <StepNumber active={step === 1}>1</StepNumber>
            <StepLabel>送り相手の決定</StepLabel>
          </Step>
          <Step onClick={() => setStep(2)}>
            <StepNumber active={step === 2}>2</StepNumber>
            <StepLabel>送り相手の情報</StepLabel>
          </Step>
          <Step onClick={() => setStep(3)}>
            <StepNumber active={step === 3}>3</StepNumber>
            <StepLabel>プレゼントの情報</StepLabel>
          </Step>
        </StepContainer>
      </Box>
    </Container>
  );
};

export default AddProjectProgress;
