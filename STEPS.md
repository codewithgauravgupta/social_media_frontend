# Summary:

* Setup React using create-react-app and webpack.

* React for UI using forms, hooks, states, components, pages. 

* backend integration using axios.

* frontend optimization

* testing UI using Jest and RTL libraries.

* Manual and automated deployment on AWS.

* Optimizing the deployment of a React application

# Create React App

* yarn create react-app social_media_frontend

* cd social_media_frontend/ && yarn start

* Adding the React Router and React Bootstrap: 
    yarn add react-router-dom@6
    yarn add react-bootstrap bootstrap

# Configure browser router

* edit the index.js for browserRouter and import the bootstrap CSS file into the index.js file

# Creating the Home page

* Creating the component and the page, by Create a directory in src called pages. Inside the pages directory, create a new file called `Home.jsx`. This file will contain the UI for the Profile page.

* Registering the page in BrowserRouter with a URL in the App.js file

# Writing the Requests Service

* yarn add axios axios-auth-refresh 

* create a directory called `helpers` in the `src` folder of the React project and we’ll add a file called `axios.js`:

# Creating a protected route wrapper:

* protected routes: Create a new directory in the src directory called `routes` and create a file called `ProtectedRoute.jsx`, and add route in `app.js`.

# Adding a registration page:

* Create registration form, Inside the `src/components/authentication` directory, add a new file called `RegistrationForm.jsx`.

* Registering the registration page route, Inside the src/pages directory, create a file called `Registration.jsx`.

* Next, open App.js and register the page.

* Visit: http://localhost:3000/register/

# Creating the Login Page:

* Create login form, Inside the `src/components/authentication` directory, add a new file called `LoginForm.jsx`.

* Register login page, Inside the `src/pages` directory, create a file called `Login.jsx`.

* Add route to app.jsx.

* Test Login: `http://localhost:3000/login/`

    email: mouse2@yopmail.com
    password: 12345678

# Refactoring the Authentication Flow Code:

* Create custom hook, Inside the `src` directory, create a new directory called `hooks`. This directory will contain all the Hooks.

* Inside the newly created directory, add a file called `user.actions.js`.

* With the functions for retrieving a user, the access and refresh tokens, and the function to set user data in localStorage, we can now call the function in the LoginForm and RegisterForm components.

* We now have a useful Hook, useUserActions, in the user.actions.js file. We will use this Hook to call the login method, replacing the old login logic in the LoginForm.js file.

* Next, we use the other utils functions in the axios helper and the ProtectedRoute component

* We will also tweak axios helper.

* And we are done. We have a pure React logic for the authentication flow, which will help us manage the CRUD operations for the posts and comments.

* We are done with ui for auth, next we will do it for posts. We’ll implement listing, creating, updating, and deleting post features.

# Adding the NavBar and Layout component:

* yarn add timeago.js 
* yarn add swr
* yarn add @ant-design/icons@4.0.0

* Adding the NavBar component, Inside the `src/components/` directory, add a new file called `Navbar.jsx`. 

* In the src directory, add a new file called utils.js. for random avatars function and other common functions for react app.

* Adding the Layout component, In the `src/components` directory, we’ll add a file called `Layout.jsx`. Also add Layout on `Home` page.

# Creating a post and toast component:

* In `src/components`, add a new directory called `posts`. This directory will contain all components used for the post feature. We’ll have components to create a post, display a post, and update a post.

* Inside the newly created directory, add a file called `CreatePost.jsx`. This file will contain the code for the logic and the UI to make a post.

* We need toast component to give feedback of creating a post to user. In `src/components`, create a new file called `Toaster.jsx`.

* Adding the toaster to post creation, In the `CreatePost.jsx` file, we will add new states that we will pass as props to the `Toaster` component

* Adding the CreatePost component to the home page.

* we’ve created a Modal component and a form with React Bootstrap to handle data validation and submission. And because feedback is an important aspect of user experience, we’ve added a toaster with React Bootstrap and integrated it with the useContext Hook to notify the user of the result of the requests.

# Listing and deleting Posts on the Home Page using post component:

* We use the swr library to fetch a list of posts.

* We loop through the list of posts and then pass a post as props to a component called Post, which will show data about a post.

* Inside the `src/components/post/` directory, create a new file called `Post.jsx`. This file will contain the logic to show post data and logic such as like or remove like, deletion, and modification.

