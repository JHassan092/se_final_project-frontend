import ModalWithForm from "./ModalWithForm";

export default function LoginModal({
  isOpen,
  handleClose,
  onLogin,
  switchToRegister,
}) {
  return (
    <ModalWithForm
      title="Login"
      buttonText="Log In"
      isOpen={isOpen}
      handleModalClose={handleClose}
      onSubmit={onLogin}
      onSwitch={switchToRegister}
      switchText="Register"
    >
      <input type="email" name="email" placeholder="email" />
      <input type="password" name="password" placeholder="password" />
    </ModalWithForm>
  );
}
