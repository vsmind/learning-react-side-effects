import React, { useReducer, useState, useEffect, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

// reducer can be created outside the component scope
const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.includes('@')};
  }

  if (action.type === 'INPUT_BLUR') {
    return {value: state.val, isValid: state.value.includes('@')};
  }

  return {value:'', isValid: false};
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.trim().length > 6};
  }

  if (action.type === 'INPUT_BLUR') {
    return {value: state.val, isValid: state.value.trim().length > 6};
  }
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null });

  const authContext = useContext(AuthContext);

  // Object destructure
  // get value of isValid field from the object and save it to another value (alias assigment)
  const { isValid: emailIsValid } = emailState
  const { isValid: passwordIsValid } = passwordState
  // avoid unnecessary effect execution
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Validation check");
      setFormIsValid(
          emailIsValid && passwordIsValid
      );
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    }
  },[emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: 'USER_INPUT',
      val: event.target.value
    });

    // setFormIsValid(
    //     event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: 'USER_INPUT',
      val: event.target.value
    });

    // setFormIsValid(
    //     emailState.isValid && event.target.value.trim().length > 6
    // )
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);

    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);

    dispatchPassword({type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authContext.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
            label="E-Mail"
            type="email"
               id="email"
            value={emailState.value}
            isValid={emailState.isValid}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
        />
        <Input
            label="Password"
            type="password"
            id="password"
            value={passwordState.value}
            isValid={passwordState.isValid}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
