import ModalWithForm from "./ModalWithForm";

import "../blocks/RegisterModal.css";
import { useState } from "react";

export default function RegisterModal({
  isOpen,
  handleModalClose,
  onRegister,
  switchToLogin,
  error,
}) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, username, password });
  };

  return (
    <ModalWithForm
      title="Register"
      buttonText="Register"
      isOpen={isOpen}
      handleModalClose={handleModalClose}
      onSubmit={handleSubmit}
      onSwitch={switchToLogin}
      switchText="Login"
    >
      {error && <p className="modal__error">{error}</p>}

      <input
        className="modal__input"
        type="email"
        name="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="modal__input"
        type="text"
        name="username"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        className="modal__input"
        type="password"
        name="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </ModalWithForm>
  );
}
