import React from "react";
import * as Style from "./styles.ts";
import { ProfileProps } from "../../types/components/profile";
import { FaCamera } from "react-icons/fa";

export const ProfileComponent: React.FC<ProfileProps> = ({
  image,
  onChange,
  fileInputRef,
}) => {
  return (
    <Style.ProfileWrapper>
      <Style.ProfileImage src={image || "/default-profile.jpg"} />

      <Style.CameraButton onClick={() => fileInputRef.current?.click()}>
        <FaCamera size={14}/>
      </Style.CameraButton>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={onChange}
      />
    </Style.ProfileWrapper>
  );
};
