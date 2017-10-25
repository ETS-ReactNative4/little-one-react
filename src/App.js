import React, { Component } from 'react';
import './App.css';

const photoCount=12
const addPhotos=6
const imgURL="https://api.github.com/repos/robchamberspfc/little-one/contents/content/"

class App extends Component {

  constructor(props) {
    super(props);
    this.state={imageFolders:[], photoCount: photoCount, value: "" };
    this.viewMorePhotos=this.viewMorePhotos.bind(this);
    }
  
  componentWillMount() {
      this.populateImageFolders();
  }

  populateImageFolders() {
        fetch(imgURL, {
            mode: 'cors'
        })
          .then(data => {return data.json()})
          .then(json => {
            const imageFolders=[]
            json.map((data,index) => {
              imageFolders.push({title:data.name,url:data.url});
          });  
          this.setState({imageFolders:imageFolders})
        })
  }

  viewMorePhotos () {
    const newPhotos=this.state.photoCount+addPhotos;
    this.setState({photoCount: newPhotos});
  }

  getPhotos (option) {
    console.log(option.target.value)
  }

  render() {
    return (
        <div>
          <h1>Baby website</h1>

          <h2>{this.state.photoCount}</h2>
          <button onClick={this.viewMorePhotos}>
          View more
        </button>
        <p>
        <select onChange={this.getPhotos} value={this.state.value}>
          {this.state.imageFolders.map((item,index) => {
            return <option key={index} value={item.url}>{item.title}</option>})}
          </select>
        </p>
        </div>
    );
  }
}

export default App;
