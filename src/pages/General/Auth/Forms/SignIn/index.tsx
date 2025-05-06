import React from "react";
import { RightPanel, RoleButtons } from "./styles";
import { ButtonComponent } from "../../../../../components/Button";
import { InputComponent } from "../../../../../components/TextInput";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { SignInProps } from "../../../../../types/layouts/layout";

const SignIn: React.FC<SignInProps> = ({ onSubmit, onChange, data, error }) => {
  return (
    <RightPanel onSubmit={onSubmit}>
      <h2>Sing In</h2>
      {error}
      <InputComponent
        name="Email"
        icon={<FaRegEnvelope />}
        placeholder="Email"
        type="email"
        autoComplete="email"
        onChange={(e) => onChange({ ...data, email: e.target.value })}
      />
      <InputComponent
        name="Password"
        icon={<MdLockOutline />}
        placeholder="Password"
        type="password"
        onChange={(e) => onChange({ ...data, password: e.target.value })}
      />
      <a href="/auth/request-pass" className="forgotText">
        forgot my password</a>
      <RoleButtons>
        <ButtonComponent placeholder="Login" type="submit" />
      </RoleButtons>
    </RightPanel>
  );
};

export default SignIn;
