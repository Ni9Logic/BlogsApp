"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Icons } from "@/app/Components/ui/Icons";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { format } from "date-fns/format";
import { X } from "lucide-react";

export interface GithubUserType {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: null;
  hireable: boolean;
  bio: string;
  twitter_username: null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: Date;
  updated_at: Date;
}

const ApiForm = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<GithubUserType | null>(null);

  const handleSubmit = async () => {
    setLoading(true);

    axios
      .post("/api/GithubInfo", { username })
      .then((response) => {
        setUser(response.data.Message);
        setUsername("");
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setUsername("");
      })
      .finally(() => setLoading(false));
  };

  const handleClear = () => {
    setUser(null);
    setUsername("");
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Label htmlFor="username" className="block mb-2">Username</Label>
      <Input
        id="username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        placeholder="Ni9Logic"
        disabled={loading}
        className="mb-4"
      />
      {user && (
        <div className="mt-5 space-y-6 bg-gray-100 p-6 rounded-lg shadow-md relative">
          <button
            onClick={handleClear}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X size={24} />
          </button>
          <div className="flex justify-center">
            <Avatar className="w-40 h-40 md:w-48 md:h-48">
              <AvatarImage src={user.avatar_url} />
            </Avatar>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Name</Label>
              <p className="text-sm break-words bg-white p-2 rounded">{user.name}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Followers</Label>
              <p className="text-sm break-words bg-white p-2 rounded">{user.followers}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Location</Label>
              <p className="text-sm break-words bg-white p-2 rounded">{user.location}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Joined At</Label>
              <p className="text-sm break-words bg-white p-2 rounded">
                {format(user.created_at, "dd-MMM-yyyy")}
              </p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Bio</Label>
              <p className="text-sm break-words bg-white p-2 rounded">{user.bio}</p>
            </div>
          </div>
        </div>
      )}
      <Button
        type="submit"
        className="mt-6 w-full"
        disabled={loading}
        onClick={async () => handleSubmit()}
      >
        {loading ? (
          <Icons.spinner className="animate-spin h-5 w-5 mr-2" />
        ) : null}
        {loading ? "Loading..." : "Get Info"}
      </Button>
    </div>
  );
};

export default ApiForm;
