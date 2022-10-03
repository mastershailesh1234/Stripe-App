import React, { useState, useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import classes from "./subscription.module.css";
import StripeCheckout from "react-stripe-checkout";
import Loading from "../../components/loading";
const Subscription = () => {
  const [initialdata, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [stripeToken, setStripeToken] = useState(null);
  const [toggle, setToggle] = useState("monthly");
  const [searchdata, setSearchdata] = useState();
  const [userid, setUserid] = useState("");
  const [active, setActive] = useState("");
  const onToken = (token) => {
    setStripeToken(token);
    console.log(token);
  };
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios
          .post(
            "https://shailesh-stripe-app.herokuapp.com/api/checkout/payment",
            {
              tokenId: stripeToken.id,
              amount: 500,
              user: userid,
              type: `${active._id}`,
              cancel: "no",
              duration: `${active.type}`,
            }
          )
          .then(() => {
            alert("Payment Successful");
            window.open("/userprofile/", "_self");
          });
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken]);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
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
      setUserid(userId);
      if (userId === "" || userId === null) {
        window.open("/", "_self");
      }
      await axios
        .get("https://shailesh-stripe-app.herokuapp.com/api/categories/getAll")
        .then((data) => {
          setData(data.data.data);
          const output = data.data.data.filter((el) =>
            el.type.toLowerCase().includes(toggle.toLowerCase())
          );
          setSearchdata(
            output.sort(function (a, b) {
              return a.price - b.price;
            })
          );
          console.log(output);
        })
        .catch((error) => {
          console.log(error);
        });
      setLoading(false);
    };
    getData();
  }, []);
  useEffect(() => {
    if (initialdata) {
      const output = initialdata?.filter((el) =>
        el.type.toLowerCase().includes(toggle.toLowerCase())
      );
      setSearchdata(
        output?.sort(function (a, b) {
          return a.price - b.price;
        })
      );
    }
  }, [toggle]);

  // const handler = async () => {
  //   if (active == null) {
  //     alert("Please select a subscription plan");
  //   } else {
  //     const data = {
  //       cancel: "no",
  //       user: "6338f793df4ed8b4c28acb03",
  //       type: active._id,
  //     };
  //     try {
  //       await axios.post("https://shailesh-stripe-app.herokuapp.com/api/book/create", data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={`${classes.body}`}>
          {/* <Navbar /> */}
          <div className={`${classes.textsection}`}>
            <h1>Choose the Plan thats right for you</h1>
          </div>
          <div>
            <div className={`${classes.toggleContainer}`}>
              <span
                style={{
                  color: toggle === "monthly" ? "blue" : "",
                  fontWeight: toggle === "monthly" ? "500" : "",
                }}
              >
                Monthly
              </span>
              <div>
                <input type="checkbox" name="toggle" id="toggle" unchecked />
                <label
                  onClick={() => {
                    setActive(null);
                    if (toggle === "monthly") {
                      setToggle("yearly");
                    } else {
                      setToggle("monthly");
                    }
                  }}
                  for="toggle"
                >
                  <div
                    onClick={() => {
                      setActive(null);
                      if (toggle === "monthly") {
                        setToggle("yearly");
                      } else {
                        setToggle("monthly");
                      }
                    }}
                    className={`${classes.ball}`}
                  ></div>
                </label>
              </div>
              <span
                style={{
                  color: toggle === "yearly" ? "blue" : "",
                  fontWeight: toggle === "yearly" ? "500" : "",
                }}
              >
                Yearly
              </span>
            </div>
          </div>
          <br />
          <div className={`${classes.container}`}>
            {loading ? (
              <>
                <Loading />
              </>
            ) : (
              searchdata.map((el, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      if (el._id === active?._id) {
                        setActive(null);
                      } else {
                        setActive(el);
                      }
                    }}
                    style={{
                      border: el._id === active?._id ? "3px solid #3171ff" : "",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <div className={`${classes.card}`}>
                      <h3>
                        {el.plantype}
                        <i
                          style={{
                            opacity: el._id === active?._id ? 1 : 0,
                            marginLeft: "25px",
                          }}
                        >
                          <CheckIcon></CheckIcon>
                        </i>
                      </h3>
                      <p className={`${classes.size}`}>
                        <span> Video Quality : </span>
                        {el.videoquality}
                      </p>
                      <p className={`${classes.size}`}>
                        <span>Resolution : </span>
                        {el.resolution}
                      </p>
                      <p className={`${classes.price}`}>
                        ₹{el.price}/
                        <span>{el.type === "monthly" ? "month" : "year"}</span>
                      </p>
                      <div className={`${classes.list}`}>
                        {el.device.map((e, index) => {
                          return (
                            <div key={index}>
                              <p>{e}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className={`${classes.body}`}>
            {/* <button
          className={`${classes.button}`}
          role="button"
          onClick={() => {
            console.log(active);
            handler();
          }}
        >
          NEXT
        </button> */}
            <br />
            {active ? (
              <StripeCheckout
                name="Stripe-App"
                image="https://cdn.pixabay.com/photo/2020/12/27/20/24/smile-5865208_1280.png"
                // billingAddress
                // shippingAddress
                email=""
                description={`Your total is $${active?.price} Plan- ${active?.plantype},${active?.type} `}
                amount={active?.price * 100}
                token={onToken}
                stripeKey="pk_test_51LoKWRCt5sW24m0DkYnoLW64hcv76LEUBlr7RBknoayeAiH8c7GKkkHE1qzhDj0qgDd7EfpQD8XXmRMbEeWscGm800yvl065U5"
              >
                <button className={`${classes.button}`}>PAY NOW</button>
              </StripeCheckout>
            ) : (
              <>
                <p>Select a plan to continue</p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Subscription;
