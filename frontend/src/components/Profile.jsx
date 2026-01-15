import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { Local_URL } from "../config";


function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get(`${BASE_URL}/api/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => setUser(res.data));
  }, []);

  if (!user) return <p>Loading...</p>;
  console.log("user ", user)

  return (
   <div>
  <img  src={user.avatar || "https://via.placeholder.com/150"}  width="150" alt={user.name} />
  <p>Name: {user.name}</p>
  <p>Email: {user.email}</p>
</div>

  );
}

export default Profile;
