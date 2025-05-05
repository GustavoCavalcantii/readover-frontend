import React from "react";
import { Container, GenderContainer, Genders, Title } from "./styles";
import { FaX } from "react-icons/fa6";
import { SidebarProps } from "../../types/components/sideBar";
import { truncateText } from "../../utils/TextUtils";

export const Sidebar: React.FC<SidebarProps> = ({
  allGenders,
  selectedGenders,
  onToggleGender,
}) => {
  const unselectedGenders = allGenders.filter(
    (g) => !selectedGenders.includes(g)
  );

  return (
    <Container>
      <Title>Filters:</Title>

      {/* Gêneros selecionados - com X */}
      {selectedGenders.length > 0 && (
        <Genders>
          {selectedGenders.map((gender, index) => (
            <GenderContainer title={gender} key={`sel-${index}`} onClick={() => onToggleGender(gender)}>
              {truncateText(gender, 8)} <FaX />
            </GenderContainer>
          ))}
        </Genders>
      )}

      {/* Gêneros ainda não selecionados */}
      <Genders>
        {unselectedGenders.map((gender, index) => (
          <GenderContainer title={gender} key={`un-${index}`} onClick={() => onToggleGender(gender)}>
            {truncateText(gender, 8)}
          </GenderContainer>
        ))}
      </Genders>
    </Container>
  );
};