import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { ToUserProfile } from './ToUserProfile';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Avatar, Box, Button, Typography, Paper } from '@mui/material';
import AnswerForm from './AnswerForm';
import { useNavigate } from 'react-router-dom';

const Base = styled('div')({
  width: "100vw",
  minHeight: "100vh",
  backgroundColor: '#fff',
});

const Title = styled('div')({
  paddingTop: '20vw',
  marginLeft: '5vw',
  fontSize: "22.5px",
  fontWeight: "bold"
});

const ProfileContainer = styled(Paper)({
  paddingTop: '10px',
  borderRadius: '15px',
  backgroundColor: '#fff',
  margin: '20px',
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
});

const InfoBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '40vw',
});

const Tag = styled(Box)<{ bgcolor: string }>(({ bgcolor }) => ({
  backgroundColor: bgcolor || '#e0e0e0',
  color: '#333',
  borderRadius: '15px',
  padding: '5px 15px',
  display: 'inline-block',
  marginRight: '10px',
  fontWeight: 'bold',
  fontSize: '12.5px',
}));

const ProjectInfo = styled(Box)({
  margin: '7.5vw',
});

const InfoPaper = styled(Paper)({
  borderRadius: '15px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#fff',
  marginBottom: '20px',
});

const InfoRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: '10px',
});

const QuestionLog = styled('div')({
  padding: '7.5vw',
});

const QuestionBox = styled('div')({
  backgroundColor: '#ddd',
  padding: '7.5px 15px',
  borderRadius: '0px 20px 20px 20px',
  marginBottom: '10px',
  width: '50vw',
  fontSize: '15px',
});

const AnswerBox = styled('div')({
  backgroundColor: '#95D2B3',
  padding: '7.5px 15px',
  borderRadius: '20px 20px 0px 20px',
  marginBottom: '10px',
  fontSize: '15px',
  width: '50vw',
  marginLeft: '35vw',
});

