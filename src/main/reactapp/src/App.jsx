import { useState, useEffect } from "react";
import ResApp from "./reservation/ResApp";
import AdminApp from "./admin/AdminApp";

function App() {
  const [isAdmin, setIsAdmin] = useState(false); // 초기값은 false로 설정

  useEffect(() => {
    // sessionStorage에서 로그인 여부 가져오기
    const loginStatus = sessionStorage.getItem("isAdmin");
    if (loginStatus === "true") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  return (
    <>
      <button className="mode"
        style={{ position: 'fixed', bottom: '10px', right: '10px' }}
        onClick={() => setIsAdmin(!isAdmin)}>
        {isAdmin ? "일반 사용자 모드" : "관리자 모드"}
      </button>
      {isAdmin ? <AdminApp /> : <ResApp />}
    </>
  );
}

export default App;
