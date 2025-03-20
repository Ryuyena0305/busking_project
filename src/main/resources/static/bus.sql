# 버스 좌석 예매 키오스크 관리 시스템
drop database if exists bus;
create database bus;
use bus;

# 관리자
create table admin(
	adno int unsigned auto_increment,
    adpwd varchar(20),
    constraint primary key (adno)
);
insert into admin (adpwd) values('1234');
select * from admin;

# 버스타입
create table bustype(
	btid int unsigned auto_increment,
    btname varchar(20),
    btprice int unsigned not null,
    constraint primary key (btid)
);
insert into bustype (btname,btprice) values('일반',0);
insert into bustype (btname,btprice) values('우등',5000);
insert into bustype (btname,btprice) values('프리미엄',10000);

select * from bustype;

# 버스정보
create table businfo(
	biid int unsigned auto_increment,
    driver varchar(10),
    binum varchar(20) not null,
    btid int unsigned,
    constraint primary key (biid),
    constraint foreign key (btid) references bustype(btid) ON DELETE CASCADE ON UPDATE CASCADE
);
insert into businfo (driver,binum,btid) values('전은서','12바3654',1);
insert into businfo (driver,binum,btid) values('이민수','66아4033',2);
insert into businfo (driver,binum,btid) values('장민우','41사5432',3);

select * from businfo;

