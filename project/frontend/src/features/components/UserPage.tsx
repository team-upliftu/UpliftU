import { useNavigate } from 'react-router-dom';
import { ToUserProfile } from './ToUserProfile';
import { OngoingProjectBar } from './OngoingProjectBar';
import { styled } from '@mui/material/styles';
import { Button } from "@mui/material";
import MissionSlider from './MissionSlider';

const Base = styled('div')({
  backgroundColor: "#fff",
  width: '100vw',
  height: '100vh',
});

const Title = styled('div')({
  fontSize: '22.5px',
  fontWeight: 'bold',
  color: '#333333',
  paddingLeft: "5vw",
  paddingTop: "15vw",
});

const TodaysMission = styled('div')({
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#333333',
  paddingLeft: "5vw",
  marginTop: "5vw",
});

const OngoingProject = styled('div')({
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#333333',
  paddingLeft: "5vw",
  marginTop: "5vw",
  marginBottom: "2.5vw",
});

const OngoingProjectArea = styled('div')({
  width: "100vw",
});

export const UserPage: React.FC = () => {
  const navigate = useNavigate(); // useNavigate フックを使用

  const handleAddProjectClick = () => {
    navigate('/addproject'); // /addproject へ遷移
  };

  const projects = [
    { id: 1, name: '田中花子', progress: 50 },
    { id: 2, name: '佐藤太郎', progress: 75 },
    { id: 3, name: '鈴木次郎', progress: 30 },
  ];

  const username = "筒井";

  return (
    <Base>
      <ToUserProfile/>
      <Title>
        こんにちは、{username}さん！
      </Title>
      <TodaysMission>
        本日のミッション
      </TodaysMission>
      <MissionSlider />
      <OngoingProject>
        進行中のプロジェクト
      </OngoingProject>
      <OngoingProjectArea>
        {projects.map(project => (
          <OngoingProjectBar
            key={project.id}
            projectId={project.id}
            name={project.name}
            progress={project.progress}
          />
        ))}
      </OngoingProjectArea>
      <Button
        onClick={handleAddProjectClick} // ボタンにクリックイベントを追加
        sx={{
          position: 'fixed',
          right: '7.5vw',
          bottom: '7.5vw',
          backgroundColor: "#FD8A8A",
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#333',
          borderRadius: '20px',
          padding: '9px 30px',
        }}
      >
        New Project
      </Button>
    </Base>
  );
};

export default UserPage;
