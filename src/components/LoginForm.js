import React, { useState } from "react";
import "./LoginForm.css";

const LoginForm = () => {
  const [email, setEmail] = useState("csrinu236@gmail.com");
  const [password, setPassword] = useState("secret");
  const [account, setAccount] = useState("123456789");
  const [amount, setAmount] = useState("100000");
  // const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, like sending a request to authenticate the user
    // fetch("http://localhost:5000/api/v1/auth/login", {
    fetch("https://express-starter-8m0hys2z3-chenna-sreenus-projects.vercel.app/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      if (res.ok) {
        // setLoggedIn(true);
      }
    });
    // For demonstration purposes, just logging email and password
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    // Here you can handle form submission, like sending a request to authenticate the user
    const resp = await fetch("https://express-starter-8m0hys2z3-chenna-sreenus-projects.vercel.app/bank-transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ account, amount }),
    });

    if (resp.ok) {
      const data = await resp.json();
      alert("Transfer of " + data.amount + " is done");
    } else {
      alert("Please login first");
    }

    // For demonstration purposes, just logging email and password
  };

  return (
    <>
      <div className="login-container">
        {/* <a href="http://localhost:5000/bank-transfer">Bank</a> */}
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Hi Please Login</h2>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Login</button>
        </form>
        <form className="login-form">
          <h2>Make a bank transfer</h2>
          <div className="form-group">
            <label>To Account</label>
            <input type="input" value={account} onChange={(e) => setAccount(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input type="input" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          </div>

          <button type="submit" onClick={handleTransfer}>
            Transfer
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
