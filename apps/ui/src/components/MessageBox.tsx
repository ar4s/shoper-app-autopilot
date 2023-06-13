import React from "react";

interface MessageBoxProps {
  message: string;
  fullWidth?: boolean;
}

export const MessageBox: React.FC<MessageBoxProps> = ({
  message,
  fullWidth,
}) => {
  const fullWidthClass = fullWidth ? " message-box_full-width" : "";
  return (
    <div className={`message-box${fullWidthClass}`}>
      <p className="message-box__content">{message}</p>
    </div>
  );
};
