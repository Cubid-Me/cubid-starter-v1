// @ts-nocheck
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createClient } from "@/utils/supabase/client";

const constants = {
  MODAL_BODY_TYPES: {
    USER_DETAIL: "USER_DETAIL",
    SIGN_IN_MODAL: "SIGN_IN_MODAL",
    PRICING_MODAL: "PRICING_MODAL",
    DEFAULT: "",
  },

  LEFT_DRAWER_TYPES: {
    PROCESS_SELECT_STYLE: "PROCESS_SELECT_STYLE",
  },
  SIGN_UP_IMAGES: [
    {
      title: "Sinup to see magic",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1681319553238-9860299dfb0f?auto=format&fit=crop&q=80&w=2831&ixlib=rb-4.0.3",
    },
    {
      title: "Elevate elegance with your signature style.",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1681319553238-9860299dfb0f?auto=format&fit=crop&q=80&w=2831&ixlib=rb-4.0.3",
    },
    {
      title: "Design your office ",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1681319553238-9860299dfb0f?auto=format&fit=crop&q=80&w=2831&ixlib=rb-4.0.3",
    },
    {
      title: "Elegance with your signature style.",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1681319553238-9860299dfb0f?auto=format&fit=crop&q=80&w=2831&ixlib=rb-4.0.3",
    },
    {
      title: "Website in 20 minutes",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1681319553238-9860299dfb0f?auto=format&fit=crop&q=80&w=2831&ixlib=rb-4.0.3",
    },
  ],
};

const { MODAL_BODY_TYPES, SIGN_UP_IMAGES } = constants;

