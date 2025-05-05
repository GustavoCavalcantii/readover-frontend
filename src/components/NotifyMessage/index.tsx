import React, { useEffect, useState } from "react";
import * as Style from "./styles";
import { ErrorNotificationsProps } from "../../types/components/errorNotification";

export const ErrorNotifications: React.FC<ErrorNotificationsProps> = ({ errors }) => {
  const [activeErrors, setActiveErrors] = useState<string[]>([]);

  useEffect(() => {
    setActiveErrors((prev) => [...prev, ...errors]);
  }, [errors]);

  const dismissError = (index: number) => {
    setActiveErrors((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Style.Wrapper>
      {activeErrors.map((error, index) => (
        <Style.Notification key={index}>
          <Style.Message>{error}</Style.Message>
          <Style.CloseButton onClick={() => dismissError(index)}>×</Style.CloseButton>
        </Style.Notification>
      ))}
    </Style.Wrapper>
  );
};