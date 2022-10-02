import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import classes from "./userprofile.module.css";
const Profile = () => {
  const [loading, setloading] = useState(true);
  const [initialdata, setdata] = useState();
  const [hist, sethist] = useState();
  const handler = async (e) => {
    await axios
      .put("https://shailesh-stripe-app.herokuapp.com/api/book/edit/" + `${e}`)
      .then(() => {
        window.open("/userprofile/", "_self");
      });
  };
  function delete_cookie(name) {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }
  useEffect(() => {
    const getData = async () => {
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
      console.log(userId);
      if (userId === "" || userId === null) {
        window.open("/", "_self");
      }
      await axios
        .get(
          "https://shailesh-stripe-app.herokuapp.com/api/users/getUser/" +
            `${userId}`
        )
        .then((data) => {
          const rer = data.data.data;
          console.log(data.data.data.history.reverse());
          sethist(data.data.data.history);
          setdata(rer);
          console.log(initialdata);
        })
        .catch((error) => {
          console.log(error);
        });
      setloading(false);
    };
    getData();
  }, []);
  return (
    <>
      {loading ? (
        <>Loading!!!!!</>
      ) : (
        initialdata && (
          <div className={`${classes.container}`}>
            <h1>DASH BOARD</h1>
            <button
              className={`${classes.button}`}
              onClick={() => {
                window.open("/subscriptionpage", "_self");
              }}
            >
              Buy Plan
            </button>
            <button
              className={`${classes.button}`}
              onClick={() => {
                delete_cookie("strip-app");
                window.open("/", "_self");
              }}
            >
              Log out
            </button>

            <div className={`${classes.card}`}>
              Name: {initialdata.name}
              <br />
              Email: {initialdata.email}
              <br />
              Number of Transaction: {initialdata.history.length}
            </div>
            <div className={`${classes.all}`}>
              {hist.map((el, index) => {
                return (
                  <div className={`${classes.card}`} key={index}>
                    <h2>Plan Details</h2>
                    ID: {el.type._id}
                    {el.cancel === "yes" ? (
                      <h5
                        style={{
                          color: "red",
                          background: "rgb(241, 193, 172)",
                          width: "50px",
                          padding: "2px",
                          borderRadius: "10px",
                        }}
                      >
                        Canceled
                      </h5>
                    ) : el.expiry < Date.now() ? (
                      <h5
                        style={{
                          color: "grey",
                          background: "rgb(211, 216, 221)",
                          width: "40px",
                          padding: "2px",
                          borderRadius: "10px",
                        }}
                      >
                        Expired
                      </h5>
                    ) : (
                      <h5
                        style={{
                          color: "blue",
                          background: "rgb(195, 221, 244)",
                          width: "40px",
                          padding: "2px",
                          borderRadius: "10px",
                        }}
                      >
                        Active
                      </h5>
                    )}
                    <h3>
                      {el.type.plantype.charAt(0).toUpperCase() +
                        el.type.plantype.slice(1)}
                    </h3>
                    <p>
                      {el.type.device.map((ele) => {
                        return ele.charAt(0).toUpperCase() + ele.slice(1) + " ";
                      })}
                    </p>
                    <h2>
                      ₹{el.type.price}/{el.type.type}
                    </h2>
                    {el.cancel === "yes" ? (
                      <button
                        className={`${classes.button}`}
                        onClick={() => {
                          window.open("/subscriptionpage", "_self");
                        }}
                      >
                        Buy Plan
                      </button>
                    ) : new Date(`${el.expiry}`) > Date.now() ? (
                      <button
                        className={`${classes.button}`}
                        onClick={() => {
                          handler(el._id);
                        }}
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        className={`${classes.button}`}
                        onClick={() => {
                          handler(el._id);
                        }}
                      >
                        Cancel
                      </button>
                    )}
                    <p
                      style={{
                        background: "",
                      }}
                    >
                      Your subscription was started on <b>{el.starttime} </b>
                      and ended on <b>{el.expirytime}</b>
                    </p>
                    <br />
                  </div>
                );
              })}
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Profile;
