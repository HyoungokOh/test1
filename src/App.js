import React, { useState, useEffect } from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Link from '@mui/material/Link';


function App() {

  const [dataList, setDataList] = useState([]);
  const [nextNumber, setNextNumber] = useState(1); // 다음 번호를 상태로 관리
  let isLoading = false;

  const fetchData = async () => {
    try {
      isLoading = true;

      const response = await fetch(`http://localhost:3000/list?number=${nextNumber}`);
      if (!response.ok) {
        throw new Error('There was a problem fetching the data from the server.');
      }
      const newData = await response.json(); // JSON으로 변환
      setDataList(prevData => [...prevData, ...newData]); // 받은 데이터를 기존 데이터와 병합하여 업데이트

      // 서버에서 가져온 마지막 데이터의 번호로 nextNumber 업데이트
      const lastNumber = newData[newData.length - 1]?.number || nextNumber; // 마지막 데이터의 번호
      setNextNumber(nextNumber + 10); // 다음 데이터의 시작 번호 설정 (예: 10씩 증가)

    } catch (error) {
      console.error('There was an issue while fetching the data:', error);
    } finally {
      // setIsLoading(false); // API 요청이 완료되면 로딩 상태 해제
    }
  };

  useEffect(() => {
    if (!isLoading) {
      fetchData(); // 로딩 중이 아닌 경우에만 fetchData 함수 호출
    }
  }, []); // isLoading 값이 변경될 때마다 useEffect 실행




  // 링크 열기 함수
  const handleLinkClick = (link) => {
    window.open(link, '_blank');
  };



  return (
    <div className="App">

      {/* 상단 메뉴 */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            오늘의 정직한 제목 뉴스
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 내용 (리스트 형태) */}
      <List>
        {dataList.map((item, index) => (
          <ListItem key={item.number} to={item.link} >

            <ListItemText
              primary={
                <React.Fragment>
                  <Typography variant="subtitle1"><Link href={item.link}>{item.title}</Link></Typography>
                  <Typography variant="body2" color="textSecondary">
                    <Link href={item.link}>{item.content}</Link>

                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>

        ))}
      </List>

      {/* 하단 메뉴 */}
      <BottomNavigation showLabels>
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Work" icon={<WorkIcon />} />
        <BottomNavigationAction label="Contact" icon={<ContactMailIcon />} />
      </BottomNavigation>

    </div>
  );
}

export default App;