import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Avatar, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type Props = {
  setStep: (step: number) => void;
};

type Person = {
  name: string;
  number: number;
  bgcolor: string;
};

const Container = styled('div')({
  width: '100vw',
});

const Title = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  fontSize: '25px',
  fontWeight: 'bold',
  marginBottom: '5vw',
  marginTop: '5vw',
  color: '#333',
  paddingLeft: '5vw',
  paddingTop: '5vw',
});

const PersonList = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  width: '92vw',
  margin: 'auto',
});

const PersonItem = styled(Box)(({ bgcolor }: { bgcolor: string }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '15px',
  minWidth: '43vw',
  maxWidth: '43vw',
  paddingTop: '2px',
  paddingBottom: '2px',
  margin: '1.5vw',
  cursor: 'pointer',
  backgroundColor: bgcolor,
}));

const PersonName = styled(Typography)({
  fontWeight: 'bold',
  marginLeft: '5vw',
  fontSize: '17px',
});

const PersonNumber = styled(Avatar)<{ bgcolor: string }>(({ bgcolor }) => ({
  backgroundColor: bgcolor,
  color: '#333',
  fontSize: '17.5px',
  fontWeight: 'bold',
}));

export const AddProjectStep1: React.FC<Props> = ({ setStep }) => {
  const persons: Person[] = [
    { name: '筒井 智哉', number: 3, bgcolor: '#F28B82' },
    { name: '筒井 智哉', number: 3, bgcolor: '#AED581' },
    { name: '筒井 智哉', number: 3, bgcolor: '#81D4FA' },
    { name: '筒井 智哉', number: 3, bgcolor: '#FFEB3B' },
    { name: '筒井 智哉', number: 3, bgcolor: '#FF8A65' },
    { name: '筒井 智哉', number: 3, bgcolor: '#A1887F' },
    { name: '筒井 智哉', number: 3, bgcolor: '#64B5F6' },
    { name: '筒井 智哉', number: 3, bgcolor: '#4DB6AC' },
    { name: '筒井 智哉', number: 3, bgcolor: '#BA68C8' },
  ];

  const handleItemClickTo2 = () => {
    setStep(2); // ステップを2に変更
  };

  const handleItemClickTo3 = () => {
    setStep(3); // ステップを3に変更
  };

  return (
    <Container>
      <Title>
        New Person
        <IconButton 
          sx={{
            marginLeft: '3vw',
            width: '7.5vw',
            height: '7.5vw',
            backgroundColor: '#ddd'
          }}
          onClick={handleItemClickTo2} // クリックイベントハンドラを追加
        >
          <AddIcon sx={{ color:'#000' }} />
        </IconButton>
      </Title>
      <PersonList>
        {persons.map((person, index) => (
          <PersonItem key={index} bgcolor={person.bgcolor} onClick={handleItemClickTo3}>
            <PersonName>{person.name}</PersonName>
            <PersonNumber bgcolor={person.bgcolor}>{person.number}</PersonNumber>
          </PersonItem>
        ))}
      </PersonList>
    </Container>
  );
};

export default AddProjectStep1;
