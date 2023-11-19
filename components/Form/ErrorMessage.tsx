import React, { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <p className="p-1 text-danger italic" data-testid="error-message">
      {children}
    </p>
  );
};

export default ErrorMessage;
