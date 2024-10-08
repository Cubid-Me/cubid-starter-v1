// @ts-nocheck
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "@/store/modalSlice";
import SignInModalBody from "./SignInModal";

const constants = {
    MODAL_BODY_TYPES: {
      USER_DETAIL: "USER_DETAIL",
      SIGN_IN_MODAL: "SIGN_IN_MODAL",
      PRICING_MODAL: "PRICING_MODAL",
      DEFAULT: "",
    },
  };
  
  const { MODAL_BODY_TYPES } = constants;

function ModalLayout() {
  const { isOpen, bodyType, size, extraObject, title } = useSelector(
    (state:any) => state.modal
  );
  const dispatch = useDispatch();

  const close = (e) => {
    dispatch(closeModal(e));
  };

  return (
    <>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div
          className={`modal-box  ${size === "lg" ? "max-w-5xl" : ""} ${
            extraObject.darkbg ? "bg-slate-50" : ""
          }`}
        >
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => close()}
          >
            ✕
          </button>
          <h3 className="font-semibold text-xl pb-6 text-center">{title}</h3>

          {/* Loading modal body according to different modal type */}
          {
            {
              [MODAL_BODY_TYPES.SIGN_IN_MODAL]: (
                <SignInModalBody closeModal={close} extraObject={extraObject} />
              ),
              [MODAL_BODY_TYPES.DEFAULT]: <div></div>,
            }[bodyType]
          }
        </div>
      </div>
    </>
  );
}

export default ModalLayout;
