import ModalWithForm from "./ModalWithForm";

import "../blocks/RegisterModal.css";

export default function RegisterModal({
  isOpen,
  handleModalClose,
  onRegister,
  switchToLogin,
}) {
  return (
    <ModalWithForm
      title="Register"
      buttonText="Register"
      isOpen={isOpen}
      handleModalClose={handleModalClose}
      onSubmit={onRegister}
      onSwitch={switchToLogin}
      switchText="Login"
    >
      <input
        className="modal__input"
        type="text"
        name="username"
        placeholder="username"
        required
      />
      <input
        className="modal__input"
        type="email"
        name="email"
        placeholder="email"
        required
      />
      <input
        className="modal__input"
        type="password"
        name="password"
        placeholder="password"
        required
      />
    </ModalWithForm>
  );
}
