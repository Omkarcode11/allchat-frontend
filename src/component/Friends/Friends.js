import React, { useContext, useEffect, useState } from 'react';
import { URL } from '../Utils/BASE_URL';
import PeopleCard from './../PeopleCard/PeopleCard';
import './Friends.css';
import axios from 'axios';
import { AppContext } from '../../App';

function Friends() {
  const [allUsers, setAllUsers] = useState([]);
  const {user} = useContext(AppContext)
  const [searchPeople,setSearchPeople] = useState('')


  async function getAllUsers() {
    let userInfo = await axios.get(`${URL}/user`);
    if (userInfo.data) {
      setAllUsers(userInfo.data);
    } else {
      window.location.href = '/';
    }
  }
  useEffect(() => {
    getAllUsers();
  }, []);

 

  return (
    <div>
      <div className="online-fr-layout">
        <div className="fr-heading">
          <h2 className="heading">
            Hi! {user?.name[0]?.toUpperCase()}
            {String(user.name).slice(1)}
          </h2>
          <input type={'text'} onChange={(e)=>setSearchPeople(e.target.value)} className="friend-search" placeholder="Search..." />
        </div>

        <div className="people-cards">
          {allUsers?.filter((item)=>item?.name?.toLowerCase().includes(searchPeople.toLocaleLowerCase())).map((item) => (
            <PeopleCard key={item.id} name={item.name} id={item.id} username={item.username} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Friends;
