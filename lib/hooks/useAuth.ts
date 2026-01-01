import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { getCurrentUser, isAdmin } from "@/lib/firebase/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    getCurrentUser().then(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const adminStatus = await isAdmin(currentUser);
        setAdmin(adminStatus);
      }
      setLoading(false);
    });
  }, []);

  return { user, loading, admin };
}

