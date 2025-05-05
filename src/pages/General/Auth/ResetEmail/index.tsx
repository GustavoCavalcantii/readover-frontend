import React, { useState } from "react";
import * as Style from "./styles";
import { ButtonComponent } from "../../../../components/Button";
import { InputComponent } from "../../../../components/TextInput";
import { FaRegEnvelope } from "react-icons/fa";
import { resetEmail } from "../../../../services/Auth/ResetEmailService";
import { ApiService } from "../../../../services/ApiService";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../../../utils/auth";

const ResetEmail: React.FC = () => {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const query = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const [message, setMessage] = useState({message: "", type: ""});
  const token = query.get("token");

  const [data, setData] = useState({ email: "", })

  if (!token || token.trim() === "") {
    navigate("/auth");
    return;
  }

  const handleChangeEmail = async () => {

    for (const key in data) {
      if (!data[key as keyof typeof data]) {
        setMessage({message: "All fields must be filled.", type: "danger"});
        return;
      }
    }

    try {
      const payload =
      {
        email: data.email,
        resetToken: token
      }

      const response = await resetEmail(ApiService, payload);

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
          <Style.Title>Reset Email</Style.Title>
          <Style.Subtitle>
            Make sure it's the email you normally use
          </Style.Subtitle>
          <InputComponent
            icon={<FaRegEnvelope />}
            placeholder="Email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            type="email"
          />
          <Style.RoleButtons>
            <ButtonComponent placeholder="Change" type="submit" onClick={handleChangeEmail}/>
          </Style.RoleButtons>
        </Style.RightPanel>
      </Style.Container>
    </main>
  );
};

export default ResetEmail;
