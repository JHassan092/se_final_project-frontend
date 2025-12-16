import ModalWithForm from "./ModalWithForm";

import "../blocks/LoginModal.css";
import { useState } from "react";

export default function LoginModal({
  isOpen,
  handleModalClose,
  onLogin,
  switchToRegister,
  error,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <ModalWithForm
      title="Login"
      buttonText="Log In"
      isOpen={isOpen}
      handleModalClose={handleModalClose}
      onSubmit={handleSubmit}
      onSwitch={switchToRegister}
      switchText="Register"
    >
      {error && <p className="modal__error">{error}</p>}

      <input
        className="modal__input"
        type="email"
        name="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="modal__input"
        type="password"
        name="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </ModalWithForm>
  );
}
