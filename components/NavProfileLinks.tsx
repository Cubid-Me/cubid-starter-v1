// @ts-nocheck
import { openModal } from "@/store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";


const constants = {
    MODAL_BODY_TYPES: {
      USER_DETAIL: "USER_DETAIL",
      SIGN_IN_MODAL: "SIGN_IN_MODAL",
      PRICING_MODAL: "PRICING_MODAL",
      DEFAULT: "",
    },
  };
  
  const { MODAL_BODY_TYPES } = constants;
  

function NavProfileLinks() {
  const dispatch = useDispatch();
  const { isLoggedIn, credits, token } = useSelector((state:any) => state.user);

  const openLoginModal = () => {
    dispatch(
      openModal({
        title: "",
        size: "lg",
        bodyType: MODAL_BODY_TYPES.SIGN_IN_MODAL,
        extraObject: { isSignIn: true },
      })
    );
  };

  const openPricingModal = () => {
    dispatch(
      openModal({
        title: "",
        size: "lg",
        bodyType: MODAL_BODY_TYPES.PRICING_MODAL,
        extraObject: { isLoggedIn, darkbg: true },
      })
    );
  };

  const logoutUser = async () => {
    // await axios.get(process.env.NEXT_PUBLIC_BASE_URL+'/user/logout')
    localStorage.clear();
    window.location = "/";
  };

  const handleDropDownClick = () => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  };

  return (
    <>
      {isLoggedIn && (
        <>
          <button
            className="btn btn-sm text-xs mr-4 normal-case hover:bg-primary btn-outline"
            onClick={() => openPricingModal()}
          >
            Get Subscription
          </button>
          <div className="md:inline-block hidden md:mt-0 mt-4">
            <CircleStackIcon className="w-4 h-4 inline-block mr-1" />
            {credits}{" "}
          </div>
          <div className="dropdown  md:mt-0 mt-4 ml-6 dropdown-end">
            <label
              tabIndex={0}
              className="btn md:hidden btn-sm normal-case btn-outline m-1"
            >
              Account
            </label>

            <label
              tabIndex={0}
              className="btn bg-white md:flex hidden btn-circle  avatar"
            >
              <div className="w-6 rounded-full">
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  alt="profile"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact z-20 dropdown-content bg-slate-50 mt-3 p-2 shadow   rounded-box w-52"
            >
              <li
                className="justify-between"
                onClick={() => handleDropDownClick()}
              >
                <Link href={"/account/my-profile"}>My Profile</Link>
              </li>

              <li
                className="justify-between"
                onClick={() => handleDropDownClick()}
              >
                <Link href={"/account/saved-websites"}>My Websites</Link>
              </li>

              <div className="divider mt-0 mb-0"></div>
              <li>
                <a onClick={logoutUser}>Logout</a>
              </li>
            </ul>
          </div>
        </>
      )}
      {!isLoggedIn && (
        <>
          <button
            className="btn border-2 btn-sm text-xs mr-4 normal-case "
            onClick={() => openLoginModal()}
          >
            Sign In
          </button>
        </>
      )}
    </>
  );
}

export default NavProfileLinks;
