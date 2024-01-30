import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {} from "../utils/getUsers";
import Users from "../components/Users";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [accountBal, setAccountBal] = useState([]);

  useEffect(() => {
    const headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const getAccount = async () => {
      console.log(currentUser._id);
      const res = await fetch(
        `http://localhost:3000/api/account/balance/${currentUser._id}`,{headers}
        );
        const data = await res.json();
        setAccountBal(data);
      };

      getAccount();

    
  }, []);
  console.log(users);
  console.log(accountBal);
  return (
    <div className="w-full flex flex-col gap-4  h-[100vh] bg-slate-100">
      <nav className="flex items-center justify-between p-4 border-slate-300 border-b-2">
        <h1 className="text-xl">Payment App</h1>
        <div className="flex gap-4 items-center">
          <h2>Hello {currentUser.name}</h2>
          <img
            width={"30px"}
            height={"30px"}
            src="https://www.pngall.com/wp-content/uploads/5/Profile.png"
            alt="user avatar"
          />
        </div>
      </nav>

       <h1 className=" font-black text-xl">Your balance is ${accountBal.balance} </h1>
      
    <Users users={users} />
    </div>
  );
}

export default Dashboard;
