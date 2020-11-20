import React from 'react'
import './App.css';
import * as data from './json-data';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


class App extends React.Component {
  constructor() {
    super();
    this.state = { name: "", addr1: "", addr2: "", id: "", score: "", type: "" };
  }

  onSubmit = event => {
    //uncomment when using real api
    // let payload = { name: this.state.name, address1: this.state.addr1, address2: this.state.addr2, id: this.state.id, score: this.state.score, type: this.state.type }
    
    // comment when using real api 
    let payload = data.default;
    
    axios.post("https://jsonplaceholder.typicode.com/posts", payload).then(res => {
      console.log(res.data);
      this.setState({data:res.data})
    })
    event.preventDefault();
  }

  onFormChange = (event) => {
    let field = event.target.id;
    let value = event.target.value;
    if (field === 'ofac_name') this.setState({ name: value })
    if (field === 'ofac_addr1') this.setState({ addr1: value })
    if (field === 'ofac_addr2') this.setState({ addr2: value })
    if (field === 'ofac_id') this.setState({ id: value })
    if (field === 'ofac_score') this.setState({ score: value })
    if (field === 'ofac_type') this.setState({ type: value })
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark static-top header-style">
          <div>
            <a className="navbar-brand" href="#">
              <img src="equifax_logo.webp" className="logo-style" />
            </a>
            {/* <span className="equifax-bc h4">OFAC SCORE FORM</span> */}
          </div>
        </nav>

        <div className="p-5 m-5">
          <div>
            <form onSubmit={this.onSubmit}>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <label htmlFor="ofac_name">Name</label>
                  <input type="text" className="form-control" id="ofac_name" placeholder="Name" value={this.state.name} onChange={this.onFormChange} />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="ofac_addr1">Address Line 1</label>
                  <input type="text" className="form-control" id="ofac_addr1" placeholder="Address Line 1" value={this.state.addr1} onChange={this.onFormChange} />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="ofac_addr2">Address Line 2</label>
                  <input type="text" className="form-control" id="ofac_addr2" placeholder="Address Line 2" value={this.state.addr2} onChange={this.onFormChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <label htmlFor="ofac_id">Id</label>
                  <input type="text" className="form-control" id="ofac_id" placeholder="Id" value={this.state.id} onChange={this.onFormChange} />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="ofac_score">Score</label>
                  <input type="text" className="form-control" id="ofac_score" placeholder="Score" value={this.state.score} onChange={this.onFormChange} />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="ofac_type">Type</label>
                  <select id="ofac_type" className="form-control" value={this.state.type} onChange={this.onFormChange} >
                    <option defaultValue>Choose...</option>
                    <option>Type 1</option>
                    <option>Type 2</option>
                    <option>Type 3</option>
                    <option>Type 4</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-primary equifax-bc float-right">Submit</button>
            </form>
          </div>
          {this.state.data !== undefined &&
            <div className="pt-5 mt-5">
              <table className="table table-sm table-striped">
                <thead className="equifax-bc">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Request Name</th>
                    <th scope="col"> Name</th>
                    <th scope="col">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data !== undefined && this.state.data.similarity !== undefined && Object.keys(this.state.data.similarity).map((key, index) => {
                    return <tr key={index}>
                      <th scope="row">{index}</th>
                      <td>{this.state.data.requestName}</td>
                      <td>{key}</td>
                      <td>{this.state.data.similarity[key]}</td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>
          }
        </div>
      </div>

    )
  }
}

export default App;