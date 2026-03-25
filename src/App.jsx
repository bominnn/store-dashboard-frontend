import { useState, useEffect } from "react";
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) return;

    const username = import.meta.env.VITE_API_USERNAME;
    const password = import.meta.env.VITE_API_PASSWORD;

    const credentials = btoa(`${username}:${password}`);

    fetch(`${import.meta.env.VITE_API_URL}/api/recommendations`, {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("데이터:", data);
        setData(data);
      })
      .catch((err) => console.error("에러:", err));
  }, [isLoggedIn]);

  const handleLogin = async ({ id, password }) => {
    try {
      const credentials = btoa(`${id}:${password}`);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/recommendations`,
        {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        },
      );

      if (res.ok) {
        setIsLoggedIn(true);
      } else {
        alert("아이디 또는 비밀번호가 틀렸습니다");
      }
    } catch (err) {
      console.error(err);
      alert("서버 오류");
    }
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <DashboardPage onLogout={handleLogout} data={data} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
