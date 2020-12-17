const CustomForm = ({ status, message, onValidated }) => {
  let email;
  const submit = () =>
    email &&
    email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value,
    });

  return (
    <div className="customForm">
      {status === "sending" && <div className="customFormSending">sending...</div>}
      {status === "error" && (
        <div className="customFormError"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div className="customFormSuccess"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      <input className="customInput"
        ref={node => (email = node)}
        type="email"
        tabindex="1"
      />
      <button className="customButton" onClick={submit}>
      </button>
    </div>
  );
};

export default CustomForm