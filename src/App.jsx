import React, { Component } from 'react';
import './App.css';

// This URL can be combined with an photo id to fetch an photo.
const PHOTO_URL = "https://picsum.photos/200?photo=";
// This URL can be used to get an array of objects that contain information
// about various photos.
const PHOTO_LIST_URL = "https://picsum.photos/list";

class App extends Component {
  // 1. Declare a state object that will be used to track an array of photos
  state = {
  }

  // 2. Declare a life cycle method
  // This life cycle method should:
  //  - will be called after the component is initially rendered
  // - will fetch an array of photos
  // - will add that array of photos to state once received
  componentWillMount() {
    fetch(PHOTO_LIST_URL)
    .then(res => res.json())
    .then(imageArray => imageArray.map(imageObject => ({filename: imageObject.filename, id: imageObject.id})))
    .then(imageObjectsArray => {
      this.setState({
        photos: imageObjectsArray
      })

    })
  }


  render() {
    const { photos = [] } = this.state;
    return (
      <React.Fragment>
        <header>
        <h1 className="fixed">Photo Wall</h1>
          <p>
           Jen's Gallery of Mysterious Photos
          </p>
        </header>
        <div className="collage">
            {/* We use map here because Array.prototype.map is an expression,
              * and for loops are not. You'll learn more about this soon! 
              */}
            {photos.map( photo => 
                <img alt={`${photo.filename}`}
                     key={`${photo.id}`}
                     src={PHOTO_URL + photo.id}
                />
            )}
        </div>
      </React.Fragment>
    );
  }
}

export default App;

//Notes Below:
// the next lifecycle method we are using in today's assessment is called componentDidMount. React calls this lifecycle method after the component has rendered once and added to the DOM (that is what "mounting" means -- mounting the component onto the page). 

// fetch requests are always put inside the componentDidMount method. Once a fetch request completes and you have data back from the server inside a .then, you can add that data to the component's state, using this.setState.

// componentDidMount() {
//     fetch(/* ... */)
//         .then(res => res.json())
//         .then(data => {
//             this.setState({ someName: data })
//         })
//         .catch(err => {
//             console.log(err)
//         })
// }


// // this.setState causes react to rerun the component's render method. this is because react is designed to "react" automatically to changes in data.

// // You can do conditional rendering for a component based on some state value, like this.state.someName -- very similar to how you can use some props value for conditional rendering, like this.props.someName 

// // {this.state.someName ? <h1>Title</h1> : null}

// // However, remember that values from this.state and this.props should be considered read only. you cannot modify values of this.props because those are defined by the parent component. you should not modify this.state values directly. should only use this.setState to modify them.

// There is a very important pattern to remember related to rendering arrays. inside a component's render method, you can convert an array of values into an array of components to be rendered.

// {this.state.items.map(item => <img src={item.url} />)}

// this mapping pattern is used very frequently to quickly render a list of similar items. for example, a list of Product components on a product search page. HTTP responses (data received back from a fetch request) often include arrays anyways, so when this data is put into component state then it can easily be rendered with this mapping pattern.
