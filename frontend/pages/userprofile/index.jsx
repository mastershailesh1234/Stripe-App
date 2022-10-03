import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import classes from "./userprofile.module.css";
import Navbar from "../../components/navbar";
import Loading from "../../components/loading";
import { format } from "date-fns";
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
        <Loading />
      ) : (
        initialdata && (
          <div className={`${classes.page}`}>
            <Navbar />
            <div className={`${classes.left}`}>
              <div className={`${classes.top}`}>
                <h1>Profile</h1>
                <div className={`${classes.name}`}>
                  <b>Name:</b> {initialdata.name}
                </div>
                <div className={`${classes.name}`}>
                  <b>Email:</b> {initialdata.email}
                </div>
                <div className={`${classes.name}`}>
                  <b>Number of Transaction:</b> {initialdata.history.length}
                </div>
              </div>
              <div className={`${classes.bottom}`}>
                <button
                  className={`${classes.button}`}
                  onClick={() => {
                    delete_cookie("strip-app");
                    window.open("/", "_self");
                  }}
                >
                  Log out
                </button>
              </div>
            </div>
            <div className={`${classes.right}`}>
              <div className={`${classes.title}`}>MY BOOKINGS</div>
              <div className={`${classes.body}`}>
                {hist.map((el, index) => {
                  return (
                    <div className={`${classes.card}`} key={index}>
                      <h2
                        style={{ display: "inline-block", marginRight: "10px" }}
                      >
                        {index === 0 ? "Current Plan Details" : "Plan Details "}
                      </h2>
                      {el.cancel === "yes" ? (
                        <h5
                          style={{
                            color: "red",
                            background: "rgb(241, 193, 172)",
                            width: "50px",
                            padding: "2px",
                            borderRadius: "5px",
                            display: "inline-block",
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
                            borderRadius: "5px",
                            display: "inline-block",
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
                            borderRadius: "5px",
                            display: "inline-block",
                          }}
                        >
                          Active
                        </h5>
                      )}
                      <br />
                      {/* ID:{el._id} */}
                      <p
                        style={{
                          marginBottom: "-10px",
                          marginTop: "-5px",
                          color: "grey",
                          fontSize: "15px",
                          fontWeight: "500",
                        }}
                      >
                        {el.type.plantype.charAt(0).toUpperCase() +
                          el.type.plantype.slice(1)}
                      </p>
                      <p
                        style={{
                          color: "#a6a6a6",
                          fontWeight: "500",
                        }}
                      >
                        {el.type.device.map((ele) => {
                          return (
                            ele.charAt(0).toUpperCase() + ele.slice(1) + " "
                          );
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
                          Choose Plan
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
                          background: "#cccaca41",
                          padding: "10px",
                        }}
                      >
                        Your subscription was started on{" "}
                        <b>{format(new Date(el.starttime), "dd/MM/yy")} </b>
                        and ends on{" "}
                        <b>{format(new Date(el.expirytime), "dd/MM/yy")}</b>.
                      </p>
                      <br />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Profile;
