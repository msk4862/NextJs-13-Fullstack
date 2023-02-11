export const AuthFormModes = {
  register: 'register',
  signin: 'signin',
};

export const RegisterContent = {
  linkUrl: '/signin',
  linkText: 'Already have an account?',
  header: 'Create a new Account',
  subheader: 'Just a few things to get started',
  buttonText: 'Create new account',
};

export const SigninContent = {
  linkUrl: '/register',
  linkText: "Don't have an account?",
  header: 'Welcome Back',
  subheader: 'Enter your credentials to access your account',
  buttonText: 'Sign In',
};

export const EmailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
