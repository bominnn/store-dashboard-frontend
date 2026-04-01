import { useState } from "react";
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async ({ id, password }) => {
    if (!id.trim() || !password.trim()) return;

    try {
      const encodedCredentials = btoa(`${id}:${password}`);

      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "GET",
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        sessionStorage.setItem("basic_token", `Basic ${encodedCredentials}`);
        setIsLoggedIn(true);
      } else {
        alert("아이디 또는 비밀번호가 틀렸습니다");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      alert("서버와 통신할 수 없습니다. 서버가 켜져 있는지 확인해주세요.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("basic_token");
    setIsLoggedIn(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <DashboardPage onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
