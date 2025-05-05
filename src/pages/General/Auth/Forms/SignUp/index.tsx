import React from "react";
import { RightPanel, RoleButtons } from "./styles";
import { ButtonComponent } from "../../../../../components/Button";
import { InputComponent } from "../../../../../components/TextInput";
import { FaRegEnvelope, FaRegUser } from "react-icons/fa";
import { IoSchoolOutline } from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";
import { SignUpProps } from "../../../../../types/layouts/layout";

const SignUp: React.FC<SignUpProps> = ({ onSubmit, onChange, data, error }) => {
  return (
    <RightPanel onSubmit={onSubmit}>
      <h2>Sing Up</h2>
      {error}
      <InputComponent
        name="Name"
        icon={<FaRegUser />}
        placeholder="Name"
        type="text"
        onChange={(e) => onChange({ ...data, username: e.target.value })}
      />
      <InputComponent
        name="Email"
        icon={<FaRegEnvelope />}
        placeholder="Email"
        onChange={(e) => onChange({ ...data, email: e.target.value })}
        type="email"
      />
      <InputComponent
        name="Grade"
        icon={<IoSchoolOutline />}
        placeholder="Grade"
        onChange={(e) => onChange({ ...data, grade: e.target.value })}
        type="text"
      />
      <InputComponent
        name="Password"
        icon={<MdLockOutline />}
        placeholder="Password"
        type="password"
        onChange={(e) => onChange({ ...data, password: e.target.value })}
      />
      <InputComponent
        name="Confirm Password"
        icon={<MdLockOutline />}
        placeholder="Confirm Password"
        onChange={(e) => onChange({ ...data, confirmPassword: e.target.value })}
        type="password"
      />
      <RoleButtons>
        <ButtonComponent placeholder="Login" type="submit" />
      </RoleButtons>
    </RightPanel>
  );
};

export default SignUp;
