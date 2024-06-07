import React from "react";
import { Googlemap } from '../components/Googlemap';
import { GooglemapToolBar } from '../components/GooglemapToolBar';
import { GooglemapSubmitForm } from '../components/GooglemapSubmitForm';
import { GooglemapActionButton } from '../components/GooglemapActionButton';
import { UserButton } from '../components/UserButton';
import { FlowerGarden } from "../components/FlowerGarden";
import { UserProfile } from "../components/UserProfile";
import { UserInfo } from '../components/UserInfo';
import { StandbyForHost } from '../components/StandbyForHost';
import { useEffect, useState } from 'react';
import { useAuthContext } from "../auth/AuthContext"

// ログイン後にリダイレクトするための、ホームを実装します。ここでは特に何もしません。
const Home: React.FC = () => {
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const [isFlowerGardenOpen, setIsFlowerGardenOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);

  const [gatheringID, setgatheringID] = useState("");
  const [isHost, setIsHost] = useState(false);
  const [standby, setStandby] = useState(false);
  const [pins, setPins] = useState<Pin[]>([]);
  const [MapClick, setMapClick] = useState(false);
  const [genre, setGenre] = useState('');
  const [nump, setNump] = useState("");
  const [budget, setBudget] = useState('');
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [SubmitFormOpen, setSubmitFormOpen] = useState(false);
  const { user } = useAuthContext();

  const handleFlowerGardenInfo = () => {
    setIsFlowerGardenOpen(!isFlowerGardenOpen);
  };

  const handleUserProfileInfo = () => {
    setIsUserProfileOpen(!isUserProfileOpen);
  };

  const handleToggleUserInfo = () => {
    setIsUserInfoOpen(!isUserInfoOpen);
  };

  const handleCloseUserInfo = () => {
    setIsUserInfoOpen(false);
  };

  const handleToggleSubmitForm = () => {
    setSubmitFormOpen((SubmitFormOpen) => !SubmitFormOpen);
  };

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitle(e.target.value);
  };

  const handleGenreChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setGenre(e.target.value);
  };

  const handleNumpChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNump(e.target.value);
  };

  const handleBudgetChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBudget(e.target.value);
  };

  const handleBodyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBody(e.target.value);
  };

  const handleHourChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setHour(e.target.value);
  };

  const handleMinuteChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMinute(e.target.value);
  };

  const handleSetGatheringID = (id: string) => {
    setgatheringID(id);
  };

  function toDateTimeString(hourString: string, minuteString: string): string {
    const now = new Date();
    
    // 時と分を数値に変換
    const hours = parseInt(hourString, 10);
    const minutes = parseInt(minuteString, 10);
    
    // 現在時刻の時間と分を取得
    const nowHours = now.getHours();
    const nowMinutes = now.getMinutes();
    
    // 新しい日付を作成
    let targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);
    
    // 今から24時間以内かどうかを確認
    if (hours < nowHours || (hours === nowHours && minutes < nowMinutes)) {
        targetDate.setDate(targetDate.getDate() + 1);
    }
    
    // ISO 8601形式の文字列に変換
    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, '0'); // 月は0から始まるので+1する
    const day = String(targetDate.getDate()).padStart(2, '0');
    const targetHours = String(targetDate.getHours()).padStart(2, '0');
    const targetMinutes = String(targetDate.getMinutes()).padStart(2, '0');
    const seconds = '00';
    
    const dateTimeString = `${year}-${month}-${day}T${targetHours}:${targetMinutes}:${seconds}`;

    return dateTimeString;
  }

  const handleStandbyClose = () => {
    setStandby(!standby);
  };

  const handleisHost = () => {
    setIsHost(false);
    setStandby(!standby);
  };

  const [showWarning, setShowWarning] = useState(false);

  const nextformat = () => {
    if(!genre || !title || !nump || !budget || !hour || !minute || !body){
      setSubmitFormOpen((SubmitFormOpen) => !SubmitFormOpen);
      setShowWarning(true);
      setTimeout(() => {
        setShowWarning(false);
      }, 1000);
      return
    }
    setMapClick((MapClick) => (!MapClick))
    setSubmitFormOpen((SubmitFormOpen) => !SubmitFormOpen);
  };

  const getpin = () => {
    fetch("http://localhost:8000/gatherings/", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      setPins([]);
      for (let i = 0; i < data.length; i++) {
        const newPin: Pin = {
          title: data[i].title,
          genre: data[i].genre,
          budget: data[i].budget,
          nump: data[i].num_participant,
          time: data[i].start_time,
          body: data[i].body,
          latitude: String(data[i].pos_lat),
          longitude: String(data[i].pos_lng),
          id: data[i].id,
        };
        setPins((pins) => [newPin, ...pins]);
      }
      console.log(data);
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
    
  }

  const createMarker = (e: google.maps.MapMouseEvent) => {
    if (!MapClick){
      return;
    }
    const lat = e.latLng?.lat();
    const lng = e.latLng?.lng();
    if (!lat || !lng) {
      return;
    }
    const numValue = Number(nump);
    fetch("http://localhost:8000/gatherings/", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pos_lat: lat,
        pos_lng: lng,
        host: user.id,
        genre: genre,
        body: body,
        num_participant: numValue,
        start_time: toDateTimeString(hour, minute),
        budget: budget,
        title: title
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(`おしりりりり:${data.id}`);
      console.log(`おしりりりり:${user.id}`);
      setgatheringID(data.id);
    })
    .catch(error => console.error('Error:', error));
    setMapClick((MapClick) => (!MapClick))
    setGenre('');
    setTitle("");
    setNump("");
    setBudget("");
    setBody("");
    setHour("");
    setMinute("");

    setStandby(!standby);
    setIsHost(!isHost);
  };

  useEffect(() => {
    getpin();
  },[MapClick]);

  return(
    <>
      <StandbyForHost
        isOpen={standby}
        isHost={isHost}
        onClose={handleStandbyClose}
        gatheringID={gatheringID}
        userID={user.id}
      />
      <UserButton onToggleUserInfo={handleToggleUserInfo} />
      <UserInfo
        isOpen={isUserInfoOpen}
        onClose={handleCloseUserInfo}
        onToggleFlowerGarden={handleFlowerGardenInfo}
        onToggleUserProfile={handleUserProfileInfo}
      />
      <FlowerGarden
        isOpen={isFlowerGardenOpen}
        onToggleFlowerGarden={handleFlowerGardenInfo}
      />
      <GooglemapToolBar 
        MapClick={MapClick}
        showWarning={showWarning} 
      />
      <Googlemap 
        pins={pins}
        createMarker={createMarker}
        isOpen={standby}
        isHost={isHost}
        onClose={handleisHost}
        setGatheringID={handleSetGatheringID}
      />
      <GooglemapSubmitForm
        genre={genre}
        title={title}
        nump={nump}
        budget={budget}
        body={body}
        hour={hour}
        minute={minute}
        SubmitFormOpen={SubmitFormOpen}
        onGenreChange={handleGenreChange}
        onTitleChange={handleTitleChange}
        onBudgetChange={handleBudgetChange}
        onBodyChange={handleBodyChange}
        onNumpChange={handleNumpChange}
        onHourChange={handleHourChange}
        onMinuteChange={handleMinuteChange}
        nextformat={nextformat}
        onToggleSubmitForm={handleToggleSubmitForm}
      />
      <GooglemapActionButton
				SubmitFormOpen={SubmitFormOpen}
				onToggleSubmitForm={handleToggleSubmitForm}
        MapClick={MapClick}
      />
      {isUserInfoOpen && <div onClick={handleCloseUserInfo} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }} />}
    </>
  );
};

export default Home;