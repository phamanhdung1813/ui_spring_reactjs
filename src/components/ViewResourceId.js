import React, { useState, useEffect } from "react";
import ResourcesService from "../services/ResourcesService";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const ViewResourceId = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    ResourcesService.getResourceId(props.match.params.id).then((res) => {
      setData(res.data);
    });
  }, [props.match.params.id]);

  return (
    <div style={{"paddingBottom":"150px"}}>
      <br />
      <h2 className="text-center">{data.id}'s Detail information </h2>
      <div className="card-body">
        <div className="table-container">
          <Table
            className="table table-bordered"
            style={{ border: "1.5px solid black", width: "600px" }}
          >
            <thead>
              <TableRow className="row-style">
                <TableCell className="bold-text" variant="head">
                  Name
                </TableCell>
                <TableCell className="normal-text" variant="body">
                  {data.name}
                </TableCell>
              </TableRow>
              <TableRow className="row-style">
                <TableCell className="bold-text" variant="head">
                  Price
                </TableCell>
                <TableCell className="normal-text" variant="body">
                  {data.price}
                </TableCell>
              </TableRow>
              <TableRow className="row-style">
                <TableCell className="bold-text" variant="head">
                  Short Description
                </TableCell>
                <TableCell className="normal-text" variant="body">
                  {data.shortDescription}
                </TableCell>
              </TableRow>
              <TableRow className="row-style">
                <TableCell className="bold-text" variant="head">
                  Quantity
                </TableCell>
                <TableCell className="normal-text" variant="body">
                  {data.quantity}
                </TableCell>
              </TableRow>
              <TableRow className="row-style">
                <TableCell className="bold-text" variant="head">
                  Created Date
                </TableCell>
                <TableCell className="normal-text" variant="body">
                  {data.createdDate}
                </TableCell>
              </TableRow>
              <TableRow className="row-style">
                <TableCell className="bold-text" variant="head">
                  Created By
                </TableCell>
                <TableCell className="normal-text" variant="body">
                  {data.createdBy}
                </TableCell>
              </TableRow>
              <TableRow className="row-style">
                <TableCell className="bold-text" variant="head">
                  Modified Date
                </TableCell>
                <TableCell className="normal-text" variant="body">
                  {data.modifiedDate}
                </TableCell>
              </TableRow>
              <TableRow className="row-style">
                <TableCell className="bold-text" variant="head">
                  Last Modified By
                </TableCell>
                <TableCell className="normal-text" variant="body">
                  {data.lastModifiedBy}
                </TableCell>
              </TableRow>
            </thead>
          </Table>
        </div>
        <br />
        <a className="btn btn-outline-dark" href="/all-data">
          BACK
        </a>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default ViewResourceId;
