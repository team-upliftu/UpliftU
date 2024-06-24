import { styled } from '@mui/material/styles';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type Props = {
  projectId: number;
  name: string;
  progress: number;
};

const Bar = styled('div')({
  display: 'flex',
  alignItems: 'center',
  width: "90vw",
  height: "17.5vw",
  backgroundColor: "#BFC1E2",
  borderRadius: "15px",
  margin: "auto",
  marginTop: "2.5vw",
  marginBottom: "2vw",
  cursor: 'pointer',
});

const ProgressContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '65%',
  marginLeft: '4vw',
});

const ProjectName = styled('div')({
  fontWeight: 'bold',
  fontSize: '13px',
});

const ProgressBar = styled('div')({
  width: '100%',
  height: '3.5vw',
  backgroundColor: '#eee',
  borderRadius: '10px',
  overflow: 'hidden',
  marginTop: '1vw',
});

const Progress = styled('div')<{ progress: number }>(({ progress }) => ({
  width: `${progress}%`,
  height: '100%',
  backgroundColor: '#797EC2',
  borderRadius: '10px 10px 10px 10px',
}));

export const OngoingProjectBar: React.FC<Props> = ({ projectId, name, progress }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/project/${projectId}`);
  };

  return (
    <Bar onClick={handleClick}>
      <Avatar sx={{
        bgcolor: '#333',
        width: '10vw',
        height: '10vw',
        marginLeft: '5vw',
      }} />
      <ProgressContainer>
        <ProjectName>{name}さんのプロジェクト</ProjectName>
        <ProgressBar>
          <Progress progress={progress} />
        </ProgressBar>
      </ProgressContainer>
      <ArrowForwardIosIcon sx={{
        fontSize: "small",
        color: '#333',
        marginLeft: '5vw',
      }}/>
    </Bar>
  );
};

export default OngoingProjectBar;