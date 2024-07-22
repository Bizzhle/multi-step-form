import React from "react";
import { Link, useLocation } from "react-router-dom";

const Progress = () => {
  const { pathname } = useLocation();
  const isFirstStep = pathname === "/registration/1";
  const isSecondStep = pathname === "/registration/2";
  const isThirdStep = pathname === "/registration/3";
  const isLoginPage = pathname === "/login";

  return (
    <>
      {!isLoginPage ? (
        <div className="steps">
          <div className={`${isFirstStep ? "step active" : "step"}`}>
            <div>1</div>
            <div>
              {isSecondStep || isThirdStep ? (
                <Link to="/registration/1">Step 1</Link>
              ) : (
                "Step 1"
              )}
            </div>
          </div>
          <div className={`${isSecondStep ? "step active" : "step"}`}>
            <div>2</div>
            <div>
              {isThirdStep ? (
                <Link to="/registration/2">Step 2</Link>
              ) : (
                "Step 2"
              )}
            </div>
          </div>
          <div
            className={`${
              pathname === "/registration/3" ? "step active" : "step"
            }`}
          >
            <div>3</div>
            <div>Step 3</div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Progress;
