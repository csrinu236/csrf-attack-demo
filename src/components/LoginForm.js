import React, { useState } from "react";
import "./LoginForm.css";

const URL = "https://creative-flora.netlify.app";
// const URL = "http://localhost:8888";

const LoginForm = () => {
  const [email, setEmail] = useState("csrinu236@gmail.com");
  const [password, setPassword] = useState("secret");
  const [account, setAccount] = useState("123456789");
  const [amount, setAmount] = useState("100000");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`${URL}/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // this is must and should to set the cookie to browser cookies
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      if (res.ok) {
        setLoading(false);
        setLoggedIn(true);
      } else {
        setLoading(false);
      }
    });
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    // Here you can handle form submission, like sending a request to authenticate the user
    const resp = await fetch(`${URL}/bank-transfer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ account, amount }),
    });

    if (resp.ok) {
      const data = await resp.json();
      alert("Transfer of " + data.amount + " is done to " + data.account);
    } else {
      alert("Please login first");
    }

    // For demonstration purposes, just logging email and password
  };

  return (
    <>
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          {!isLoading && <h3>{loggedIn ? "LogIn Success" : "Hi Please Login"}</h3>}
          {isLoading && <h3>Loading...</h3>}

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
          <h3>Make a bank transfer</h3>
          <div className="form-group">
            <label>To Account</label>
            <input type="input" value={account} onChange={(e) => setAccount(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input type="input" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          </div>

          <button type="submit" disabled={!loggedIn} onClick={handleTransfer}>
            Transfer
          </button>
          <br />
          <br />
          {loggedIn && <a href="https://csrf-phishing-mail.netlify.app/">Phising Mail Link</a>}
        </form>
      </div>
    </>
  );
};

export default LoginForm;
