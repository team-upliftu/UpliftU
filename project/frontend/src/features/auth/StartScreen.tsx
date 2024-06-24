import React from "react";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100vw',
  backgroundColor: '#ffffff',
});

const Title = styled('div')({
  position: 'absolute',
  top: '20vh',
  fontSize: '65px',
  fontWeight: 'bold',
  color: '#333333',
});

const ButtonBox = styled('div')({
  position: 'absolute',
  top: '60vh',
  width: '100vw',
  textAlign: 'center',
});

const Button = styled(Link)({
  display: 'inline-block',
  padding: '15px 30px',
  width: '60vw',
  textAlign: 'center',
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#333',
  borderRadius: '20px',
  textDecoration: 'none',
  transition: 'background-color 0.3s ease',
  '&.signin': {
    backgroundColor: '#FD8A8A',
    '&:hover': {
      backgroundColor: '#FD8A8A',
    },
  },
  '&.signup': {
    backgroundColor: '#A8D1D1',
    margin: '2vh',
    '&:hover': {
      backgroundColor: '#A8D1D1',
    },
  },
});

export const StartScreen: React.FC = () => {
  return (
    <Container>
      <Title>UpliftU</Title>
      <ButtonBox>
        <Button to="/signin" className="signin">
          ログイン
        </Button>
        <Button to="/signup" className="signup">
          アカウント作成
        </Button>
      </ButtonBox>
    </Container>
  );
};

export default StartScreen;