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
      {user && (
        <div className="mt-5">
          <div className="flex flex-row gap-10">
            <Avatar>
              <AvatarImage src={user.avatar_url} />
            </Avatar>
            <span className="flex flex-col gap-1">
              <Label>Name</Label>
              <p>{user.name}</p>
            </span>
            <span className="flex flex-col gap-1">
              <Label>Followers</Label>
              <p className="text-end">{user.followers}</p>
            </span>
            <span className="flex flex-col gap-1">
              <Label>Location</Label>
              <p className="text-end">{user.location}</p>
            </span>
            <span className="flex flex-col gap-1">
              <Label>Joined At</Label>
              <p className="text-end">
                {format(user.created_at, "dd-MMM-yyyy")}
              </p>
            </span>
            <span className="flex flex-col gap-1">
              <Label>Bio</Label>
              <p className="text-end">
                {user.bio}
              </p>
            </span>
          </div>
        </div>
      )}
      <Button
        type="submit"
        className="mt-5"
        disabled={loading}
        onClick={async () => handleSubmit()}
      >
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
