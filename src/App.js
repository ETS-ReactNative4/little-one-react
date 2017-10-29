import React, { Component } from 'react';
import './App.css';

const photoCount=8
const addPhotos=4
const imgURL="https://api.cloudinary.com/v1_1/chambersbristol/resources/image"
const imgWidth="24%"

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
            mode: 'no-cors',
            method: 'get', 
            headers: {
              'Authorization': 'Basic '+btoa('839567664643584:kwlgq3rwjF9_23LQ8yksqOvS6As')
            }
        })
          .then(data => {return data.json()})
          .then(json => {
            const imageFolders=[]
            console.log(imageFolders)
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
              images.push({size:data.size,url:data.download_url,sha:data.sha});
          });  
          this.setState({imageURLs:images})
        })
  }

  render() {
    let viewMoreButton = null;
    if (this.state.photoCount < this.state.imageURLs.length) {
      viewMoreButton = <button onClick={this.viewMorePhotos}>View more from this album</button>;
    }

    return (
        <div>
          <div>
          <h1>Albert Stephen Xavier Chambers</h1>
          <h2>Born: Bristol on 20 July 2016 at 23:18, weight; 7 lbs 2 oz</h2>
          </div>
          <div>
            <select onChange={this.getPhotos} value={this.state.value}>
              <option>Select a photo album</option>
              {this.state.imageFolders.map((item,index) => {
                return <option key={index} value={item.url}>{item.title}</option>})}
              </select> 
          </div>
          <div>
          {
            this.state.imageURLs.slice(0, this.state.photoCount).map((item,index) => {
            return (<div className = {"image"}><a href={"#"+item.sha}><img key={index} src={item.url} style={{width:imgWidth, height:200}}/></a><div id={item.sha} className={"modalDialog"}><div><img src={item.url} className={"modal"}/><a href= {"#close"} className={"button"}>Close</a></div></div></div>)})}

          </div>
          <div>
          {viewMoreButton}
          </div>
        </div>
    );
  }
}

export default App;
