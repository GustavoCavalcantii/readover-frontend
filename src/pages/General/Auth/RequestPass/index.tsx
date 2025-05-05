import React, { useEffect, useState } from "react";
import * as Style from "./styles";
import { ButtonComponent } from "../../../../components/Button";
import { InputComponent } from "../../../../components/TextInput";
import { FaRegEnvelope } from "react-icons/fa";
import { requirePassword } from "../../../../services/Auth/RequirePasswordService";
import { ApiService } from "../../../../services/ApiService";
import WarnComponent from "../../../../components/WarnComponent";

const RequestPass: React.FC = () => {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    document.title = "Request Pass | Readover";
  }, []);


  const [message, setMessage] = useState({ message: "", type: "" });

  const [data, setData] = useState({ email: "" });

  const handlePassword = async () => {
    try {
      const response = await requirePassword(ApiService, data);

      if (response.type != "success") {
        setMessage({
          message: response.message,
          type: "danger"
        });
        return;
      }

      setMessage({
        message: "Check your email",
        type: "success"
      });
    } catch (e) {
      console.warn("Erro ao editar perfil", e);
      setMessage({
        message: "Unknown Error",
        type: "danger"
      });
    }
  };

  return (
    <main style={{ height: "100vh" }}>
      <Style.Container>
        <Style.RightPanel onSubmit={handleLogin}>
          <Style.Title>Request Password</Style.Title>
          {message && message.message && (
            <WarnComponent
              value={message.message}
              type={message.type as "danger" | "success"}
            />
          )}
          <Style.Subtitle>
            Enter your email address and we’ll send you a link to reset your
            password.
          </Style.Subtitle>
          <InputComponent
            icon={<FaRegEnvelope />}
            placeholder="Email"
            type="email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <Style.RoleButtons>
            <ButtonComponent placeholder="Change" type="submit" onClick={handlePassword} />
          </Style.RoleButtons>
        </Style.RightPanel>
      </Style.Container>
    </main>
  );
};

export default RequestPass;
