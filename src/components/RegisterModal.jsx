import ModalWithForm from "./ModalWithForm";

export default function RegisterModal({
  isOpen,
  handleClose,
  onRegister,
  switchToLogin,
}) {
  return (
    <ModalWithForm
      title="Register"
      buttonText="Register"
      isOpen={isOpen}
      handleModalClose={handleClose}
      onSubmit={onRegister}
      onSwitch={switchToLogin}
      switchText="Login"
    >
      <input type="text" name="username" placeholder="username" required />
      <input type="email" name="email" placeholder="email" required />
      <input type="password" name="password" placeholder="password" required />
    </ModalWithForm>
  );
}
