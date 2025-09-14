import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const LogOut = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("token");
    navigate("/auth");
    toast.success("You are Logout ");
  }, [navigate]);
  return (
    <div>
      <div>Logging out...</div>;
    </div>
  );
};

export default LogOut;
