import MailchimpSubscribe from "react-mailchimp-subscribe"
import CustomForm from "../components/customForm"

const errorMessage = () => {
    return (
    <>
        <div className="pageError">
            <div class="overlay"></div>
            <div class="terminal">
            <h1>Error <span class="errorcode">404</span></h1>
            <p class="output">The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
            <p class="output">Please try to <a href="#1">go back</a> or <a href="#2">return to the homepage</a>.</p>
            <p class="output">Good luck.</p>
            <MailchimpSubscribe url={process.env.REACT_APP_MAILCHIMP_URL} render={({ subscribe, status, message }) => (
                    <CustomForm status={status} message={message} onValidated={formData => subscribe(formData)} />
                )}
            />
            </div>
        </div>
    </>
  );
}

export default errorMessage;



