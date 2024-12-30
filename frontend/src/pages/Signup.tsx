import { Button } from "../components/ui/Button";
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const usernameRef = useRef<any>();
  const passwordRef = useRef<any>();

  async function Backend() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    // Check if both fields are not empty (simulating the 'required' behavior)
    if (!username || !password) {
      alert("Please fill in both username and password.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/v1/signup", {
        username: username,
        password: password,
      });
      alert("Signup Successful!");
      navigate("/signin");
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed!");
    }
  }

  return (
    <div className="flex justify-center items-center bg-slate-200 h-screen w-full rounded-3xl">
      <div className="bg-white h-96 w-80 flex flex-col items-center p-2">
        <div className="font-bold text-purple-600 text-4xl mb-10 mt-6">Signup</div>
        {/* Here we are manually validating the required fields */}
        <input
          ref={usernameRef}
          type="text"
          className="p-4 mt-4 w-full border-2"
          placeholder="Username"
          required
        />
        <input
          ref={passwordRef}
          type="password"
          className="p-4 mt-4 w-full border-2 mb-4"
          placeholder="Password"
          required
        />
        {/* Custom Button without type submit */}
        <Button
          onClick={Backend}
          size="lg"
          variant="primary"
          text="Submit"
          open={open}
          loading={loading}
        />
      </div>
    </div>
  );
};

