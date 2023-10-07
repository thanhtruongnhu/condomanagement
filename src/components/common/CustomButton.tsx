import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import { CustomButtonProps } from "../../interfaces/common";

const CustomButton = ({
  type,
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
    // Handle the selected file here, e.target.files[0]
    const selectedFile = e.target.files![0];
    console.log("Selected file:", selectedFile);

    // Optionally, you can hide the file input after selection
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <Button
        disabled={disabled}
        type={type === "submit" ? "submit" : "button"}
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
          if (title === "Upload") {
            // Trigger the file input dialog when the button is clicked
            if (fileInputRef.current) {
              fileInputRef.current.click();
            }
          }
          if (handleClick) {
            // Handle the regular button click
            handleClick();
          }
        }}
      >
        {icon}
        {title}
      </Button>

      {/* Hidden file input. This input is only rendered if title === Upload */}
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
