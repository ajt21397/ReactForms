import { useState } from "react";

export default function Authenticate({ token }) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState(null);
  
    async function handleClick() {
      try {
        const response = await fetch(
          "https://fsa-jwt-practice.herokuapp.com/authenticate",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        setSuccessMessage(result.message);
        // Check if the 'data' property exists in the response and has a 'username' property
    if (result.data && result.data.username) {
      setUsername(result.data.username);
    } else {
      setUsername(null); // Reset username to null if the property is missing
    }
      } catch (error) {
        setError(error.message);
        setUsername(null); // Reset username to null if an error occurs
      }
    }
  
    return (
      <div>
        <h2>Authenticate</h2>
        {successMessage && <p>{successMessage}</p>}
        {error && <p>{error}</p>}
        {username && <p>Logged-in user's username: {username}</p>}
        <button onClick={handleClick}>Authenticate Token!</button>
      </div>
    );
  }