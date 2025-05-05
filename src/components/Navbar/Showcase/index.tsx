import React, { useState } from "react";
import * as Style from "./styles";
import { FaBars, FaTimes } from "react-icons/fa";
import { ButtonComponent } from "../../../components/Button/index";

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Style.NavbarContainer>
    <Style.LogoWrapper>
        <Style.Logo>READOVER</Style.Logo>
        <Style.ToggleButton onClick={() => setDropdownOpen(!dropdownOpen)}>
        {dropdownOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </Style.ToggleButton>
    </Style.LogoWrapper>

    <Style.DropdownContent $open={dropdownOpen}>
        <Style.NavLinks>
        <a href="#about">About Us</a>
        <a href="#layout">Layout</a>
        <a href="#footer">Information</a>
        </Style.NavLinks>
        <Style.SearchWrapper>
        <a href="/auth">
            <ButtonComponent placeholder="Login" type="button"  />
        </a>
        </Style.SearchWrapper>
    </Style.DropdownContent>

    <Style.DesktopContent>
        <Style.NavLinks>
        <a href="#about">About Us</a>
        <a href="#layout">Layout</a>
        <a href="#footer">Information</a>
        </Style.NavLinks>
        <Style.SearchWrapper>
        <a href="/auth">
            <ButtonComponent placeholder="Login" type="button"  isInverted/>
        </a>
        </Style.SearchWrapper>
    </Style.DesktopContent>
    </Style.NavbarContainer>
  );
};

export default Navbar;