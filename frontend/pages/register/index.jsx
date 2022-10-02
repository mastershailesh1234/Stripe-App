import React, { useRef, useState } from "react";
import classes from "./register.module.css";
import axios from "axios";
import { useEffect } from "react";
import Link from "next/link";
const RegisterPage = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const [loading, setloading] = useState(true);
  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        name: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      console.log(user);
      try {
        await axios.post(
          "https://shailesh-stripe-app.herokuapp.com/api/users/register",
          user
        );
        window.open("/", "_self");
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    setloading(true);
    function getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
    let userId = getCookie("strip-app");
    if (userId) {
      window.open("/userprofile/", "_self");
    }
  }, []);
  return (
    <>
      <div className={`${classes.fullscreenContainer}`}>
        <div className={`${classes.container}`}>
          <h1 className={`${classes.header}`}>Register</h1>
          <form className={`${classes.form}`} onSubmit={handleClick}>
            <div className={`${classes.inputContainer}`}>
              <label for="name">Name</label>
              <input type="text" ref={username} />
            </div>
            <div className={`${classes.inputContainer}`}>
              <label for="email">Email</label>
              <input type="email" required ref={email} />
            </div>
            <div className={`${classes.inputContainer}`}>
              <label for="password">Password</label>
              <input type="password" ref={password} />
            </div>
            <div className={`${classes.inputContainer}`}>
              <label for="password">Password Again</label>
              <input type="password" ref={passwordAgain} />
            </div>
            <button type="submit">Register</button>

            <div className={`${classes.here}`}>
              <p>Have an account?</p>
              <Link href="/">Login Here</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
