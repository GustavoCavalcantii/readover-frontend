import React, { useEffect, useRef, useState } from "react";
import * as Style from "./styles";
import { InputComponent } from "../../../components/TextInput";
import { FaRegUser } from "react-icons/fa";
import { ProfileComponent } from "../../../components/Profile";
import { ButtonComponent } from "../../../components/Button";
import { TextAndValue } from "../../../components/TitleAndValue";
import Navbar from "../../../components/Navbar/Admin";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoSchoolOutline } from "react-icons/io5";
import { logout } from "../../../services/Auth/LogoutService";
import { ApiService } from "../../../services/ApiService";
import { editProfile } from "../../../services/User/EditService";
import { requireEmail } from "../../../services/Auth/RequireEmailService";
import { User } from "../../../types/services/user";
import { getUserInfo } from "../../../services/User/GetInfoUser";
import { requirePassword } from "../../../services/Auth/RequirePasswordService";
import { getImageUrl } from "../../../services/Images/FileUtils";
import { uploadImage } from "../../../services/User/UploadImageService";
import WarnComponent from "../../../components/WarnComponent";

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({ username: "", grade: "" });
  const [message, setMessage] = useState({ message: "", type: "" });


  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    document.title = "Perfil | Readover";
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setImageFile(file);
    }
  };


  useEffect(() => {
    const updateProfile = async () => {
      const userInfo = await getUserInfo(ApiService);
      setUser(userInfo);
    };
    updateProfile();
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      if (!user) return;
      const imageUrl = await getImageUrl(user.image, "usuario");

      console.log(imageUrl);

      setImagePreview(imageUrl || null);
    };
    fetchImage();
  }, [user]);


  const handleEmail = async () => {
    try {
      const response = await requireEmail(ApiService);

      if (response.type != "success") {
        setMessage({
          message: response.message,
          type: "danger"
        });
        return;
      }

      setEdit(false);

      setMessage({
        message: "Check your email",
        type: "sucess"
      });
    } catch (e) {
      console.warn("Erro ao editar perfil", e);
      setMessage({
        message: "Unknown Error",
        type: "danger"
      });
    }
  };

  const handlePassword = async () => {
    try {
      const response = await requirePassword(ApiService);

      if (response.type != "success") {
        setMessage({
          message: response.message,
          type: "danger"
        });
        return;
      }

      setEdit(false);

      setMessage({
        message: "Check your email",
        type: "sucess"
      });
    } catch (e) {
      console.warn("Erro ao editar perfil", e);
      setMessage({
        message: "Unknown Error",
        type: "danger"
      });
    }
  };

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([value]) => value !== "")
    );

    if (Object.keys(filteredData).length === 0) {
      setMessage({
        message: "At least one field must be filled.",
        type: "danger"
      });
      return;
    }

    try {
      const response = await editProfile(ApiService, filteredData);

      if (response.type != "success") {
        setMessage({
          message: response.message,
          type: "danger"
        });
        return;
      }

      const updatedUserInfo = await getUserInfo(ApiService);
      setUser(updatedUserInfo);
      setEdit(false);

      setMessage({
        message: "Profile updated successfully",
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

  const genForms = () => {
    return (
      <Style.FormContainer onSubmit={handleForm}>
        <Style.InputChange>
          <TextAndValue title="Email" value={user?.email ?? ""} />
          <ButtonComponent placeholder="Change" onClick={handleEmail} />
        </Style.InputChange>
        <Style.InputChange>
          <TextAndValue title="Password" value="*******" />
          <ButtonComponent placeholder="Change" onClick={handlePassword} />
        </Style.InputChange>
        <InputComponent icon={<FaRegUser />} type="text" name="Name"
          onChange={(e) => setData({ ...data, username: e.target.value })}
          placeholder={user?.username ?? ""} />
        <InputComponent
          name="Grade"
          icon={<IoSchoolOutline />}
          placeholder={user?.grade ?? ""}
          type="text"
          onChange={(e) => setData({ ...data, grade: e.target.value })}
        />
        <Style.ButtonWrapper>
          <ButtonComponent
            placeholder="Cancel"
            onClick={() => setEdit(false)}
          />
          <ButtonComponent placeholder="Save" type="submit" />
        </Style.ButtonWrapper>
      </Style.FormContainer>
    );
  };

  const genValues = () => {
    return (
      <>
        <TextAndValue title="Email" value={user?.email ?? ""} />
        <TextAndValue title="Password" value="*******" />
        <TextAndValue title="Nome" value={user?.username ?? ""} />
        <TextAndValue title="Grade" value={user?.grade ?? ""} />

        <ButtonComponent placeholder="Edit" onClick={() => setEdit(true)} />
      </>
    );
  };

  const handleLogout = async () => {
    await logout(ApiService);
    window.location.reload();
  }

  const handleSave = async () => {
    if (!imageFile) {
      setMessage({
        message: "Choose Profile Image",
        type: "danger"
      });
      return;
    }

    try {
      await uploadImage(ApiService, imageFile);
      setMessage({
        message: "Profile image updated",
        type: "success"
      });
    }
    catch (error) {
      setMessage({
        message: "Unknown Error",
        type: "danger"
      });
    }
  }


  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Style.HeaderContent>
        <Style.BackButton onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </Style.BackButton>
        <Style.HeaderTitle>{"My Account"}</Style.HeaderTitle>
        {message && message.message && (
          <WarnComponent
            value={message.message}
            type={message.type as "danger" | "success"}
          />
        )}
      </Style.HeaderContent>
      <main>
        <Style.AppContainer>
          <Style.Container>
            <Style.InputContainer>
              {edit ? genForms() : genValues()}
            </Style.InputContainer>

            <Style.SelfContainer>
              <ProfileComponent
                fileInputRef={fileInputRef}
                onChange={handleFileChange}
                image={imagePreview}
              />
              <ButtonComponent placeholder="Save" onClick={handleSave} />
              <ButtonComponent placeholder="Logout" onClick={handleLogout} />
            </Style.SelfContainer>
          </Style.Container>
        </Style.AppContainer>
      </main>
    </>
  );
};

export default Profile;