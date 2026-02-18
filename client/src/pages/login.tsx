import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Login() {
  const [, navigate] = useLocation();

  useEffect(() => {
    try {
      localStorage.setItem("indexflow_session", "active");
    } catch {}
    navigate("/select-workspace");
  }, [navigate]);

  return null;
}
