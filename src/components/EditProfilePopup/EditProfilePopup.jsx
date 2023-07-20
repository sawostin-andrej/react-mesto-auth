import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isSending,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [value, error, isValid, isInputValid, handleChange, reset, setValues] =
    useFormValidation();

  useEffect(() => {
    setValues("title", currentUser.name);
    setValues("subtitle", currentUser.about);
  }, [currentUser, setValues]);

  function resetAfterClose() {
    onClose();
    reset({ title: currentUser.name, subtitle: currentUser.about });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ title: value.title, subtitle: value.subtitle }, reset);
  }

  return (
    <PopupWithForm
      name="edittheform"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={resetAfterClose}
      isValid={isValid}
      isSending={isSending}
      onSubmit={handleSubmit}
    >
      <input
        className={`popup__input ${
          isInputValid.title === undefined || isInputValid.title
            ? ""
            : "popup__input_type_error"
        }`}
        type="text"
        name="title"
        placeholder="Имя"
        minLength={2}
        maxLength={40}
        required
        id="name-input"
        value={value.title ? value.title : ""}
        disabled={isSending}
        onChange={handleChange}
      />
      <span className="popup__error" id="name-input-error">
        {error.title}
      </span>
      <input
        className={`popup__input ${
          isInputValid.subtitle === undefined || isInputValid.subtitle
            ? ""
            : "popup__input_type_error"
        }`}
        type="text"
        name="subtitle"
        placeholder="О себе"
        minLength={2}
        maxLength={200}
        required
        id="text-input"
        value={value.subtitle ? value.subtitle : ""}
        disabled={isSending}
        onChange={handleChange}
      />
      <span className="popup__error" id="text-input-error">
        {error.subtitle}
      </span>
    </PopupWithForm>
  );
}