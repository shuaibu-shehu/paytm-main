import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const getUsers = async () => {
      const res = await fetch(`http://localhost:3000/api/users?filter=${search}`, { headers });
      const data = await res.json();
      setUsers(data.users);
    };

    getUsers();
  }, [search]);
  console.log(search);
  console.log(users);
  return (
    <div className="flex  p-2 justify-center flex-col w-full">
      <h1 className=" font-bold">Users</h1>
      <div className="w-full p-3">
        <input value={search} onChange={(e)=>setSearch(e.target.value)} className="min-w-full p-2 border-2 border-slate-400 rounded-md " type="text" placeholder="Search users..." />
      </div>
      <div className=" flex flex-col gap-3">{users.map(user=> <div className="flex w-full justify-between items-center  gap-2">
        <div className="flex items-center gap-3">
        <p className=" rounded-xl w-[40px] text-center h-[40px] p-2 bg-slate-500">{user.name.slice(0,2)}</p>
        <h2 className=" font-bold" >{user.name} </h2> 
        </div>
        <Link to={`/send-money/${user._id}`} className="font-bold text-white p-2  bg-black">send money</Link>
        </div>)}</div>
    </div>
  );
}

export default Users;
