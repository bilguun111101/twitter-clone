import useUsers from "@/hooks/useUsers";
import { memo } from "react";
import Avatar from "../Avatar";

const FollowBar = () => {
  const { data: users = [] } = useUsers();
  if (!users.length) {
    return null;
  }
  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {users.map((user: Record<string, any>) => {
            const { id, name, username } = user;
            return (
              <div key={user.id} className="flex flex-row gap-4">
                <Avatar userId={id} />
                <div className="flex flex-col">
                  <p className="text-white font-semibold text-sm">{name}</p>
                  <p className="text-netural-400 text-sm">@{username}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(FollowBar);
