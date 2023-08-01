import React, { useState } from "react";

export default function SignUpForm({setToken}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    
    // Form validation

    //username 8 characters in length
    if (username.length < 8) {
      setError("Username must be at least 8 characters long.");
      return;
    }

    //password must contain a number, a special character and be at least 8 characters long
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long and contain a special character and a number."
      );
      return;
    }

  
    if (!username) {
      setError("Username is required!");
      return;
    }
  
    try {
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        // Handle the API error if necessary
        throw new Error("Failed to sign up.");
      }
  
      const result = await response.json();
      console.log(result);

      // If the API response contains a token, update it using setToken function
      if (result.token) {
        setToken(result.token);
      }
  
      // You can do further processing with the API response here if needed
    } catch (error) {
      // Handle any other errors that might occur during the API call
      setError("An error occurred during sign-up.");
    }
  }

  try {
} catch (error) {
  setError(error.message);
}


  return (
    <>
      <h2>Sign Up</h2>
      <p>Thanks for signing up with us, before you get started some guidelines for your username and password. 
        Username must be 8 characters in length. Password must have at least one special character, !@#$%^&* , a number and be 8 characters long. </p>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label className="user">
          Username:{" "}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="password">
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}
