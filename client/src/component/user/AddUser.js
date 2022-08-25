import React, { useContext, useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Menu from "../Menu";

const AddUser = () => {
  const history = useHistory();
  const [inpval, setINP] = useState({
    name: "",
    employeeid: "",
    email: "",
    role: "",
    password: "",
  });

  const setdata = (e) => {
    console.log(e.target.value);

    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const addinpdata = async (e) => {
    e.preventDefault();

    const { name, employeeid, email, role, password } = inpval;

    const res = await fetch(`/api/signup`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify({
        name,
        employeeid,
        email,
        role,
        password,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      history.push("/users");
      console.log("data added");
    }
  };

  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <form className="mt-4" enctype="multipart/form-data">
          <div className="form-group">
            <div className="form-group">
              <label htmlFor="exampleInputName">Name</label>
              <input
                style={{ width: "50%" }}
                type="text"
                value={inpval.name}
                onChange={setdata}
                name="name"
                className="form-control"
                id="exampleInputName"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmp">Employee ID</label>
              <input
                style={{ width: "50%" }}
                type="text"
                value={inpval.employeeid}
                onChange={setdata}
                name="employeeid"
                className="form-control"
                id="exampleInputEmp"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail">Email</label>
              <input
                style={{ width: "50%" }}
                type="email"
                value={inpval.email}
                onChange={setdata}
                name="email"
                className="form-control"
                id="exampleInputEmail"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Role</label>
              <select
                style={{ width: "50%" }}
                name="role"
                value={inpval.role}
                onChange={setdata}
                className="form-control"
                id="exampleFormControlSelect1"
                aria-label=".form-select-lg example"
              >
                <option selected>Select</option>
                <option>admin</option>
                <option>agent</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputPass">Password</label>
              <input
                style={{ width: "50%" }}
                type="password"
                value={inpval.password}
                onChange={setdata}
                name="password"
                className="form-control"
                id="exampleInputPass"
                aria-describedby="emailHelp"
              />
            </div>

            <button
              type="submit"
              onClick={addinpdata}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};
export default AddUser;
