import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Menu from "./Menu";
import { ToastContainer, toast } from "react-toastify";
// import { CsvToHtmlTable } from "react-csv-to-table";

const InputForm = () => {
  // const [getuserdata, setUserdata] = useState([]);
  // console.log(getuserdata);
  const [file, setFile] = useState("");
  const history = useHistory();
  const handleFile = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const addFile = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append("csv", file);

    const res = await fetch(`/api/uploadfile`, {
      method: "POST",
      body: formData,
    });

    // formData = await res.json();
    console.log(formData);

    if (res.status === 422 || !formData) {
      console.log("error ");
      toast.error("Error while uploading!");
    } else {
      history.push("/input");
      console.log("data added");
      toast.success("File saved successfully!");
    }
  };

  return (
    <div>
      <Header />
      <Menu />
      <ToastContainer />
      <div className="container" style={{ marginRight: "50px" }}>
        <div className="col-sm-6 offset-md-5">
          <h1 className="m-0">Upload Csv file here</h1>
        </div>
        <div className="card mt-5">
          <section className="content ">
            <div className="container-fluid">
              <form encType="multipart/form-data">
                <div className="form-group">
                  <label htmlFor="file" className="form-label">
                    Upload File
                  </label>
                  <input
                    filename="csvfile"
                    onChange={handleFile}
                    style={{ width: "50%" }}
                    className="form-control"
                    type="file"
                    id="file"
                  />
                </div>
                <button
                  type="submit"
                  onClick={addFile}
                  className="btn btn-primary"
                >
                  Upload
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InputForm;
