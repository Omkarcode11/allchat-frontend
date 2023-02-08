import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App';
import { URL } from '../Utils/BASE_URL';
import PeopleCard from './../PeopleCard/PeopleCard';
import './Friends.css';
import axios from 'axios';

function Friends() {
  const [allUsers ,setAllUsers] = useState([])

  async function getAllUsers() {
    let userInfo = await axios.get(`${URL}/user`);
    if(userInfo.data){
      setAllUsers(userInfo.data)
    }else{
     window.location.href = '/'
    }
  }
  useEffect(() => {
    getAllUsers();
  }, []);


  return (
    <div>
      <div className="online-fr-layout">
        <div className="fr-heading">
          <h2 className="heading">People</h2>
          <input type={'text'} className="friend-search" placeholder="Search..." />
        </div>
        <div className="people-cards">
          {allUsers.map((item)=>
          <PeopleCard name={item.name} id={item.id} username={item.username} />
          )}
         
        </div>
      </div>
    </div>
  );
}

export default Friends;
