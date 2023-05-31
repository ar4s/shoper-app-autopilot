import React from "react";

interface LoaderProps {
  size: "s" | "l" | "xl";
  display?: "center";
}

export const Loader: React.FC<LoaderProps> = ({ size, display }) => {
  const Main = () => <span className={`a-loader a-loader_${size}`}></span>;

  if (display === "center") {
    return (
      <div className="row row_vcenter row_hcenter">
        <Main />
      </div>
    );
  }
  return <Main />;
};