* Adding the Post component to the home page

* Lets deal with ... menu to update and delete post, In the `Post.jsx` file, import the Dropdown component from react-bootstrap. Because we will add the logic for post deletion, let’s also import the Toaster component.

* The user can now delete their own post, and that functionality is accessible directly from the Post component.

# Updating a Post and Refactoring:

* The update post feature is similar to `CreatePost.jsx`; the difference is that the `UpdatePost` component will receive a post object as props.

* The update component is called in the Post.jsx file 

* Minor refactoring: Firstly, there is no refresh made when a new post is created. As we did for the UpdatePost.jsx component, we can also pass some props to the CreatePost component, Now, every time a user adds a post, they will see the newly created post on the Home page without needing to reload the page.
    `<CreatePost refresh={posts.mutate} />` in Home.jsx. And we can call the refresh method when a post is successfully created:

    ```javascript
    function CreatePost(props) {
      const { refresh } = props;
      ...
        axiosService
          .post("/post/", data)
          .then(() => {
            ...
            refresh();
          })
      };
    ...
    ```

* Refactoring the Toaster component: The logic to call the component is repeated across all pages that call this component. How can we resolve this? What if we put the Toaster component higher in the component hierarchy and so we are able to call or show the toaster from any child component?

* React provides an interesting way to manage state across parents and child components—context. React Context allows us to share state or modify state across parent and child components more easily, i.e, without the need for explicitly passing prop across the component tree. In the Layout.jsx file, we’ll create a new context using the createContext method

* Then, in the Layout component scope, let’s define the state containing the data that the toaster will use to display information. We will also wrap the component JSX content inside the Context component and add a method to modify the state from any child components of the Layout component.

* we introduced a new function Hook called useMemo, which helps to memorize the context value (caching the value of the context) and avoid the creation of new objects every time there is a rerendering of the Layout component. We will then be able to access the toaster state and call the setToaster function from any child component






* Deleting a comment

* Next updating a comment

* Liking a comment

* User Profiles: Listing profiles on home page. In the src/components file, create a new directory called profile and inside it ProfileCard.jsx 

* import in home.jsx.

* Displaying user information on profile page.

* Configure django to upload files for avatar, Inside the settings.py file of the project:
    # Media files
    MEDIA_URL = '/media/'
    MEDIA_ROOT = BASE_DIR / 'uploads'

* Modify avatar field of user model.

* python manage.py makemigrations
python manage.py migrate

* Configure default avatar, In the settings.py file of the Django project:
    DEFAULT_AVATAR_URL = "https://api.dicebear.com/8.x/personas/svg"

* To create the ProfileDetails component, we have to create the file that will contain the code for this component, add the logic for the navigation, write the UI (JSX), and import the component on the “Profile” page

* Edit profile info

* The React application is nearly done. We have CRUD operations for authentication, posts, comments, and new users. Now, it’s time to focus on the quality and maintainability of our components.

* Testing frontend: 
* yarn add @faker-js/faker 
* yarn add uuid --dev
* yarn add jest-localstorage-mock --dev

* snapshot testing
* yarn add react-test-renderer

* Create a docker image:
    docker build -t django-project .

* Run docker image as container:
    docker run --name django-app -d -p 8000:8000 django-project

* Check running container:
    docker container ps -a

* Check logs of running container:
    docker logs --details django-app

* We must keep Dockerfile and Dockercompose in same directory, the above image we have create and the dcker file for our app will be added as a service in compose, along with other containers.

* pip install gunicorn
* pip install python-dotenv

* Configure env variables

* Config nginx.conf

* docker compose up -d --build

* Execute tests in container: remove all blank tests.py file before: 
    docker compose exec -T api pytest

# Handling the logout with React:

We have already handled the logout on the React application to a certain extent by just deleting the tokens from the local storage. There is nothing big to modify here, we will just add a function to make a request to the API, and if this request is successful, we will delete the tokens and the user from the local storage of the browser. The current logout logic on the React application is handled in the NavBar component.

Inside the useActions Hook function:
```javascript
...
// Logout the user
function logout() {
  return axiosService
    .post(`${baseURL}/auth/logout/`, { refresh: getRefreshToken() })
    .then(() => {
      localStorage.removeItem("auth");
      navigate("/login");
    });
}

// In navbar component
const handleLogout = () => {
    userActions.logout().catch((e) =>
      setToaster({
        type: "danger",
        message: "Logout failed",
        show: true,
        title: e.data?.detail | "An error occurred.",
      })
    );
  };

```





