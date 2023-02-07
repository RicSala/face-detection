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
    fetch('https://face-detection-api.onrender.com/image', conf)
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

    const conf = {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(this.state),
    }

    fetch('https://face-detection-api.onrender.com/detectFaces', conf)
      .then(response => response.json())
      .then(data => {
        this.setState({faceBoxes: data})
      });
    
    this.incrementEntries(this.state.user.id)

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