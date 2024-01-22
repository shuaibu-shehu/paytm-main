import React from "react";
import { useSelector } from "react-redux";

function Dashboard() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <div className="w-full h-[100vh] bg-slate-100">
      <nav className="flex items-center justify-between p-4 border-slate-300 border-b-2">
        <h1 className="text-xl">Payment App</h1>
        <div className="flex gap-4 items-center">

        <h2>Hello {currentUser.name}</h2>
        <img
        width={'30px'}
        height={'30px'}
        src="https://www.pngall.com/wp-content/uploads/5/Profile.png"
        alt="user avatar"
        />
        </div>
      </nav>

      <div>
        <h1>Your balance is {currentUser.balance}</h1>
      </div>


    </div>
  );
}

export default Dashboard;
