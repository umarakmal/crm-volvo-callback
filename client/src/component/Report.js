import React, { useEffect, useState } from "react";
import Header from "./Header";
import Menu from "./Menu";
import Footer from "./Footer";
import DatePicker from "react-datepicker";
import "../css/report.css";
import {
  DataGrid,
  GridToolbarExport,
  GridToolbarContainer,
} from "@material-ui/data-grid";
import "react-datepicker/dist/react-datepicker.css";

function MyExportButton() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const Report = () => {
  const columns = [
    // { field: "id", headerName: "ID" },
    { field: "mobile", headerName: "Mobile", width: 150 },
    { field: "queue", headerName: "Queue", width: 150 },
    { field: "abandoned", headerName: "Abandoned Date", width: 150 },
    { field: "disposition", headerName: "Disposition", width: 150 },
    { field: "first", headerName: "First attempt", width: 150 },
    { field: "second", headerName: "Second attempt", width: 150 },
    { field: "third", headerName: "Third attempt", width: 150 },
    { field: "fattempt", headerName: "First attempt Employee", width: 150 },
    { field: "sattempt", headerName: "Second attempt Employee", width: 150 },
    { field: "tattempt", headerName: "Third attempt Employee", width: 150 },
  ];

  const [getuserdata, setUserdata] = useState([]);
  const [startDate, setStartDate] = useState("");
  // console.log(startDate);
  const [endDate, setEndDate] = useState("");
  const [show, setShow] = useState(false);

  const postData = async (e) => {
    e.preventDefault();

    const date1 = startDate.toISOString();
    const date2 = endDate.toISOString();
    var body = {
      date1,
      date2,
    };
    console.log(body);
    const res = await fetch("/api/postall", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date1,
        date2,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setUserdata(data);
      console.log(data);
      // console.log(data[0].createdAt);
    }
    setShow(true);
  };

  return (
    <div>
      <Header />
      <Menu />
      <div className="content-wrapper">
        <div className="col-sm-6 offset-md-5">
          <h1 className="m-0">Report</h1>
        </div>
        <div className="card mt-5">
          <section className="content offset-md-4">
            <div className="container-fluid">
              <form>
                <div className="form-row">
                  <div className="form-group ">
                    <label htmlFor="date" className="form-label">
                      From
                    </label>

                    <DatePicker
                      selected={startDate}
                      selectsStart
                      placeholderText="Select Date"
                      value={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="yyyy-MM-dd"
                      id="date1"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="date1" className="form-label">
                      To
                    </label>
                    <DatePicker
                      selected={endDate}
                      dateFormat="yyyy-MM-dd"
                      selectsEnd
                      placeholderText="Select Date"
                      minDate={startDate}
                      value={endDate}
                      onChange={(date) => setEndDate(date)}
                      id="date2"
                    />
                  </div>
                  <button
                    type="submit"
                    style={{ height: "40px", marginTop: "25px" }}
                    // onClick={() => setShow(!true)}
                    onClick={postData}
                    className="btn btn-primary "
                    id="submit"
                  >
                    Get Data
                  </button>
                </div>
              </form>
            </div>
          </section>

          <div className="card">
            <div className="card-header"></div>

            <div className="card-body" style={{ height: "700", width: "100%" }}>
              {show ? (
                <DataGrid
                  style={{ fontWeight: "400" }}
                  components={{
                    Toolbar: MyExportButton,
                  }}
                  autoHeight
                  getRowId={(row) => row._id}
                  rows={getuserdata}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Report;