# Manual and Auto Deployment of React app on AWS Simple Storage Service (S3) Bucket:

In development mode, React provides an environment for detecting warnings, as well as tools to detect and fix problems in the application and eliminate potential issues. This adds extra code to the project, increasing the bundle size and resulting in a bigger and slower application.

It is crucial to only deploy production-built applications on the internet because of the user experience (UX). According to Google studies, 53% of users leave a website if it takes more than 3 seconds to load. Therefore, we must build the React application we created and deploy the production version.

In development, the React application runs in development mode or local mode. This is where we can see all the warnings and the traceback in case our code crashes. The production mode requires the developers to build the application. This build minifies the code, optimizes the assets (image, CSS files, and so on), produces lighter source maps, and suppresses the warning messages displayed in development mode.

Therefore, the bundle size of the application is drastically reduced, improving page load speed. Keeping this in mind, we will build a production-ready application and deploy it on AWS S3 as a static website.

AWS S3, It is a cloud-based storage service providing high performance, availability, reliability, security, and ridiculous potential for scaling. AWS S3 is mostly used to store static assets so that they are effectively distributed to the internet, and because of the distribution characteristic, AWS S3 is suitable for hosting static websites.

we’ll create an S3 bucket, upload the content of the built React application, and allow public access from the internet. An S3 bucket is just a public storage resource available in AWS that is like an online folder where we can store objects (like a folder on a Google Drive)

* Add Environment Variables: According to the “Create React App” documentation regarding environment variables, project can consume variables declared in your environment as if they were declared locally in your JS files. By default, you will have NODE_ENV defined for you, and any other environment variables starting with REACT_APP_”.

	Create .env at root of project

	modify some pieces of code at `src/helpers/axios.js` and `src/hooks/user.actions.js`. We must update the baseURL variable to read the values from the .env file:

	In axis.js:
		baseURL: process.env.REACT_APP_API_URL,
	
	In user.actions.js:
		const baseURL = process.env.REACT_APP_API_URL;

* Build react app:
	yarn build

	The yarn build command creates a bundle of static files of a React application. This bundle is optimized enough to go into production.

	The build is available in the newly created `build` directory. Use ls and cd commands to navigate and view the files in the build directory. 

* Manual Deployment:
	
	create an S3 bucket and upload the files and folders.

	In the AWS console menu, choose the S3 service and create a bucket.

	Give bucket name all small case

	disable the “Block all public access” settings so that the React application is visible to the public

	Create Bucket

	select the “Properties” tab, and go to “Static website hosting.” On the page, enable static web hosting

	Fill in “Index document” and “Error document” and submit.

	Note the bucket website endpoint, which will be the URL of your website

	click the “Permissions” tab and select “Bucket Policy.” We will add a policy to grant public access to the bucket, like so:
		{
			"Version": "2012-10-17",
		"Statement": [
		{
		"Sid": "Statement1",
		"Effect": "Allow",
		"Principal": {
		"AWS": "*"
		},
		"Action": "s3:GetObject",
		"Resource": "arn:aws:s3:::<bucketname>/*"
		}
		]
		}

	Upload all files inside `build` to s3, dont upload `build` folder, upload contents of it. Upload files and static folder in steps.

	Add CORS_ALLOW_ORIGINS="S3_WEBSITE_URL" to backend.

* Automated deployment using github actions:

	There is a GitHub action for AWS called `configure-aws-credentials` which we use to configure AWS credentials in the workflow to execute a command to upload the content of the build folder in the S3 bucket.

	We will follow workflow of CI/CD:

		Install the dependencies of the project.

		Run tests to make sure the application won’t break in production and to ensure there areno regressions.

		Run the build command to have a production-ready application.

		Deploy on AWS S3.

	Let’s add a new workflow file in the repository `.github/workflows` for the deployment of the React application. Inside the `.github/workflows` directory, create a file called `deploy-frontend.yml`

		name: Build and deploy frontend
		on:
		 push:
		 branches: [ main ]

	create a job called build-test-deploy. Inside this job, we will write the commands to install the React dependencies, run the tests, build the project, and deploy the application to S3. Let’s start by injecting the environment variables:
