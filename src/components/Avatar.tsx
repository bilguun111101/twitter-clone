import Image from "next/image";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import React, { FC, useCallback } from "react";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const router = useRouter();
  const { data: fetchedUser } = useUser(userId);

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();

      const url = `/users/${userId}`;

      router.push(url);
    },
    [router, userId]
  );
  return (
    <div
      className={`${hasBorder ? "border-4 border-black" : ""} ${
        isLarge ? "w-32 h-32" : "w-12 h-12"
      } rounded-full hover:opacity-90 transition cursor-pointer relative`}
    >
      <Image
        fill
        alt=""
        onClick={onClick}
        style={{ objectFit: "cover", borderRadius: "100%" }}
        src={fetchedUser?.profileImage || "/images/placeholder.png"}
      />
    </div>
  );
};

export default Avatar;
