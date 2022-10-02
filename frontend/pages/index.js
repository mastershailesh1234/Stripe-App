import React, { useRef, useState } from "react";
import classes from "../styles/login.module.css";
import axios from "axios";
import { useEffect } from "react";
import Link from "next/link";
const LoginPage = () => {
  const email = useRef();
  const password = useRef();
  const [loading, setloading] = useState(true);
  const handleClick = async (e) => {
    const user = {
      email: email.current.value,
      password: password.current.value,
    };
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://shailesh-stripe-app.herokuapp.com/api/users/login",
        user
      );
      console.log(res);
      var now = new Date();
      var time = now.getTime();
      var expireTime = time + 10 * 24 * 60 * 60 * 1000;
      now.setTime(expireTime);
      document.cookie =
        `strip-app=${res.data.user._id}` +
        ";expires=" +
        now.toUTCString() +
        ";path=/";
      window.open("/userprofile/", "_self");
    } catch (err) {
      console.log(err);
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
          <h1>Welcome to Stripe App</h1>
          <h1 className={`${classes.header}`}>LOGIN</h1>
          <form className={`${classes.form}`} onSubmit={handleClick}>
            <div className={`${classes.inputContainer}`}>
              <label for="email">Email</label>
              <input type="email" required ref={email} />
            </div>
            <div className={`${classes.inputContainer}`}>
              <label for="password">Password</label>
              <input type="password" ref={password} />
            </div>

            <button type="submit">LOGIN</button>

            <div className={`${classes.here}`}>
              <p>Dont have an account?</p>
              <Link href="/register">Register Here</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