# 좌석
create table busseat(
	bsid int unsigned auto_increment,
	bsnum int unsigned not null,
	bsstate boolean not null default 1,
    x int unsigned not null,
    y int  unsigned not null,
    biid int unsigned,
    constraint primary key (bsid),
    constraint foreign key (biid) references businfo(biid) ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO busseat (bsnum, x, y, biid) VALUES
(1, 0, 0, 1), (2, 0, 1, 1), (3, 0, 2, 1), (4, 0, 3, 1), (5, 0, 4, 1), (6, 1, 0, 1), (7, 1, 1, 1), (8, 1, 2, 1), (9, 1, 3, 1), (10, 1, 4, 1),
(11, 2, 0, 1), (12, 2, 1, 1), (13, 2, 2, 1), (14, 2, 3, 1), (15, 2, 4, 1), (16, 3, 0, 1), (17, 3, 1, 1), (18, 3, 2, 1), (19, 3, 3, 1), (20, 3, 4, 1),
(21, 4, 0, 1), (22, 4, 1, 1), (23, 4, 2, 1), (24, 4, 3, 1), (25, 4, 4, 1), (26, 5, 0, 1), (27, 5, 1, 1), (28, 5, 2, 1), (29, 5, 3, 1), (30, 5, 4, 1),
(31, 6, 0, 1), (32, 6, 1, 1), (33, 6, 2, 1), (34, 6, 3, 1), (35, 6, 4, 1), (36, 7, 0, 1), (37, 7, 1, 1), (38, 7, 2, 1), (39, 7, 3, 1), (40, 7, 4, 1),
(41, 8, 0, 1), (42, 8, 1, 1), (43, 8, 2, 1), (44, 8, 3, 1), (45, 8, 4, 1), (46, 9, 0, 1), (47, 9, 1, 1), (48, 9, 2, 1), (49, 9, 3, 1), (50, 9, 4, 1),
(51, 10, 0, 1), (52, 10, 1, 1), (53, 10, 2, 1), (54, 10, 3, 1), (55, 10, 4, 1);

select * from busseat;

# 터미널
create table location(
	locid int unsigned auto_increment,
	start varchar(10) default '인천',
	dest varchar(10) not null,
    locprice int unsigned not null,
    constraint primary key (locid)
);
insert into location (dest,locprice) values('아산','9100');
insert into location (dest,locprice) values('목포','47600');
insert into location (dest,locprice) values('동서울','5500');
insert into location (dest,locprice) values('부산','47600');
insert into location (dest,locprice) values('강릉','36000');
insert into location (dest,locprice) values('대구','41000');
insert into location (dest,locprice) values('대전','18000');

select * from location;

# 스케줄
create table timetable(
	timeid int unsigned auto_increment,
	starttime time not null,
    startdate date not null,
	biid int unsigned not null,
    locid  int unsigned not null,
    constraint primary key (timeid),
	constraint foreign key (biid) references businfo(biid) ON DELETE CASCADE ON UPDATE CASCADE,
    constraint foreign key (locid) references location(locid) ON DELETE CASCADE ON UPDATE CASCADE
);
insert into timetable (starttime,startdate,biid,locid) values('06:00:00','2025-03-05',1,1);
insert into timetable (starttime,startdate,biid,locid) values('06:30:00','2025-03-10',2,2);
insert into timetable (starttime,startdate,biid,locid) values('07:20:00','2025-03-11',2,3);
insert into timetable (starttime,startdate,biid,locid) values('07:50:00','2025-03-10',3,4);
insert into timetable (starttime,startdate,biid,locid) values('18:00:00','2025-03-10',2,5);
insert into timetable (starttime,startdate,biid,locid) values('18:00:00','2025-03-10',1,6);
insert into timetable (starttime,startdate,biid,locid) values('18:00:00','2025-03-10',2,7);
insert into timetable (starttime,startdate,biid,locid) values('18:00:00','2025-03-20',2,7);
insert into timetable (starttime,startdate,biid,locid) values('18:00:00','2025-03-20',1,6);
insert into timetable (starttime,startdate,biid,locid) values('19:00:00','2025-03-20',1,6);


select * from timetable;
SELECT * FROM timetable WHERE startdate = '2025-03-20' AND starttime = '18:00:00';

# 예약
create table resv(
	resvid int unsigned auto_increment,
	email varchar(30) not null,
    rprice int unsigned not null,
    total int unsigned not null,
	timeid int unsigned not null,
    constraint primary key (resvid),
	constraint foreign key (timeid) references timetable(timeid) ON DELETE CASCADE ON UPDATE CASCADE
);
insert into resv (email,rprice,total,timeid) values('010-2222-2222','10000','20000',1);
insert into resv (email,rprice,total,timeid) values('010-2222-2221','10000','20000',2);
insert into resv (email,rprice,total,timeid) values('010-2222-2223','10000','20000',2);

select * from resv;




# 예약 상세
create table resvdetail(
	detailid int unsigned auto_increment,
	bsid int unsigned not null,
    resvid int unsigned,
    constraint primary key (detailid),
	constraint foreign key (bsid) references busseat(bsid) ON DELETE CASCADE ON UPDATE CASCADE,
    constraint foreign key (resvid) references resv(resvid) ON DELETE CASCADE ON UPDATE CASCADE
);
insert into resvdetail (bsid,resvid) values(1,1);
insert into resvdetail (bsid,resvid) values(2,1);
insert into resvdetail (bsid,resvid) values(3,2);

select * from resvdetail;
select * from resv;
select * from busseat;
select * from businfo;
select * from bustype;
select * from admin;

INSERT INTO busseat (bsnum, x, y, biid)
SELECT bsnum, x, y, 2  -- 새로운 bustypeid(우등버스)로 설정
FROM busseat
WHERE biid = 1;  -- 기존의 bustypeid (예: 1번 버스)

-- 우등버스의 활성화된 좌석만 선택
SELECT * FROM busseat
WHERE biid = 2 AND bsstate = TRUE;



  SELECT DISTINCT b.bsnum
FROM busseat b
JOIN timetable t ON b.biid = t.biid
JOIN location l ON t.locid = l.locid
LEFT JOIN resvdetail rd ON b.bsid = rd.bsid
WHERE t.startdate = '2025-03-10'    -- 예약된 날짜
  AND l.dest = '목포'                -- 목적지
  AND t.starttime = '06:30:00'       -- 출발 시간
  AND rd.bsid IS NULL;               -- 예약되지 않은 좌석만

SELECT * FROM timetable WHERE startdate = '2025-03-20';

SELECT *
FROM resv
JOIN timetable ON resv.timeid = timetable.timeid
WHERE timetable.startdate = '2025-03-20';

SELECT DISTINCT l.dest
FROM timetable t
JOIN location l ON t.locid = l.locid
LEFT JOIN resv r ON t.timeid = r.timeid
WHERE t.startdate = '2025-03-20'
AND r.resvid IS NULL;

SELECT DISTINCT l.dest FROM timetable t
            JOIN location l ON t.locid = l.locid
            JOIN resv r ON t.timeid = r.timeid
            WHERE t.startdate = '2025-03-20';

SELECT DISTINCT l.dest
FROM timetable t
JOIN location l ON t.locid = l.locid
LEFT JOIN resv r ON t.timeid = r.timeid
WHERE t.startdate = '2025-03-20';

INSERT INTO resvdetail (bsid, resvid)
            SELECT bs.bsid, 1
            FROM busseat bs
            JOIN timetable t ON bs.biid = t.biid
            JOIN location l ON t.locid = l.locid
            WHERE bs.bsnum = 2
            AND l.dest = '목포'
            AND t.startdate = '2025-03-10'
            AND t.starttime = '06:30:00';

select * from resvdetail;


SELECT t2.biid FROM timetable t2 JOIN location l2 ON t2.locid = l2.locid WHERE l2.dest = '목포' AND t2.startdate = '2025-03-10' AND t2.starttime = '06:30:00' LIMIT 1;


INSERT INTO resvdetail (bsid, resvid)
            SELECT bs.bsid, 1
            FROM busseat bs
            JOIN timetable t ON bs.biid = t.biid
            JOIN location l ON t.locid = l.locid
            WHERE bs.bsnum = 2 AND bs.biid = 2;

             SELECT *
            FROM busseat bs
            JOIN timetable t ON bs.biid = t.biid
            JOIN location l ON t.locid = l.locid
            WHERE bs.bsnum = 2 AND bs.biid = 2;

           SELECT bs.*
            FROM busseat bs
            JOIN timetable t ON bs.biid = t.biid
            JOIN location l ON t.locid = l.locid
            WHERE bs.bsnum = 2 AND bs.biid = 2;

            SELECT *
            FROM busseat bs
            JOIN timetable t ON bs.biid = t.biid
            WHERE bs.bsnum = 2 AND bs.biid = 2;


