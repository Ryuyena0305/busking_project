# 🚍Bus Reservation Kiosk🚍
미니 프로젝트로 사용한 서버 코드입니다.

SPRING과 REACT를 활용하여 "버스 예매 키오스크" 페이지를 구현하였습니다.

# 🎥 프로젝트 시연영상

[프로젝트 시연영상 링크](https://youtu.be/e5RxGTHe5YU)
</br>
[프로젝트 PPT](https://www.canva.com/design/DAGhaqxYx-w/DFvGanab2X-BRhdwlZBNXw/view?utm_content=DAGhaqxYx-w&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h1447a14b10)


## 👨‍🏫 프로젝트 소개
"버스 예매 키오스크"을 간편하게 버스 예매 가능한 시스템을 구현하였습니다.
고연령층 및 디지털 취약 계층을 위한 사용자 친화적인 키오스크 시스템을 개발하여, 현장 예매를 지원하고 온라인 예매에 어려움을 겪는 고객들의 불편을 해소할 수 있는 자동예매 시스템을 도입한 플랫폼을 제작해보았습니다.





## ⏱ 개발기간
- 2025.03.04(화) ~ 2025.03.31(월)
- 기획서 / REST API 명세서 작성
- DB설계
- Flow Chart
- 코드구현
- 발표평가




## 🙋‍♂️ 개발자 소개

<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/Ryuyena0305"><img src="https://avatars.githubusercontent.com/u/183960634?v=4" width="100px;" alt="" /><br /><sub><b> 류예나 </b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/2mxnxu"><img src="https://avatars.githubusercontent.com/u/120361803?v=4" width="100px;" alt=""/><br /><sub><b> 이민수 </b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/minwoo817"><img src="https://avatars.githubusercontent.com/u/189101401?v=4" width="100px;" alt="" /><br /><sub><b> 장민우 </b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/ithodol"><img src="https://avatars.githubusercontent.com/u/188819094?v=4" width="100px;" alt=""/><br /><sub><b> 전은서 </b></sub></a><br /></td>
     <tr/>
  </tbody>
</table>


💡 류예나 : GIT 담당, [사용자] 버스 좌석 상태표시와 선택 및 해제 [관리자] 버스 좌석 관리, Excel파일 업로드를 통한 운행일정 등록, 운행 일정 Excel 다운 

💡 이민수 : 조장, [사용자] 일반 예매, 자동예매 서비스 개발

💡 장민우 : JIRA 담당, [관리자] 버스 CRUD, 로그인, 예매 성공 시 QR코드 생성 및 이메일 전송, 헤더, 사이드바, CSS 배포, [사용자] 관리자 호출

💡 전은서 : 캔바 담당, [관리자] 우수 버스기사 랭킹, 최근 7일 스케줄 차트, 컨텐츠 전체 CSS 배포, 페이지네이션 배포, 운행 일정 CRUD, 버스기사 CRUD, 예매 내역 전체 조회




## 💻 개발환경
- **Version** : Java 17
- **IDE** : <img src="https://img.shields.io/badge/VSCode-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white"> <img src="https://img.shields.io/badge/IntelliJ IDEA-000000?style=flat-square&logo=intellij-idea&logoColor=white">
- **BackEnd** : ![Java](https://img.shields.io/badge/Java-007396.svg?&style=for-the-badge&logo=Java&logoColor=white) 
- **FrontEnd** : <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black"> 
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
- **협업도구** : <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">



## ⚙️ 기술 스택
- **DataBase** : <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> 
- **기획서 작성** : Google Sheets
- **일정 관리** : Jira




## 📌 주요 기능
- **일반예매 및 자동예매 - 사용자**
  - 키오스크를 통한 도착지, 날짜, 인원수, 좌석을 선택하여 예매 기능
  - 키오스크를 통한 도착지, 날짜, 인원수만 받아 자동 예매 기능
  - 예매 이후 QR코드가 메일로 전송이 되어 QR스캔 하여 탑승 여부 판별 기능
  - 키오스크를 통한 관리자 호출 기능


    
- **스케줄 등록 - 관리자**
  - 우수 버스 기사 랭킹, 최근 7일 스케줄 차트 기능
  - 버스, 버스기사를 등록 후 운행일정 등록 기능
  - 버스 별 좌석 생성 및 활성화 여부 수정 기능
  - Excel을 통한 운행일정 등록 기능 및 일자별 운행일정 Excel 다운로드 기능

  
  
## ✒️ API
- **API 명세서** :[설계 링크](https://docs.google.com/spreadsheets/d/1RW_41h6xYD6zknhlAMaRoWMZMum2rFkNr0inXzk1ppA/edit?pli=1&gid=0#gid=0)

