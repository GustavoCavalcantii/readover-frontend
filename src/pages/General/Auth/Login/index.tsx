import React, { useEffect, useState } from "react";
import SignIn from "../Forms/SignIn";
import SignUp from "../Forms/SignUp";
import * as Style from "./styles";
import { ButtonComponent } from "../../../../components/Button";
import { login } from "../../../../services/Auth/LoginService";
import { register } from "../../../../services/Auth/RegisterService";
import { ApiService } from "../../../../services/ApiService";
import WarnComponent from "../../../../components/WarnComponent";

const AuthContainer: React.FC = () => {
  const [type, setType] = useState<"signIn" | "signUp">("signIn");

  useEffect(() => {
    document.title = "Login | Readover";
  }, []);

  const handleOnClick = (text: "signIn" | "signUp") => {
    if (text !== type) {
      setType(text);
    }
  };

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    grade: "",
  });

  const [loginError, loginSetError] = useState("");
  const [error, setError] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    for (const key in loginData) {
      if (!loginData[key as keyof typeof loginData]) {
        loginSetError("All fields must be filled.");
        return;
      }
    }

    if (!emailRegex.test(loginData.email)) {
      loginSetError("Invalid email address.");
      return;
    }

    try {
      const response = await login(ApiService, loginData);

      if (response.type != "success") {
        loginSetError(response.message);
        return;
      }

      window.location.reload();
    } catch (e) {
      console.warn("Erro ao realizar o login", e);
      loginSetError("Unknown Error");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    for (const key in registerData) {
      if (!registerData[key as keyof typeof registerData]) {
        setError("All fields must be filled.");
        return;
      }
    }

    if (registerData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (registerData.grade.length < 3 || registerData.grade.length > 27) {
      setError("Grade must be between 3 and 27 characters.");
      return;
    }

    if (!emailRegex.test(registerData.email)) {
      setError("Invalid email address.");
      return;
    }

    try {
      const response = await register(ApiService, registerData);

      if (response.type != "success") {
        setError(response.message);
        return;
      }

      window.location.reload();
    } catch (e) {
      console.warn("Erro ao realizar o registro", e);
      setError("Unknown Error");
    }
  };

  return (
    <main style={{ height: "100vh" }}>
      <Style.Container $rightPanelActive={type === "signUp"}>
        <Style.FormContainer>
          <SignIn
            onSubmit={handleLogin}
            onChange={setLoginData}
            data={loginData}
            error={
              loginError ? (
                <WarnComponent value={loginError} type="danger" />
              ) : (
                ""
              )
            }
          />
          <SignUp
            onSubmit={handleRegister}
            onChange={setRegisterData}
            data={registerData}
            error={error ? <WarnComponent value={error} type="danger" /> : ""}
          />
        </Style.FormContainer>

        <Style.OverlayContainer className="overlay-container">
          <Style.Overlay className="overlay">
            <Style.OverlayLeft className="overlay-left">
              <h1>Welcome Back!</h1>
              <Style.Subtitle>Upon Readover!</Style.Subtitle>
              <Style.Paragraph>
                To access your account, please log in.
              </Style.Paragraph>
              <ButtonComponent
                placeholder="Sign In"
                type="button"
                onClick={() => handleOnClick("signIn")}
                isInverted={true}
              />
            </Style.OverlayLeft>

            <Style.OverlayRight className="overlay-right">
              <h1>Welcome!</h1>
              <Style.Subtitle>Upon Readover!</Style.Subtitle>
              <Style.Paragraph>
                To create your account, please register.
              </Style.Paragraph>
              <ButtonComponent
                placeholder="Sign Up"
                type="button"
                onClick={() => handleOnClick("signUp")}
                isInverted={true}
              />
            </Style.OverlayRight>
          </Style.Overlay>
        </Style.OverlayContainer>
      </Style.Container>
    </main>
  );
};

export default AuthContainer;
