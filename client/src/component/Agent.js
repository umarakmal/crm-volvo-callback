import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Menu from "./Menu";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Agent = () => {
  const [getuserdata, setUserdata] = useState([]);
  const [values, setValues] = useState({
    queue: "",
    mobile: "",
    flag: "",
    disposition: "",
  });

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setValues((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const addData = async (e) => {
    e.preventDefault();

    const { mobile, queue, disposition } = values;
    console.log(values);
    const res = await fetch(`/api/inputform`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        mobile,
        queue,
        disposition,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
      toast.error("Error Occured");
    } else {
      // history.push("/users")
      // setUdata(data)
      console.log("data added");
      toast.success("Data added successfully");
    }
  };

  //Get all data in table
  const getData = async (e) => {
    const res = await fetch("/api/agent", {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setUserdata(data);
      console.log(data);
      // console.log(data[0].createdAt);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [val, setVal] = useState([]);

  //Get Data when click get data
  const showData = async (e) => {
    // const { flag } = val;
    const res2 = await fetch(`/api/getagent/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flag: "1",
      }),
    });
    const data = await res2.json();

    if (res2.status === 422 || !data) {
      console.log("error ");
    } else {
      //   var x = data[0];
      setVal(data);
    }
  };

  return (
    <div>
      <Header />
      <Menu />
      <div className="right_col content-wrapper card">
        <div className="col-md-12 col-sm-12 col-xs-12">
          <div className="x_panel">
            <button
              style={{
                marginLeft: " 7px",
                height: "35px",
                width: "8%",
                marginTop: "10px",
              }}
              type="button"
              onClick={showData}
              className="btn btn-primary"
            >
              {" "}
              Get Data
            </button>
            <div className="x_content">
              <form>
                <div className="form-row card-body">
                  <div className="col-md-3 col-sm-12 col-xs-12 form-group">
                    <label htmlFor="inputName">Mobile</label>
                    <input
                      type="text"
                      className="form-control"
                      name="mobile"
                      value={val.mobile ? val.mobile : ""}
                      onChange={setdata}
                      id="inputName"
                      placeholder=""
                      readOnly
                    />
                  </div>

                  <div className="col-md-3 col-sm-12 col-xs-12 form-group">
                    <label htmlFor="inputInt">Queue</label>
                    <input
                      type="text"
                      className="form-control"
                      name="queue"
                      value={val.queue ? val.queue : ""}
                      onChange={setdata}
                      id="inputInt"
                      placeholder=""
                      readOnly
                    />
                  </div>

                  <div className="col-md-3 col-sm-12 col-xs-12 form-group">
                    <label htmlFor="inputState">Disposition</label>
                    <select
                      id="inputState"
                      name="disposition"
                      value={val.disposition ? val.disposition : ""}
                      onChange={setdata}
                      className="form-control"
                    >
                      <option defaultValue="">Select</option>
                      <option>connected</option>
                      <option>disconnected</option>
                    </select>
                  </div>

                  <button
                    style={{
                      marginTop: "auto",
                      marginBottom: "16px",
                      marginLeft: "10px",
                      width: "8%",
                    }}
                    type="submit"
                    // onClick={addData}
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
              </form>
              <hr style={{ borderTop: "2px", solid: "#8080805e" }}></hr>

              <table className="table">
                <thead className="thead-dark">
                  <tr style={{ color: "black" }} className="table table-dark">
                    <th scope="col">#</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Queue</th>
                    <th scope="col">Abandoned Date</th>
                    <th scope="col">First Attempt</th>
                    <th scope="col">Second Attempt</th>
                    <th scope="col">Third Attempt</th>
                  </tr>
                </thead>
                <tbody>
                  {getuserdata.map((element, id) => {
                    return (
                      <>
                        <tr key={id}>
                          <th scope="row">{id + 1}</th>
                          <td>{element.mobile}</td>
                          <td>{element.queue}</td>
                          <td>{element.abandoned}</td>
                          <td>{element.first}</td>
                          <td>{element.second}</td>
                          <td>{element.third}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Agent;
