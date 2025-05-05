import React, { useState } from "react";
import * as Style from "../styles";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { NavbarProps } from "../../../types/components/navbar";

const Navbar: React.FC<NavbarProps> = ({ onChange, onClick, value, isSearch = false, placeholder = "Search books..." }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Style.NavbarContainer>
      <Style.LogoWrapper>
        <Style.Logo>READOVER</Style.Logo>
        <Style.ToggleButton onClick={() => setDropdownOpen(!dropdownOpen)}>
          {dropdownOpen ? <FaTimes size={22} color="white" /> : <FaBars size={22} color="white" />}
        </Style.ToggleButton>
      </Style.LogoWrapper>

      <Style.DropdownContent $open={dropdownOpen}>
        <Style.NavLinks>
          <a href="/user">Home</a>
          <a href="/user/loans">My Loans</a>
          <a href="/user/profile">Account</a>
        </Style.NavLinks>
        <Style.SearchWrapper>
          <Style.SearchInput type="text" placeholder={placeholder} onChange={onChange} value={value} />
          <Style.SearchButton onClick={onClick}><FaMagnifyingGlass /></Style.SearchButton>
        </Style.SearchWrapper>
      </Style.DropdownContent>

      <Style.DesktopContent>
        <Style.NavLinks>
          <a href="/user">Home</a>
          <a href="/user/loans">My Loans</a>
          <a href="/user/profile">Account</a>
        </Style.NavLinks>
        {isSearch ? (
          <>
            <Style.SearchWrapper>
              <Style.SearchInput type="text" placeholder={placeholder} onChange={onChange} value={value} />
              <Style.SearchButton onClick={onClick}><FaMagnifyingGlass /></Style.SearchButton>
            </Style.SearchWrapper>
          </>) : ""
        }
      </Style.DesktopContent>
    </Style.NavbarContainer>
  );
};

export default Navbar;