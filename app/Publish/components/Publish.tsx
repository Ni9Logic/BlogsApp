"use client";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, firestore } from "@/firebase/firebase";
import type { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Icons } from "@/app/Components/ui/Icons";
const Publish = () => {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsername(userData.name);   
        }
      } else {
        router.push("/Login");
      }

      //   Cleanup function
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      router.push("/");
      toast.error("Logged out successfully");
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
      setLoading(false);
    }
  };
  return (
    <div>
      <Button onClick={async () => handleLogout()}>
        {loading ? (
          <Icons.spinner className="animate animate-spin h-8 w-8" />
        ) : (
          <p>Log Out {user?.email} - {username}</p>
        )}
      </Button>
    </div>
  );
};

export default Publish;
