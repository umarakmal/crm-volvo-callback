import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Menu from "../Menu";

const EditUser = () => {
  const [getuserdata, setUserdata] = useState([]);
  // console.log(getuserdata);

  const history = useHistory("");

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

  const { id } = useParams("");
  console.log(id);

  const getdata = async () => {
    const res = await fetch(`/api/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setINP(data);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const updateuser = async (e) => {
    e.preventDefault();
    const { name, employeeid, email, role, password } = inpval;

    const res2 = await fetch(`/api/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        employeeid,
        email,
        role,
        password,
      }),
    });

    const data = await res2.json();
    console.log(data);

    if (res2.status === 422 || !data) {
      alert("fill the data");
    } else {
      history.push("/users");
      // setUPdata(data2);
    }
  };

  return (
    <>
      <Header />
      <Menu />
      <NavLink to="/users">User Management</NavLink>
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
              <label for="exampleFormControlSelect1">Role</label>
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
              onClick={updateuser}
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

export default EditUser;
