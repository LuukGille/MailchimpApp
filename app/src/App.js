import '../src/sass/app.scss'
import MailchimpSubscribe from "react-mailchimp-subscribe"

function App() {
  return (
    <div className="section">welcome world
        Subscribe
        <MailchimpSubscribe url={process.env.REACT_APP_MAILCHIMP_URL} />
    </div>
  );
}

export default App;
