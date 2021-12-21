import React, { useState, useEffect } from "react";
import ResourcesService from "../services/ResourcesService";
import eventManagement from "../events/EventManagement";
import Pagination from "@material-ui/lab/Pagination";

const ListAllResources = (props) => {
  const [resources, setResources] = useState([]);
  const [fieldName, setFieldName] = useState("");
  const [offset, setOffset] = useState(1);
  const [limit, setLimit] = useState(3);
  const [totalPage, setTotalPage] = useState(0);
  const [error, setError] = useState([]);

  const mapRequestParam = (offset, limit, fieldName) => {
    let params = {};
    if (offset) {
      params["offset"] = offset - 1; // Spring: offset start at 0, react: offset default at 1
    }
    if (limit) {
      params["limit"] = limit;
    }
    if (fieldName) {
      params["fieldName"] = fieldName;
    }
    return params;
  };

  const fetchData = () => {
    const requestParam = mapRequestParam(offset, limit, fieldName); // state value
    ResourcesService.getAllResources(requestParam).then(
      (res) => {
        setResources(res.data.responseData);
        setTotalPage(res.data.totalPage);
      },
      (error) => {
        setError(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        );

        if (error.response && error.response.status === 401) {
          eventManagement.dispatch("logout");
        }
      }
    );
  };

  useEffect(fetchData, [offset, limit, fieldName]);

  const viewResource = (id) => {
    props.history.push(`/all-data/${id}`);
  };

  const updateResourceData = (id) => {
    props.history.push(`/create_update_data/${id}`);
  };

  const addUpdateResource = () => {
    props.history.push(`/create_update_data/_dto`);
  };

  const deleteResourceData = (id) => {
    ResourcesService.deleteResource(id).then(() => {
      setResources(resources.filter((i) => i.id !== id));
    });
  };

  const onHandleSubmitFieldName = () => {
    setOffset(1);
    fetchData();
  };

  const onHandleChangeLimit = (e) => {
    setLimit(e.target.value);
    setOffset(1);
  };

  const onHandleChangeOffset = (e, v) => {
    setOffset(v);
  };

  const sortBy = ["Id", "Name", "Price", "Quantity"];
  const viewItems = [3, 5, 10, 15];

  return (
    <div className="h-custom divider">
      <br />
      <div className="list row">
        <h2 className="text-center">Resources Data Table</h2>
        <div className="col-sm">
          <button
            className="btn btn-outline-primary"
            onClick={() => addUpdateResource()}
          >
            {" "}
            Adding Data
          </button>
        </div>

        <div className="col-sm">
          {"Sort By  "}
          <select
            style={{ width: "100px", color: "#007BFF" }}
            onSubmit={onHandleSubmitFieldName}
            onChange={(e) => {
              setFieldName(e.target.value);
            }}
            value={fieldName}
          >
            {sortBy.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
        </div>

        <div className="col-sm">
          {"View  "}
          <select
            style={{ width: "100px", color: "#007BFF" }}
            onChange={onHandleChangeLimit}
            value={limit}
          >
            {viewItems.map((view) => (
              <option key={view} value={view}>
                {view}
              </option>
            ))}
          </select>
        </div>
      </div>

      <br></br>
      <div className="row" style={{ "paddingBottom": "150px" }}>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th> ID's </th>
              <th> Name </th>
              <th> Price </th>
              <th> Short Description </th>
              <th> Quantity </th>
              <th> Created Date </th>
              <th> Created By </th>
              <th> Modified Date </th>
              <th> Last Modified By </th>
            </tr>
          </thead>
          <tbody>
            {resources.map((i, j) => (
              <tr key={i.id}>
                <td className="break-word">
                  {" "}
                  <a
                    href={i.id}
                    className="link-primary"
                    onClick={() => viewResource(i.id)}
                  >
                    {i.id}
                  </a>{" "}
                </td>

                <td className="break-word"> {i.name} </td>
                <td className="break-word"> {i.price} </td>
                <td className="break-word"> {i.shortDescription} </td>
                <td className="break-word"> {i.quantity} </td>
                <td className="break-word"> {i.createdDate} </td>
                <td className="break-word"> {i.createdBy} </td>
                <td className="break-word"> {i.modifiedDate} </td>
                <td className="break-word"> {i.lastModifiedBy} </td>

                <td className="break-word">
                  <button
                    onClick={() => updateResourceData(i.id)}
                    className="btn btn-outline-info"
                  >
                    Update
                  </button>

                  <button
                    style={{ marginLeft: "15px" }}
                    onClick={() => {
                      if (window.confirm("Are you sure to delete this item?"))
                        deleteResourceData(i.id);
                    }}
                    className="btn btn-outline-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <Pagination
            className="d-flex justify-content-center"
            count={totalPage}
            page={offset}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            color="primary"
            showFirstButton
            showLastButton
            onChange={onHandleChangeOffset}
          />
        </div>
      </div>
    </div>
  );
};

export default ListAllResources;
