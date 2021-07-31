import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { removeMsg } from "../../redux/actions/msg";

const Toasts = () => {
  const dispatch = useDispatch();
  const msges = useSelector((state) => state.message, shallowEqual);

  return (
    <>
      {msges.length > 0 ? (
        <ToastContainer
          style={{ zIndex: 9999 }}
          className="mb-2 me-2"
          position="bottom-end"
        >
          {msges.map(
            (msg) =>
              msg.text && (
                <Toast
                  bg={msg.type}
                  delay="5000"
                  autohide
                  onClose={() => dispatch(removeMsg(msg.id))}
                  key={msg.id}
                >
                  <Toast.Body className={msg.type === "dark" && "text-white"}>
                    <span className="fs-5 text-wrap">{msg.text}</span>
                  </Toast.Body>
                </Toast>
              )
          )}
        </ToastContainer>
      ) : (
        ""
      )}
    </>
  );
};

export default Toasts;
