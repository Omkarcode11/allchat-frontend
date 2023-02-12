import './App.css';
import Home from './component/Pages/Home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// const Home = lazy(() => import('./component/Pages/Home/Home'));
import Login from './component/Pages/Login/Login';
import { createContext, useRef, useState } from 'react';
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
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [conversation, setConversation] = useState({});
  const [chats, setChats] = useState([]);
  const socket = useRef();
  const [receiverUser,setReceiverUser] = useState({})
  const [show,setShow] = useState(null)
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        show,
        setShow,
        conversation,
        setConversation,
        chats,
        setChats,
        user2,
        setUser2,
        socket,
        receiverUser,
        setReceiverUser,
        onlineUsers,
        setOnlineUsers,
      }}
    >
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
