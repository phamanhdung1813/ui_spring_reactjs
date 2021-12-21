import React, { Component } from "react";
import ResourcesService from "../services/ResourcesService";

class CreateResource extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      name: "",
      price: "",
      shortDescription: "",
      quantity: "",
    };
  }

  //param equal "_dto"
  componentDidMount() {
    if (this.state.id === "_dto") {
      return null;
    } else {
      ResourcesService.getResourceId(this.state.id).then((res) => {
        this.setState({
          name: res.data.name,
          price: res.data.price,
          shortDescription: res.data.shortDescription,
          quantity: res.data.quantity,
        });
      });
    }
  }

  saveDataUpdate = (e) => {
    e.preventDefault();
    let jsonData = {
      name: this.state.name,
      price: this.state.price,
      shortDescription: this.state.shortDescription,
      quantity: this.state.quantity,
    };

    if (this.state.id === "_dto") {
      ResourcesService.createNewResource(jsonData).then(() => {
        this.props.history.push("/all-data");
      });
    } else {
      ResourcesService.updateResource(jsonData, this.state.id).then(() => {
        this.props.history.push("/all-data");
      });
    }
  };

  cancel() {
    this.props.history.push("/all-data");
  }

  getTitle() {
    if (this.state.id === "_dto") {
      return <h3 className="text-center">Adding Data</h3>;
    } else {
      return <h3 className="text-center">Updating Data</h3>;
    }
  }

  render() {
    return (
      <div style={{"paddingBottom":"150px"}}>
        <br />
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Name </label>
                    <input
                      placeholder="Name"
                      name="name"
                      className="form-control"
                      value={this.state.name}
                      onChange={(e) =>
                        this.setState({ name: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label> Price </label>
                    <input
                      placeholder="Price"
                      name="price"
                      className="form-control"
                      value={this.state.price}
                      onChange={(e) =>
                        this.setState({ price: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label> Short Description </label>
                    <input
                      placeholder="Short Description"
                      name="shortDescription"
                      className="form-control"
                      value={this.state.shortDescription}
                      onChange={(e) =>
                        this.setState({ shortDescription: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label> Quantity </label>
                    <input
                      placeholder="Quantity"
                      name="quantity"
                      className="form-control"
                      value={this.state.quantity}
                      onChange={(e) =>
                        this.setState({ quantity: e.target.value })
                      }
                    />
                  </div>
                  <br />

                  <button
                    className="btn btn-success"
                    onClick={this.saveDataUpdate}
                  >
                    Save
                  </button>

                  <button
                    style={{ marginLeft: "15px" }}
                    className="btn btn-secondary"
                    onClick={this.cancel.bind(this)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateResource;
