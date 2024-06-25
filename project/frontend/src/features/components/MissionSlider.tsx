import Slider from 'react-slick';
import Mission from './Mission';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type Props = {

};

const missions = [
  { title: '田中花子', description: '登山するときになにか装備面で困っていることはありますか？', daysLeft: 3 },
  { title: '田中花子', description: '登山するときになにか装備面で困っていることはありますか？', daysLeft: 3 },
  // 必要に応じて他のミッションを追加
];

export const MissionSlider: React.FC<Props> = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
  };

  return (
    <div style={{
        width: '75vw',
        margin: 'auto',
        marginTop: '2.5vw',
        marginBottom : "10vw",
    }}>
      <Slider {...settings}>
        {missions.map((mission, index) => (
          <div key={index}>
            <Mission {...mission} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MissionSlider;
