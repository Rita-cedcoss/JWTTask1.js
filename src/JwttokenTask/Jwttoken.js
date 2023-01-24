import React, { useRef, useState } from "react";

const Jwttoken = () => {
  const [users, setUsers] = useState([]);
  const emailRef = useRef();
  const passwordRef = useRef();
  const tokengenerator = async (x) => {
    console.log(x.email);
    const res = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: `${x.email}`,
        password: `${x.password}`,
      }),
    });
    const json = await res.json();
    setUsers(json);
  };
  const login = (e) => {
    e.preventDefault();
    if (emailRef.current.value == "" && passwordRef.current.value == "") {
      alert("please enter the details");
    } else {
      let obj = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      tokengenerator(obj);
    }
    e.currentTarget.reset();
  };
  return (
    <div className="p-4">
      <h3 className="text-center mt-4">Login Account</h3>
      <div className="col-lg-4 col-md-6 col-sm-6 col-xm-8 p-4 m-auto border mt-4 shadow mb-5 bg-body rounded">
        <form onSubmit={login}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              ref={emailRef}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="form-floating">
              <input
                type="password"
                ref={passwordRef}
                className="form-control"
                placeholder="Leave a comment here"
                id=""
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
      {/* display */}
      {users.error == "user not found" ? (
        <p className=" col-12 col-xl-4 col-lg-4 col-md-6 col-sm-6 m-auto text-center mt-5 alert alert-danger">
          Token Not found
        </p>
      ) : (
        ""
      )}
      {users.token ? (
        <p className="mt-5 col-12 col-xl-4 col-lg-4 col-md-6 col-sm-6 m-auto text-center fs-5 alert alert-success">
          User Token: {users.token}
        </p>
      ) : (
        ""
      )}
    </div>

  );
};

export default Jwttoken;
