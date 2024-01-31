import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SendMoney = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  const { id, name } = useParams();

  const transfer = async () => {
    setLoading(true);
    const res = await fetch(
      `http://localhost:3000/api/account/transfer/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ amount: amount }),
      }
    );
    const data = await res.json();
    setLoading(false);
    setMessage(data);
    setTimeout(() => {
      setMessage("");
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className=" bg-slate-300 w-full flex flex-col h-screen justify-center items-center">
      <div className="w-[330px] flex flex-col p-3 gap-16 bg-slate-100  shadow-lg ">
        <h1 className="text-center font-bold text-xl ">Send Money</h1>
        <div className="flex flex-col p-3 gap-3">
          <div className="flex items-center font-bold gap-3">
            <span className=" rounded-full w-[40px] text-center text-white h-[40px] p-2 bg-green-700">
              {name.slice(0, 2)}
            </span>
            <span>{name}</span>
          </div>
          <p>Amount (in Rs) </p>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="p-2 outline-none rounded-lg border-slate-600 border-2 "
            type="number"
            placeholder="Enter amount"
          />
          <button
            onClick={transfer}
            className="bg-green-700 rounded-lg text-white  p-2"
          >
            {loading ? "loading..." : "Initiate Transfer"}
          </button>
          {message && (
            <h1 className="text-center text-green-700">{message.msg}</h1>
          )}
          {message.error && (
            <h1 className="text-center text-green-700">{message.msg}</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
