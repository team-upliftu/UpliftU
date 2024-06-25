import React from 'react';
import { styled } from '@mui/material/styles';
import { createPortal } from 'react-dom';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';

type Props = {
  onClose: () => void;
  description: string;
};

const Overlay = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
});

const FormContainer = styled(Paper)({
  padding: '20px',
  borderRadius: '20px',
  width: '85vw',
  backgroundColor: '#E2E3F2',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const AnswerForm: React.FC<Props> = ({ onClose, description }) => {

  return createPortal(
    <Overlay onClick={onClose}>
      <FormContainer onClick={(e) => e.stopPropagation()}>
        <Box sx={{
          display: 'flex',
          alignItems: 'flex-start',
          marginBottom: '10px',
          marginTop: '10px',
        }}>
          <Box>
            <Typography sx={{
              fontWeight: "bold",
              fontSize: '17.5px',
              color: '#333',
              width: '15vw',
              marginLeft: '2vw',
              lineHeight: '25px',
            }}>
            質問
            </Typography>
          </Box>
          <Box>
            <Typography sx={{
              fontSize: '17.5px',
              lineHeight: '25px',
              color: '#333',
            }}>
            {description}
            </Typography>
          </Box>
        </Box>
        <Typography sx={{
          fontWeight: 'bold',
          marginBottom: '10px',
          textAlign: 'left',
          width: '100%',
          marginLeft: '4vw',
          fontSize: '17.5px',
        }}>回答を入力</Typography>
        <TextField
          variant="outlined"
          multiline
          rows={3}
          fullWidth
          sx={{
            marginBottom: '10px',
            backgroundColor: '#fff',
        }}
        />
        <Button 
          variant="contained" 
          sx={{
            backgroundColor: '#f28b82',
            color: '#fff',
            borderRadius: '20px',
            fontWeight: 'bold',
            fontSize: '17.5px',
            padding: '2.5px 30px',
          }}
          onClick={onClose}
        >
          送信
        </Button>
      </FormContainer>
    </Overlay>,
    document.body // レンダリング先をdocument.bodyに設定
  );
};

export default AnswerForm;