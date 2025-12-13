import ModalWithForm from "./ModalWithForm";

import "../blocks/LoginModal.css";

export default function LoginModal({
  isOpen,
  handleModalClose,
  onLogin,
  switchToRegister,
}) {
  return (
    <ModalWithForm
      title="Login"
      buttonText="Log In"
      isOpen={isOpen}
      handleModalClose={handleModalClose}
      onSubmit={onLogin}
      onSwitch={switchToRegister}
      switchText="Register"
    >
      <input
        className="modal__input"
        type="email"
        name="email"
        placeholder="email"
      />
      <input
        className="modal__input"
        type="password"
        name="password"
        placeholder="password"
      />
    </ModalWithForm>
  );
}
