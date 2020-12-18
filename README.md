# Create your first Mailchimp signup using React.js for your marketing campaign.

Want a subscription on your website to promote your products or tech with email? Then you came to the right place! I am going to show you one of the ways to create a marketing email using Mailchimp. In this article, I will show you how to create a basic and custom Mailchimp subscription. I am going to do that with my favorite framework, React.js.

### First things first, what is Mailchimp?

Mailchimp is a marketing automation platform and email marketing place. Used by loads of companies to send their newsletter or other information that they want to share with their community. You can use it for sending out emails or things like surveys. Today I will show how you can create a signup form.

### Creating a React application

So let us start with creating a React application and what better way to do that than using a create-react-app. This is how it works on Windows. Open your CMD (Command Prompt) on the folder that you wanted your project in and place:

 ```sh
$ npx create-react-app YourAppName
$ cd YourAppName
$ npm start
```

And there you go, your application is now running and is good to go!
> If it does not work make sure to have a node on your device. If you have other issues got to the [React documentation](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app) for more info.

### Using a Mailchimp NPM package

So we have our application running but now we need to create something for Mailchimp, the best thing to use is a Mailchimp package. In this example I used [`react-mailchimp-subscribe`](https://www.npmjs.com/package/react-mailchimp-subscribe). It is easy to use and you have a nice way to implement your own styling what I am going to show later in this article.

### Get your own Mailchimp URL (key)
Before we implement this package we need to have our own Mailchimp URL that we can use in the Mailchimp package. So we go step by step to get our Mailchimp URL.
 - Go to [Mailchimp](https://login.mailchimp.com/) and create an account. Set everything up until you are at your dashboard.
 - Once you are logged and all setup, you can click on `Create` on your homepage and then choose `Signup form`
 - You can choose `Embedded forms` and use choose your company. Then click on begin.
 - There you can see on the right side a preview for using Mailchimp if you are using plain HTML. But the only thing we need is the Mailchimp URL which you can find in the `Copy/paste onto your site` section on the bottom right and go to `form action` and copy the `HTTPS` link.

Now you got your own Mailchimp URL. To make sure no one is making a copy of your Mailchimp URL we are placing your personal code in the `.env` file. You can create a new file called `.env` and place it outside your `src` folder. Once you got your file simply add this line with your own Mailchimp URL.

```sh
REACT_APP_MAILCHIMP_URL='url goes here'
```

### Implement package

To implement this package you have 2 different ways. The easy way with only implement the plugin without custom styling. And of course the one with custom styling. So I am going to show how you can use them both.

#### The basic Mailchimp implementation

Because you have the Mailchimp URL we can start with downloading the plugin. Like a said we are using [`react-mailchimp-subscribe`](https://www.npmjs.com/package/react-mailchimp-subscribe), you can simply add the plugin in the CMD onto your app.

 ```sh
npm i react-mailchimp-subscribe --save-dev
```

> --save-dev is used for putting your packages in your develop dependencie in the package.json.

After that is installed you can go to your `src` folder and add the Mailchimp component in the `app.js` like this.

```sh
import MailchimpSubscribe from "react-mailchimp-subscribe";

function App() {
    return (
        <div>
            <p>Sign up with your email to subscribe!</p
            <MailchimpSubscribe url={process.env.REACT_APP_MAILCHIMP_URL} />
        </div>
     );
 }

export default App;
```
> All other code can be removed in that file. Make sure to delete all other files that are linked to this file, because you do not need them anymore.
> Also, make sure to restart your `npm start` because you have added the URL key in the new `.env` file.

And you should have a working subscription for your Mailchimp mail!
#### The custom Mailchimp form implementation
If you want the custom styling I suggest that you have used the basic implementation and I will go on from there. To create your custom form you have to create a custom form component. There you can create a simple form with 2 elements, an email input field, and a submit button. You can create a `component` folder in the `src` file. There you can add a new file called `customForm.js`

```sh
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
      <input className="customInput"
        ref={node => (email = node)}
        type="email"
      />
      <button className="customButton" onClick={submit}>
        Subscribe
      </button>
    </div>
  );
};

export default CustomForm
```

#### How to use styling in your custom form
As you can see in the example above I have a couple of classNames. I also use SCSS in this application so here are a couple of steps on how you can implement SCSS styling. First, go back to your CMD and place the following line.

 ```sh
 npm i node-sass --save-dev
 ```

Now you can create a new file in the `src` called `app.scss`. Here you can implement all your styling files. And it would be compiled and shown on your application.

> If you do not know how to use SCSS look at this [SCSS tutorials](https://www.w3schools.com/react/react_sass.asp)

```sh
//basic styling
@import "../src/sass/colors";
@import "../src/sass/mixins";
@import "../src/sass/normalize";
@import "../src/sass/typography";

//components
@import "../src/sass/components/customForm.scss";
```
Now you have to import the `app.scss` in the `app.js` and there are a couple of other changes that are different from the basic implementation. The best thing about including the other styling files in `app.scss` is that you do not have to import them somewhere else.

```sh
import './app.scss'
import CustomForm from './components/customForm.js'


function App() {
  return (
    <CustomForm />
  );
}

export default App;
```

### Style your status information from the Mailchimp form
Now you can create your own styling file for your component, for example `customForm.scss`. Make sure to @import them to your `app.scss` like the example above.

```sh
.customForm {
    display: flex;
    flex-direction: column;
    position: relative;
    margin-top: 50px;
    width: 400px;
    
    &Success {
        position: absolute;
        top: 70px;
        left: 14px;
    }

    &Error {
        position: absolute;
        top: 70px;
        left: 14px;
        width: 700px;
        color: rgba(255, 0, 0, 1);
        text-shadow: 0 0 1px rgba(202, 0, 0, 0.4), 0 0 2px rgba(255, 0, 0, 0.8);
    }

    &Sending {
        position: absolute;
        top: 70px;
        left: 14px;
    }
}
```

If you wanted to create your own status styling for sending, error, and success. You have to implement the following code in `customForm.js`.


```sh
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
```

In this piece of code, you can fill in the classNames and use them in the `customForm.scss` file. This part you can paste in your `customForm.js` like this.

```sh
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
```

And there you have it, your own custom email signup form in your React application created with Mailchimp. From here, you can add more styling to create the actual page where you want to use the subscription.


> For more information about the code, I created a small application. I created a page not found (404) . I want to give people an option to subscribe to our newsletter and sign up with their email. You can find the custom form for Mailchimp on my [github](https://github.com/LuukGille/MailchimpApp).

Thank’s for reading this article! If you have any questions or feedback feel free to leave a comment!

Happy coding!
