import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  isSending,
}) {
  const [value, error, isValid, isInputValid, handleChange, reset] =
    useFormValidation();

  function resetAfterClose() {
    onClose();
    reset();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ name: value.name, link: value.link }, reset);
  }

  return (
    <PopupWithForm
      name="addCard"
      title="Новое место"
      titleButton="Создать"
      isOpen={isOpen}
      onClose={resetAfterClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      isSending={isSending}
    >
      <input
        className={`popup__input popup__input_name ${
          isInputValid.name === undefined || isInputValid.name
            ? ""
            : "popup__button_invalid"
        } `}
        type="text"
        name="name"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        required
        id="title-input"
        value={value.name ? value.name : ""}
        disabled={isSending}
        onChange={handleChange}
      />
      <span className="popup__error" id="title-input-error">
        {error.name}
      </span>
      <input
        className={`popup__input ${
          isInputValid.link === undefined || isInputValid.link
            ? ""
            : "popup__button_invalid"
        } `}
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        id="link-input"
        value={value.link ? value.link : ""}
        disabled={isSending}
        onChange={handleChange}
      />
      <span className="popup__error" id="link-input-error">
        {error.link}
      </span>
    </PopupWithForm>
  );
}