function SignInModalBody({ closeModal, extraObject }) {
  const INITIAL_REGISTER_OBJ = {
    otp: "",
    emailId: "",
  };

  const { isSignIn } = extraObject;
  const dispatch = useDispatch();
  const supabase = createClient();

  useEffect(() => {
    setLoading(false);
    setIsOtpSent(false);
    setErrorMessage("");
    setLoginObj({ otp: "", emailId: "" });
  }, [isSignIn]);

  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginObj, setLoginObj] = useState(INITIAL_REGISTER_OBJ);

  const openSignUp = () => {
    dispatch(
      openModal({
        title: "",
        size: "lg",
        bodyType: MODAL_BODY_TYPES.SIGN_IN_MODAL,
        extraObject: { isSignIn: false },
      })
    );
  };

  const openSignIn = () => {
    dispatch(
      openModal({
        title: "",
        size: "lg",
        bodyType: MODAL_BODY_TYPES.SIGN_IN_MODAL,
        extraObject: { isSignIn: true },
      })
    );
  };

  const submitVerificationCode = async (e) => {
    setErrorMessage("");
    if (loginObj.emailId.trim() === "")
      return setErrorMessage("Email Id is Required!");
    if (loginObj.otp.trim() === "")
      return setErrorMessage("Verification Code is Required!");
    else if (
      !/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(loginObj.emailId.trim())
    ) {
      a;
    } else {
      setLoading(true);

      await supabase.auth.verifyOtp({
        email: loginObj.emailId,
        token: loginObj.otp,
        type: "email",
      });
      setLoading(false);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (loading) return 1;
    if (isOtpSent) {
      submitVerificationCode();
    } else {
      sendMailOtp();
    }
  };

  const sendMailOtp = async (e) => {
    setErrorMessage("");
    if (loginObj.emailId.trim() === "")
      return setErrorMessage("Email Id is Required!");
    else if (
      !/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(loginObj.emailId.trim())
    ) {
      return setErrorMessage("Email Id is Wrong!");
    } else {
      setLoading(true);
      await supabase.auth.signInWithOtp({
        email: loginObj.emailId,
      });
      // Call API to check user credentials and save token in localstorage
      // let response = await axios.post(process.env.NEXT_PUBLIC_BASE_URL+'/user/sendMailOTP', loginObj)
      setLoading(false);
      setIsOtpSent(true);

      // if(response.data.success){
      //     // setLoginObj({...loginObj, otp : response.data.payload.otp+""})
      //     setIsOtpSent(true)
      // }else{
      //     setErrorMessage(response.data.message)
      // }
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  return (
    <div className=" flex items-center rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full ">
        <div className="text-center rounded-xl bg-slate-100 dark:bg-gray-600 ">
          <div className="mt-10 md:mb-0 mb-10 inline-block">
            <span className="font-bold text-2xl">Cubid Starter</span>
            <div className="carousel   mt-6 w-full">
              {SIGN_UP_IMAGES.map((img, k) => {
                return (
                  <div
                    id={"slide" + (k + 1)}
                    key={k}
                    className="carousel-item relative w-full"
                  >
                    <div className="w-full h-96">
                      <img
                        src={img.imageUrl}
                        className="w-full object-cover rounded px-6 h-72"
                      />
                    </div>
                    <div className="  absolute flex justify-between transform -translate-y-1/2 left-5 right-5 bottom-0 ">
                      <a
                        href={`#slide${k != 0 ? k : 5}`}
                        className="btn btn-circle btn-ghost"
                      >
                        ❮
                      </a>
                      <h3 className="text-sm mt-4">{img.title} </h3>
                      <a
                        href={`#slide${k == 4 ? 1 : k + 2}`}
                        className="btn btn-circle btn-ghost"
                      >
                        ❯
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="md:p-10 pb-12">
          <form onSubmit={(e) => submitForm(e)}>
            <div className="mb-4">
              {!isOtpSent && (
                <p className="text-center md:mt-0 mt-6 text-xl mb-4 font-semibold">
                  {isSignIn ? "Sign In" : "Sign Up"}
                </p>
              )}
              {isOtpSent && (
                <>
                  <p className="text-center text-lg   md:mt-0 mt-6   font-semibold">
                    Enter verification code received on {loginObj.emailId}
                  </p>
                  <p className="text-center text-slate-500 mt-2 text-sm">
                    Didn&apos;t receive mail? Check spam folder
                  </p>
                </>
              )}
              {!isOtpSent && (
                <div className={`form-control w-full mt-8`}>
                  <label className="label">
                    <span
                      className={
                        "label-text text-base-content text-xs text-slate-600 "
                      }
                    >
                      {"Enter your email Id"}
                    </span>
                  </label>
                  <input
                    type={"text"}
                    value={loginObj.emailId}
                    placeholder={"Ex- username@gmail.com"}
                    onChange={(e) =>
                      updateFormValue({
                        updateType: "emailId",
                        value: e.target.value,
                      })
                    }
                    className="input  input-bordered input-primary w-full "
                  />
                </div>
              )}

              {isOtpSent && (
                <div className={`form-control w-full mt-8`}>
                  <label className="label">
                    <span
                      className={
                        "label-text text-base-content text-xs text-slate-600"
                      }
                    >
                      {"Verification Code"}
                    </span>
                  </label>
                  <input
                    type={"otp"}
                    value={loginObj.otp}
                    placeholder={"Ex- 123456"}
                    onChange={(e) =>
                      updateFormValue({
                        updateType: "otp",
                        value: e.target.value,
                      })
                    }
                    className="input  input-bordered input-primary w-full "
                  />
                </div>
              )}
            </div>

            <div className={`${isSignIn ? "mt-6" : "mt-6"} text-rose-500`}>
              {errorMessage}
            </div>

            {/* {!isSignIn && <div className="badge badge-warning float-right ml-2 text-xs normal-case">Get 5 Credits FREE on Sign Up</div>} */}
            {/* <div className="badge badge-secondary float-right ml-2 normal-case">Get 5 Credits FREE</div> */}
            <button
              type="submit"
              className={"btn mt-2 normal-case w-full btn-primary text-white  "}
            >
              {loading && <span className="loading loading-spinner"></span>}
              {isOtpSent ? `Verify` : `Get Verification Code`}
            </button>

{/* Comment out the Google button and signin/signup logic */}
{/* 
            {isSignIn ? (
              <div className="text-center mt-4">
                {`Don't have an account yet?`}
                <div onClick={() => openSignUp()} className="ml-2 inline-block">
                  <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Sign Up
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center mt-4">
                Already have an account?{" "}
                <div onClick={() => openSignIn()} className="inline-block">
                  <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Sign In
                  </span>
                </div>
              </div>
            )}
            <button
              type="button"
              onClick={() => {
                supabase.auth.signInWithOAuth({
                  provider: "google",
                });
              }}
              className="text-white w-full bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mt-2 mb-2"
            >
              <div className="flex mx-auto items-center space-x-2">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 19"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <p>Sign in with Google</p>
              </div>
            </button>
*/}
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInModalBody;
