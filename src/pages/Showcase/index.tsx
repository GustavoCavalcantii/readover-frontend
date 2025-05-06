import React from "react";
import Navbar from "../../components/Navbar/Showcase";
import { ButtonComponent } from "../../components/Button";
import libraryImage from "../../assets/imgs/library.png";
import libraryLayout from "../../assets/imgs/libraryLayout.png";
import Footer from "../../components/Footer";
import * as Style from "./styles";

const Home: React.FC = () => {
  return (
    <Style.Container>
      <Style.HeroSection id="home">
        <Navbar />

        <Style.HeroContent>
          <h1>Welcome to Readover</h1>
          <p>
            Discover a world of stories, knowledge, and imagination. Dive into
            our collection and explore books that inspire, teach, and entertain.
          </p>

          <a href="/auth">
            <ButtonComponent placeholder="Start Reading" type="button" isFull />
          </a>
        </Style.HeroContent>
      </Style.HeroSection>

      <Style.AboutSection id="about-us">
        <Style.AboutHeader>
          <h1>About Us</h1>
        </Style.AboutHeader>
        <span>
        {`Readover is a system that makes it easier to manage your collection
                  with a practical and efficient system. Control loans, returns,
                and keep your library always organized!`}
          <img src={libraryImage} alt="ETEC Ermelinda" />
        </span>
      </Style.AboutSection>

      <Style.LayoutSection id="layout">
        <Style.LayoutHeader>
          <h1>Layout</h1>
        </Style.LayoutHeader>
        <span>
          <img src={libraryLayout} alt="ETEC Layout" />
        </span>
      </Style.LayoutSection>

      <Footer />
    </Style.Container>
  );
};

export default Home;