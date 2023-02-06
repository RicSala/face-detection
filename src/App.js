import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Input from './components/Input/Input';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import { Component } from 'react';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

const initialState =    {
  input: "",
  url: "",
  faceBoxes: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  },

}

class App extends Component {

  constructor() {
    super()
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({ user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    }
    })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onRouteChange = ( route ) => {
    if (route === 'home') {
      this.setState({ isSignedIn: true })
    } else {
      this.setState({ isSignedIn: false })
    }
    this.setState({route: route})
  }


  incrementEntries = (userIdToIncrease) => {
    const conf = {
      method: "put",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({id: userIdToIncrease})
    }
    fetch('http://localhost:3000/image', conf)
      .then(response => response.json())
      .then(entries => {
        this.setState((prevState) => ({
          ...prevState,
          user: {
            ...prevState.user,
            entries: entries
          }
        }));
        
      }
      )
      .catch((e => console.log("COULDN'T FIND USER", userIdToIncrease)))
      

  }

  signOut = () => {
    this.setState(initialState)
  }
  
  onButtonSubmit = () => {
    this.setState({ url: this.state.input })
    
    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

        //////////////////////////////////////////////////////////////////////////////////////////
    // In this section, we set the user authentication, app ID, model details, and the URL
    // of the image we want as an input. Change these strings to run your own example.
    /////////////////////////////////////////////////////////////////////////////////////////

    const USER_ID = 'ricsala';
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = 'eff76052abbc402bab1f66656c5f9908';
    const APP_ID = 'face-recognition';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    // const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';    

    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": this.state.input
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
        .then(response => response.json())
      .then(result => {
        this.calculatePosition(result)
        this.incrementEntries(this.state.user.id)
      })
        .catch(error => console.log('error', error));

  }

  calculatePosition = (data) => {
    const faces = data.outputs[0].data.regions[0].region_info.bounding_box;
    const top = faces.top_row * 100 + "%";
    const left = faces.left_col * 100 + "%"
    const width = (faces.right_col - faces.left_col) * 100 + "%"
    const height = ( faces.bottom_row - faces.top_row) * 100 + "%"
    this.setState({ faceBoxes: { top: top, left: left, width: width, height: height } })
    
  }
  render() {

    const { route, isSignedIn, url, faceBoxes } = this.state;

    return (
      <div className="App">
      {<ParticlesBg type="tadpole" bg={true} num={10} color={"black"} />}
      <Navigation onRouteChange={this.onRouteChange} route={ route } isSignedIn= { isSignedIn } signOut = { this.signOut } />
      <Logo />
      { 
        route === 'home' ?
        <div>
          <Rank user = { this.state.user } />
          <Input onInputChange={ this.onInputChange } onButtonSubmit = { this.onButtonSubmit } />
          <FaceRecognition faceBoxes={ faceBoxes } imageUrl={ url } />
        </div> :
        route === 'signin' ?
            <Signin onRouteChange={this.onRouteChange} loadUser={ this.loadUser } />
      :
        route === 'register' ?
          <Register onRouteChange={this.onRouteChange} loadUser = { this.loadUser } />
      :
      
      <h1>ERROR!</h1>

        }
  
      </div>
    );
  }
}

export default App;


// TODO: when you submit a picture, a new state prop is created!!!! (email and entries)