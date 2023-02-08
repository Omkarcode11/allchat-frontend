import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './component/Pages/Login/Login';
import Home from './component/Pages/Home/Home';
import { createContext, useState } from 'react';
import SignUp from './component/Pages/SignUp/SignUp';
export const AppContext = createContext();

function App() {
  const [user, setUser] = useState({
    id: null,
    name: '',
    authenticated: false,
    username: '',
  });
  const [user2, setUser2] = useState({
    name: '',
    username: '',
  });

  const [conversation, setConversation] = useState({});
  const [chats, setChats] = useState([]);
  return (
    <AppContext.Provider value={{ user, setUser, conversation, setConversation, chats, setChats , user2,setUser2 }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