export const ProjectPage: React.FC = () => {
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const navigate = useNavigate();

  const handleOpenAnswerForm = () => {
    setShowAnswerForm(true);
  };

  const handleCloseAnswerForm = () => {
    setShowAnswerForm(false);
  };

  const handleNavigateHome = () => {
    navigate('/');
  };

  const recipientName_first = '田中';
  const recipientName_last = '花子';
  const description = '登山するときになにか装備面で困っていることはありますか？';
  const daysLeft = 3;
  const age = 23;
  const gender = '女性';
  const birthday = '12/14';
  const hobbies = ['ランニング', '登山', 'グルメ'];
  const relationship = ['友人'];
  const questionsLeft = 12;
  const daysUntilPurchase = 23;
  const purpose = '誕生日';
  const budget = '5,000';
  const purchaseDate = '2024/7/12';
  const giftDate = '2024/8/12';

  return (
    <Base>
      <ToUserProfile />
      <NavigateBeforeIcon sx={{
        fontSize: "large",
        color: '#333',
        position: 'fixed',
        left: '10vw',
        top: '7.5vw',
      }} onClick={handleNavigateHome}/>
      <Title>{recipientName_first}{recipientName_last}さんのプロジェクト</Title>
      <Paper sx={{ padding: '15px', borderRadius: '25px', backgroundColor: '#333', margin: '25px' }}>
        <Typography sx={{
          fontSize: '22.5px',
          color: '#fff',
          fontWeight: 'bold',
          marginLeft: '2vw',
        }}>
          本日のミッション
        </Typography>
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
              color: '#fff',
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
              color: '#fff',
            }}>
              {description}
            </Typography>
          </Box>
        </Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '2vw',
          backgroundColor: '#76ABAE',
          borderRadius: '20px',
          padding: '12.5px 30px',
        }}>
          <Typography sx={{
            fontWeight: 'bold',
            fontSize: '15px',
            color: '#333',
          }}>
            次の質問まで<br />あと {daysLeft} 日
          </Typography>
          <Button variant="contained" sx={{
            backgroundColor: '#eee',
            color: '#333',
            borderRadius: '15px',
            fontSize: '15px',
            padding: '2.5px 30px',
            fontWeight: "bold",
          }}
          onClick={handleOpenAnswerForm}>
            回答を入力
          </Button>
        </Box>
      </Paper>
      {showAnswerForm && <AnswerForm description={description} onClose={handleCloseAnswerForm} />}
      <ProfileContainer elevation={0}>
        <Avatar sx={{ width: '17.5vw', height: '17.5vw' }} />
        <InfoBox>
          <Typography sx={{ fontWeight: 'bold', fontSize: '17.5px' }}>{recipientName_first} {recipientName_last} さん</Typography>
          <Typography sx={{ fontWeight: 'bold', fontSize: '17.5px' }}>{age}歳, {gender}, 🎂 {birthday}</Typography>
        </InfoBox>
      </ProfileContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <Typography sx={{
          fontWeight: 'bold',
          marginLeft: '7.5vw',
          fontSize: '17.5px',
          width: '20vw',
        }}>趣味</Typography>
        {hobbies.map((hobby, index) => (
        <Tag key={index} bgcolor="#E8F183">{hobby}</Tag>
      ))}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{
          fontWeight: 'bold',
          marginLeft: '7.5vw',
          fontSize: '17.5px',
          width: '20vw',
        }}>関係性</Typography>
        {relationship.map((person, index) => (
        <Tag key={index} bgcolor="#9EA1D4">{person}</Tag>
      ))}
      </Box>
      <ProjectInfo>
        <Typography sx={{ fontWeight: 'bold', fontSize: '22.5px', marginBottom: '20px' }}>プロジェクト情報</Typography>

        <InfoRow>
          <InfoPaper elevation={0} sx={{
            backgroundColor: '#A8D1D1',
            width: '40vw',
            marginRight: '20px',
          }}>
            <Typography sx={{
              fontSize: '12.5px',
              fontWeight: 'bold',
              textAlign: 'left',
              paddingTop: '15px',
              paddingLeft: '12.5px',
              color: '#333',
            }}>残り質問数</Typography>
            <Typography sx={{
              fontSize: '15px',
              textAlign: 'right',
              fontWeight: 'bold',
              paddingRight: '15px',
              color: '#333',
            }}>あと <span style={{ fontSize: '40px' }}>{questionsLeft}</span> 回</Typography>
          </InfoPaper>
          <InfoPaper elevation={0} sx={{
            backgroundColor: '#FD8A8A',
            width: '40vw',
          }}>
            <Typography sx={{
              fontSize: '12.5px',
              fontWeight: 'bold',
              textAlign: 'left',
              paddingTop: '15px',
              paddingLeft: '12.5px',
              color: '#333',
            }}>プレゼント購入まで</Typography>
            <Typography sx={{
              fontSize: '15px',
              textAlign: 'right',
              fontWeight: 'bold',
              paddingRight: '15px',
              color: '#333',
            }}>あと <span style={{ fontSize: '40px' }}>{daysUntilPurchase}</span> 日</Typography>
          </InfoPaper>
        </InfoRow>

        <InfoRow>
          <InfoBox>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Avatar sx={{
                width: '40px',
                height: '40px',
                backgroundColor: '#e0e0e0',
                marginRight: '10px'
              }} />
              <Box>
                <Typography sx={{ fontSize: '15px', fontWeight: 'bold', color: '#333' }}>目的</Typography>
                <Typography sx={{ fontSize: '17.5px', fontWeight: 'bold', color: '#333' }}>{purpose}</Typography>
              </Box>
            </Box>
          </InfoBox>
          <InfoBox>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Avatar sx={{ width: '40px', height: '40px', backgroundColor: '#e0e0e0', marginRight: '10px' }} />
              <Box>
                <Typography sx={{ fontSize: '15px', fontWeight: 'bold', color: '#333' }}>予算</Typography>
                <Typography sx={{ fontSize: '17.5px', fontWeight: 'bold', color: '#333' }}>{budget} 円</Typography>
              </Box>
            </Box>
          </InfoBox>
        </InfoRow>
        <InfoRow>
          <InfoBox>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Avatar sx={{ width: '40px', height: '40px', backgroundColor: '#e0e0e0', marginRight: '10px' }} />
              <Box>
                <Typography sx={{ fontSize: '15px', fontWeight: 'bold', color: '#333' }}>購入予定日</Typography>
                <Typography sx={{ fontSize: '17.5px', fontWeight: 'bold', color: '#333' }}>{purchaseDate}</Typography>
              </Box>
            </Box>
          </InfoBox>
          <InfoBox>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Avatar sx={{ width: '40px', height: '40px', backgroundColor: '#e0e0e0', marginRight: '10px' }} />
              <Box>
                <Typography sx={{ fontSize: '15px', fontWeight: 'bold', color: '#333' }}>渡す日</Typography>
                <Typography sx={{ fontSize: '17.5px', fontWeight: 'bold', color: '#333' }}>{giftDate}</Typography>
              </Box>
            </Box>
          </InfoBox>
        </InfoRow>
      </ProjectInfo>
      <QuestionLog>
        <Typography sx={{ fontWeight: 'bold', fontSize: '22.5px', marginBottom: '20px' }}>質問履歴</Typography>
        <QuestionBox>
          趣味はなんですか？
        </QuestionBox>
        <AnswerBox>
          登山とグルメです。
        </AnswerBox>
        <QuestionBox>
          登山するときになにか装備面で困っていることはありますか？
        </QuestionBox>
      </QuestionLog>
    </Base>
  );
};

export default ProjectPage;
