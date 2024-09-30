"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Icons } from "@/app/Components/ui/Icons";

const ApiForm = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);

    axios
      .post("/api/GithubInfo", { username })
      .then((response) => {
        console.log(response.data.Message);
        setUsername("");
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setUsername("");
      })
      .finally(() => setLoading(false));
  };
  return (
    <div>
      <Label>Username</Label>
      <Input
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        placeholder="Ni9Logic"
        disabled={loading}
      />

      <Button type="submit" className="mt-5" disabled={loading} onClick={async () => handleSubmit()}>
        {loading ? (
          <Icons.spinner className="animate animate-spin h-8 w-8" />
        ) : (
          "Get Info"
        )}
      </Button>
    </div>
  );
};

export default ApiForm;
