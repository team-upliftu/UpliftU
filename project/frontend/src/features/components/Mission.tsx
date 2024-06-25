import React, { useState } from 'react';
import AnswerForm from './AnswerForm';
import { Avatar, Box, Button, Typography, Paper } from '@mui/material';

type Props = {
  title: string;
  description: string;
  daysLeft: number;
};

export const Mission: React.FC<Props> = ({ title, description, daysLeft }) => {
  const [showAnswerForm, setShowAnswerForm] = useState(false);

  const handleOpenAnswerForm = () => {
    setShowAnswerForm(true);
  };

  const handleCloseAnswerForm = () => {
    setShowAnswerForm(false);
  };

  return (
    <>
      <Paper sx={{ padding: '3vw', borderRadius: '15px', backgroundColor: '#FD8A8A', minWidth: '50vw', margin: '0 10px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '2vw' }}>
          <Avatar sx={{ bgcolor: '#333', width: '10vw', height: '10vw', marginRight: '7.5px', marginLeft: '7.5px' }} />
          <Box>
            <Typography sx={{
              fontWeight: "bold",
              fontSize: '15px',
              padding: '0px 7.5px',
              lineHeight: '17.5px',
              color: '#333',
            }}>
              {title}さん<br/>のプロジェクト
            </Typography>
          </Box>
        </Box>
        <Typography sx={{
          fontSize: '15px',
          padding: '0px 10px',
          color: '#333',
        }}>
          {description}
        </Typography>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '2vw',
          backgroundColor: '#333',
          color: '#fff',
          borderRadius: '20px',
          padding: '7.5px 30px',
        }}>
          <Typography sx={{
            fontWeight: 'bold',
            fontSize: '15px',
          }}>
            あと {daysLeft} 日
          </Typography>
          <Button variant="contained" sx={{
            backgroundColor: '#fff',
            color: '#333',
            borderRadius: '15px',
            fontSize: '12.5px',
            padding: '2.5px 20px',
            fontWeight: "bold",
          }}
            onClick={handleOpenAnswerForm}
          >
            回答を入力
          </Button>
        </Box>
      </Paper>
      {showAnswerForm && <AnswerForm description={description} onClose={handleCloseAnswerForm} />}
    </>
  );
};

export default Mission;
