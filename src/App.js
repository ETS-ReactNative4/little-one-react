import React, { Component } from 'react';
import './App.css';

const photoCount=12
const addPhotos=4
const imgURL="https://api.github.com/repos/robchamberspfc/little-one-images/contents/content"
const imgWidth="25%"

class App extends Component {

  constructor(props) {
    super(props);
    this.state={imageFolders:[], imageURLs:[], photoCount: photoCount};
    this.viewMorePhotos=this.viewMorePhotos.bind(this);
    this.getPhotos=this.getPhotos.bind(this);
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

          fetch(option.target.value, {
            mode: 'cors'
        })
          .then(data => {return data.json()})
          .then(json => {
            //console.log(json)
            const images=[]
            json.map((data,index) => {
              images.push({size:data.size,url:data.download_url});
          });  
          this.setState({imageURLs:images})
        })
  }

  render() {
    let viewMoreButton = null;
    if (this.state.photoCount < this.state.imageURLs.length) {
      viewMoreButton = <button onClick={this.viewMorePhotos}>View more</button>;
    }

    return (
        <div>
          <h1>Baby website</h1>
          <p>
            <select onChange={this.getPhotos} value={this.state.value}>
              <option>Select a photo set</option>
              {this.state.imageFolders.map((item,index) => {
                return <option key={index} value={item.url}>{item.title}</option>})}
              </select> 
          </p>
          <p>
          {
            this.state.imageURLs.slice(0, this.state.photoCount).map((item,index) => {
                return <img key={index} src={item.url} style={{width:imgWidth}}/> })
            }
          </p>
          {viewMoreButton}
        </div>
    );
  }
}

export default App;
