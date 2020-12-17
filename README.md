# Create your first Mailchimp email using React.js for your marketing campaign.

Want a subscription on your website to promote your products or tech? Than you came to the right place! This will be my first time making it, but I'm going to show you one of the ways to create a marketing mail using Mailchimp. In this article I will talk about my own journey to find out what a good way is to promote your website. I'm going to do that with my favorite framework, React.js. I'm going to show how your create a Signup form using Mailchimp and react.js, but not only that. But I'm also show you how to implemtent styling to your signup form.

### First things first, what is Mailchimp? 

Mailchimp is a marketing automation platform and email marketing place. Used by loads of companies to send there newsletter or other information that the want to share with there community. You can use it for sending out emails or thinks like surveys. Today I will show how you can create an Signup form.

### Creating a React application

So let's start with creating a React application and what better way to do that then using a create react app. 

 Open your CMD (Command Prompt) on the folder that you wanted your project in and place:
 ```sh
$ npx create-react-app YourAppName
$ cd YourAppName
$ npm start
```
And there you go, your application is now running and is good to go! If it does not work make sure to have node on your device. 
> If you have other issues got to the [React documentation](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app) for more info.

### Using a Mailchimp plugin

So we have our application running but now we need to create something for Mailchimp, best way to use is a Mailchimp package. In this example I used [`react-mailchimp-subscribe`](https://www.npmjs.com/package/react-mailchimp-subscribe). It is easy to use and you have a nice way to implement your own styling what I am going to show later in this article.

### Get your own Mailchimp URL (key)
Before we implement this plugin we need to have our own Mailchimp URL that we can use in the Mailchimp plugin. So we go step by step to get our own URL. 
 - Go to [Mailchimp](https://login.mailchimp.com/) and create an account.
 - Once your logged in you can click on `Create` on your homepage and than choose `Signup form`
 - You can choose `Embedded forms`and click on begin.
 - There you can see on the right side a preview for using mailchamp if you are using plain html. But the only thing we need is the mailchimp URL wich you can find in the `Copy/paste onto your site`section on the bottom right and go to `form action` and copy the `https`link.
  
  Now you got your own Mailchimp URL. To make sure no one is making a copy of your Mailchimp URL we are placing you personal code in the `.env` file. You can create a new file called `.env` and place it outside your `src` file. Once your got your file simply add this line with your own Mailchimp URL.
```sh
REACT_APP_MAILCHIMP_URL='url goes here'
```


### Implement plugin

To implement this plugin you have 2 diffrent ways. The easy way with only implenend the plugin without custom styling. And offcourse the one with custom styling. So I am going to show how you can use them both. 

#### The basic implementation

Now you have the Mailchimp URL we can start with downloading the plugin.
Like a said we are using [`react-mailchimp-subscribe`](https://www.npmjs.com/package/react-mailchimp-subscribe), you can simply add the plugin in the cmd onto your app.
 ```sh
npm i react-mailchimp-subscribe --save-dev
```

> --save-dev is used for putting your plugin in your develop dependencie in the package.json.

 After that is installed you can go to your `src` file and add the Mailchimp component in the `app.js` like this.
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
> All other code can be removed in that file. Make sure you are delete the files that are linked to this file.
> Also, make sure to restart your `npm start` because you have added the URL key in the new `.env` file. And you should have a working subscription for your mailchimp mail!


#### The custom Mailchimp form  implementation
If you want the custom styling I suggest that you have used the basic implementation and I will go on from there. To create your custom form you have to create a custom form component. there you can create a simple form with 2 elements, a email input field and a submit button. You can create a `component` folder in the `src` file. There you can add a new file called customForm.js

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
As you can see in the example above I have a couple classnames. I also use SCSS in this application so here are a couple steps how you can implement SCSS styling. 

 - first go to back to your `CMD` and place the follwowing line 
 ```sh
 npm i node-sass --save-dev
 ```
 
Now you can create a new file in the `src` called `app.scss`. Here you can implement all your styling files like this. And it would be compiled and shown on your application.

> If you don't know how to use SCSS look at this [SCSS tutorials](https://www.w3schools.com/react/react_sass.asp)

```sh
//basic styling
@import "../src/sass/colors";
@import "../src/sass/mixins";
@import "../src/sass/normalize";
@import "../src/sass/typography";

//components
@import "../src/sass/components/customForm.scss";
```
Now you have to implement the `app.scss` in the `app.js` and there are a couple other changes that are diffrent from the basic implementation. Best thing about implementing and include the other syling files is that you don't have to import it somewhere else.

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

### style your status information from the Mailchimp form
Now you can create your own styling file for your component, for example `customForm.scss`.
If you wanted to create your own status styling for sending, error and success you have to implement te following code:
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

In this peace of code you can fill in the className and use it in the `customForm.scss` file. This part you can paste in your `customForm.js` like this.
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
      )}
```

And there you have it, your own custom email signup form in your React application created with Mailchamp.


> For my appliaction I created a page not found (404) and in that page I want to give people a option to subscribe to our news letter and sign up with there e-mail. I have added styling to the page
that you can find back on my repository on [github](https://github.com/LuukGille/MailchimpApp).
