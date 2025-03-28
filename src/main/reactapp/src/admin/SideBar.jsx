import { Link } from 'react-router-dom';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { useState } from 'react';
import logo from '../img/logo1_w.png';

export default function SideBar(props) {
  const [open1, setOpen1] = useState(false);
  const handleClick1 = () => {
    setOpen1(!open1);
  };

  const [open2, setOpen2] = useState(false);
  const handleClick2 = () => {
    setOpen2(!open2);
  };

  const [open3, setOpen3] = useState(false);
  const handleClick3 = () => {
    setOpen3(!open3);
  };

  return (
    <>
      {/* 사이드바 전체 구역 */}
      <List
        sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {/* 드롭다운 메뉴 */}
        <ListItemButton onClick={handleClick1}>
          <ListItemText primary="버스관리" />
          {open1 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        {/* 드롭다운의 하위메뉴 */}
        <Collapse in={open1} timeout="auto" unmountOnExit>
          {/* 하위메뉴 1개 */}
          <List component="div" disablePadding className="test">
            <ListItemButton component={Link} to="/create" sx={{ pl: 4 }}>
              <ListItemText primary="버스 등록" className="test2" />
            </ListItemButton>
          </List>

          <List component="div" disablePadding className="test">
            <ListItemButton component={Link} to="/read" sx={{ pl: 4 }}>
              <ListItemText primary="버스 조회" className="test2" />
            </ListItemButton>
          </List>

          <List component="div" disablePadding className="test">
            <ListItemButton component={Link} to="/typeread" sx={{ pl: 4 }}>
              <ListItemText primary="등급 조회" className="test2" />
            </ListItemButton>
          </List>
        </Collapse>



        <ListItemButton onClick={handleClick2}>
          <ListItemText primary="버스기사 관리" />
          {open2 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open2} timeout="auto" unmountOnExit>
          {/* 하위메뉴 1개 */}
          <List component="div" disablePadding className="test">
            <ListItemButton component={Link} to="/dcreate" sx={{ pl: 4 }}>
              <ListItemText primary="버스기사 등록" className="test2" />
            </ListItemButton>
          </List>

          <List component="div" disablePadding className="test">
            <ListItemButton component={Link} to="/dread" sx={{ pl: 4 }}>
              <ListItemText primary="버스기사 조회" className="test2" />
            </ListItemButton>
          </List>
        </Collapse>




        {/* 드롭다운 메뉴 : 복사시 open 상태 새로 만들어야한다. */}
        <ListItemButton onClick={handleClick3}>
          <ListItemText primary="스케줄 관리" />
          {open3 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        {/* 드롭다운의 하위메뉴 */}
        <Collapse in={open3} timeout="auto" unmountOnExit>
          {/* 하위메뉴 1개 */}
          <List component="div" disablePadding className="test">
            <ListItemButton component={Link} to="/tcreate" sx={{ pl: 4 }}>
              <ListItemText primary="스케줄 등록" className="test2" />
            </ListItemButton>
          </List>

          <List component="div" disablePadding className="test">
            <ListItemButton component={Link} to="/tcreateexcel" sx={{ pl: 4 }}>
              <ListItemText primary="스케줄 등록(Excel)" className="test2" />
            </ListItemButton>
          </List>

          <List component="div" disablePadding className="test">
            <ListItemButton component={Link} to="/tview/loc" sx={{ pl: 4 }}>
              <ListItemText primary="지역별 조회" className="test2" />
            </ListItemButton>
          </List>

          <List component="div" disablePadding className="test">
            <ListItemButton  component={Link} to="/tview/bus" sx={{ pl: 4 }}>
              <ListItemText primary="버스별 조회" className="test2" />
            </ListItemButton>
          </List>

          <List component="div" disablePadding className="test">
            <ListItemButton component={Link} to="/tview/date" sx={{ pl: 4 }}>
              <ListItemText primary="일자별 조회" className="test2" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* 메뉴1개 */}
        <ListItemButton component={Link} to="/resvlog">
          {' '}
          {/*링크 , to만 수정한다.*/}
          <ListItemText primary="예매로그" /> {/*텍스트 , primary만 수정한다.*/}
        </ListItemButton>

        <img src={logo} className="logo"></img>
      </List>
    </>
  );
}
