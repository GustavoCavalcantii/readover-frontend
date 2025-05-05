import React from "react";
import { LayoutProps } from "../../types/layouts/layout";

const Layout: React.FC<LayoutProps> = ({ children, headerType }) => {
  return (
    <div>
      {{ adm: "", user: "", general: "" }[headerType] ?? ""}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
