import React from "react";
import * as Style from "./style";

const Footer: React.FC = () => {
  return (
    <Style.Footer id="footer">
    <Style.FooterInner>
    <Style.FooterColumn>
        <Style.FooterTitle>Readover</Style.FooterTitle>
        <Style.FooterText>
        The best tool to organize <br />
        your library collection
        </Style.FooterText>
    </Style.FooterColumn>

    <Style.FooterColumn>
        <Style.FooterTitle>Navigation</Style.FooterTitle>
        <Style.FooterLink href="#home">Home</Style.FooterLink>
        <Style.FooterLink href="#about-us">About Us</Style.FooterLink>
        <Style.FooterLink href="#layout">Layout</Style.FooterLink>
    </Style.FooterColumn>

    <Style.FooterColumn>
        <Style.FooterTitle>Follow Us</Style.FooterTitle>
        <Style.FooterLink href="https://facebook.com" target="_blank">
        Facebook
        </Style.FooterLink>
        <Style.FooterLink href="https://twitter.com" target="_blank">
        Twitter
        </Style.FooterLink>
        <Style.FooterLink
        href="https://www.instagram.com/bibliotecaetecermelinda187?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
        target="_blank"
        >
        Instagram
        </Style.FooterLink>
    </Style.FooterColumn>

    <Style.FooterColumn>
        <Style.FooterTitle>Contact</Style.FooterTitle>
        <Style.ContactText>etec.ermelinda@gmail.com</Style.ContactText>
        <Style.ContactText>(11) 4154-7142</Style.ContactText>
        <Style.ContactText>
        R. Fernão Dias Falcão, 196 - Centro,
        <br />
        Santana de Parnaíba - SP, <br />
        06501-120
        </Style.ContactText>
    </Style.FooterColumn>
    </Style.FooterInner>

    <Style.Copyright>
    &copy; {new Date().getFullYear()} Readover. All rights reserved.
    </Style.Copyright>
    </Style.Footer>
  );
};

export default Footer;