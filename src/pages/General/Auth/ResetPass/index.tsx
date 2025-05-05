import React, { useState } from "react";
import * as Style from "./styles";
import { ButtonComponent } from "../../../../components/Button";
import { InputComponent } from "../../../../components/TextInput";
import { MdLockOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../../../services/Auth/ResetPassService";
import { ApiService } from "../../../../services/ApiService";
import { AuthService } from "../../../../utils/auth";
import WarnComponent from "../../../../components/WarnComponent";

const ResetPass: React.FC = () => {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const query = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const [message, setMessage] = useState({ message: "", type: "" });
  const token = query.get("token");

  const [data, setData] = useState({
    password: "",
    confirmPassword: ""
  })

  if (!token || token.trim() === "") {
    navigate("/auth");
    return;
  }

  const handleChangePass = async () => {

    for (const key in data) {
      if (!data[key as keyof typeof data]) {
        setMessage({ message: "All fields must be filled.", type: "danger" });
        return;
      }
    }

    if (data.password !== data.confirmPassword) {
      setMessage({ message: "Passwords do not match.", type: "danger" });
      return;
    }

    try {
      const payload =
      {
        password: data.password,
        resetToken: token
      }

      const response = await resetPassword(ApiService, payload);

      if (response.type != "success") {
        setMessage({ message: response.message, type: "danger" });

        setTimeout(() => {
          navigate("/auth");
        }, 2000);

        return;
      }

      AuthService.clearAllAuthData();
      navigate("/auth");
    } catch (e) {

      setTimeout(() => {
        navigate("/auth");
      }, 2000);

      console.warn("Erro ao mudar a senha", e);
      setMessage({ message: "Unknown Error", type: "danger" });
    }
  }

  return (
    <main style={{ height: "100vh" }}>
      <Style.Container>
        <Style.RightPanel onSubmit={handleLogin}>
          <Style.Title>Reset Password</Style.Title>
          {message && message.message && (
            <WarnComponent
              value={message.message}
              type={message.type as "danger" | "success"}
            />
          )}
          <Style.Subtitle>
            Please enter your new password below. Make sure it’s strong and
            secure.
          </Style.Subtitle>
          <InputComponent
            icon={<MdLockOutline />}
            placeholder="Password"
            type="password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <InputComponent
            icon={<MdLockOutline />}
            placeholder="Confirm Password"
            type="password"
            onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
          />
          <Style.RoleButtons>
            <ButtonComponent placeholder="Change" type="submit" onClick={handleChangePass} />
          </Style.RoleButtons>
        </Style.RightPanel>
      </Style.Container>
    </main>
  );
};

export default ResetPass;

