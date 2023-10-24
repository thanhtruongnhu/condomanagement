import React, { useRef } from "react";
import Button from "@mui/material/Button";
import { CustomButtonProps } from "../../interfaces/common";

const CustomButton = ({
  title,
  backgroundColor,
  color,
  fullWidth,
  icon,
  handleClick,
  disabled,
}: CustomButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files![0];
    console.log("Selected file:", selectedFile);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <Button
        disabled={disabled}
        sx={{
          flex: fullWidth ? 1 : "unset",
          padding: "10px 15px",
          width: fullWidth ? "100%" : "fit-content",
          minWidth: 100,
          backgroundColor,
          color,
          fontSize: 16,
          fontWeight: 700,
          gap: "10px",
          textTransform: "capitalize",
          "&:hover": {
            opacity: 0.9,
            backgroundColor,
          },
        }}
        onClick={() => {
          if (title === "Upload" && fileInputRef.current) {
            fileInputRef.current.click();
          }
          if (handleClick) {
            handleClick();
          }
        }}
      >
        {icon}
        {title}
      </Button>

      <input
        ref={fileInputRef}
        hidden
        accept="*"
        type="file"
        onChange={(e) => {
          handleFileInputChange(e);
        }}
      />
    </div>
  );
};

export default CustomButton;
