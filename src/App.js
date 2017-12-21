import React, { Component } from 'react';
import './App.css';
import './tiled.css';

const photoCount=12
const imgURL="https://api.github.com/repos/robchamberspfc/little-one-images/contents/content"
const imgLocation="https://raw.githubusercontent.com/robchamberspfc/little-one-images/master/content/"
const imgThumbnailBase="https://chambersbristol.tiny.pictures/main/"
const imgThumbnailwidth="450"

class App extends Component {

  constructor(props) {
    super(props);
    this.state={imageFolders:[], option:[], imageURLs:[], photoCount: photoCount, imageTumbnails:[], modal:"", modalNext:"",modalPrevious:"",imageStatus:true, addPhotos:0 };
    this.viewMorePhotos=this.viewMorePhotos.bind(this);
    this.getPhotos=this.getPhotos.bind(this);
    this.updateModal=this.updateModal.bind(this);
    this.setModal=this.setModal.bind(this);
    }
  
  componentWillMount() {
      this.populateImageFolders();
      console.log(document.documentElement.clientWidth)
      let viewport = document.documentElement.clientWidth
      console.log(viewport)
      if (viewport <= 650){
        this.setState({addPhotos:2})
      }
      if (viewport <= 1050 && viewport >= 651){
        this.setState({addPhotos:3})
      }
      if (viewport >= 1051){
        this.setState({addPhotos:4})
      }
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
    const newPhotos=this.state.photoCount+this.state.addPhotos;
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
              let thumbnail = data.download_url
              thumbnail = thumbnail.replace(imgLocation, imgThumbnailBase);
              thumbnail = thumbnail + "?width=" + imgThumbnailwidth
              images.push({size:data.size,url:data.download_url,sha:data.sha, thumbnail:thumbnail});
          });
          this.setState({imageURLs:images})
          this.setState({imageTumbnails:this.state.imagesURLs})
        })
  }

  setModal (item,id,event) {
    const newModal = item.url
    const newModalNext = id+1
    const newModalPrevious = id-1
    this.setState({modal:newModal})
    this.setState({modalNext:newModalNext})
    this.setState({modalPrevious:newModalPrevious})

  }

  updateModal (item) {
    this.setState({ imageStatus: true })
    console.log(this.state.imageStatus)
    const newModal=this.state.imageURLs[item.target.id].url
    this.setState({modal:newModal})
    const newModalNext = parseInt(item.target.id, 10)+1
    const newModalPrevious = parseInt(item.target.id, 10)-1
    this.setState({modalNext:newModalNext})
    this.setState({modalPrevious:newModalPrevious})
  }

  handleImageLoaded() {
    this.setState({ imageStatus: false })
    console.log(this.state.imageStatus)
  }

  render() {
    let viewMoreButton = null;
    let previousButton = null;
    let nextButton = null;
    if (this.state.photoCount < this.state.imageURLs.length) {
      viewMoreButton = <button className = {"morePhotos"} onClick={this.viewMorePhotos}>View more from this album</button>;
    }

    if (this.state.modalPrevious >= 0) {
      previousButton = <button display= {"inline-block"} onClick={this.updateModal} id={this.state.modalPrevious} className={"imageNav"}>Previous</button>
    }

    if (this.state.modalNext < this.state.imageURLs.length) {
      nextButton = <button display= {"inline-block"} onClick={this.updateModal} id={this.state.modalNext} className={"imageNav"}>Next</button>
    }

    let content = this.state.imageStatus ? <div>Loading...</div> : null;



    return (
        <div className={"wrapper"}>
          <div>
          <h1>Albert Stephen Xavier Chambers</h1>
          <h2>Born: Bristol on 20 July 2016 at 23:18, weight; 7lbs 2oz</h2>
          </div>
          <div>
            <select onChange={this.getPhotos} value={this.state.value}>
              <option>Select a photo album</option>
              {this.state.imageFolders.map((item,index) => {
                return <option key={index} value={item.url}>{item.title}</option>})}
              </select> 
          </div>
          {
            this.state.imageURLs.slice(0, this.state.photoCount).map((item,index) => {
            return (
              <div key={index} className={"box"}><div key={index} className={"boxInner"}>
              <div key={index} className={"image"}>
                <a href={"#modal"} onClick={(e) => this.setModal(item,index,e)}>
                  <img src={item.thumbnail} className={"thumbnail"} alt = {""}/>
                </a>
              </div>
              </div></div>
            )
            })
          }
          <div>
            {viewMoreButton}
          </div>
          {
            <div id={"modal"} className={"modalDialog"}>
              <div>
              {content}
              <img onLoad={this.handleImageLoaded.bind(this)} src={this.state.modal} display={"inline-block"} alt={""} className={"modal"}/>
                {nextButton}
                {previousButton}
                <form action="#close">
                    <button className={"imageNav"} type={"submit"}>Close</button>  
                </form>
              </div>
            </div>
          }
        </div>

    );
  }
}

export default App;
