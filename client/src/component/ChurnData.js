import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Menu from "./Menu";

const ChurnData = () => {
  const [userdata, setUserdata] = useState([]);
  const [val, setVal] = useState([]);

  //Get all data that has flag === 1
  const getData = async (e) => {
    const res = await fetch("/api/getchurn", {
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
      console.log(userdata);
      // console.log(data[0].createdAt);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  //Set  Data  flag ===0 when click get data
  const showData = async (e) => {
    // const { flag } = val;
    const res2 = await fetch(`/api/churn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flag: "0",
      }),
    });
    const data = await res2.json();

    if (res2.status === 422 || !data) {
      console.log("error ");
    } else {
      //   var x = data[0];
      setVal(data);
      console.log(data);
    }
  };

  console.log(val);
  // useEffect(() => {
  //   showData();
  // }, []);

  return (
    <div>
      <Header />
      <Menu />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid"></div>
        </div>
        <div className="card">
          <section className="content">
            <div className="container-fluid">
              <form>
                <h4>Churn Data</h4>
                <button
                  style={{ float: "right", marginBottom: "10px" }}
                  type="submit"
                  onClick={showData}
                  className="btn btn-primary"
                >
                  Churn Data
                </button>
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
                    <th scope="col">First Attempt Employee</th>
                    <th scope="col">Second Attempt Employee</th>
                    <th scope="col">Third Attempt Employee</th>
                  </tr>
                </thead>
                <tbody>
                  {userdata.map((element, id) => {
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
                          <td>{element.fattempt}</td>
                          <td>{element.sattempt}</td>
                          <td>{element.tattempt}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChurnData;
