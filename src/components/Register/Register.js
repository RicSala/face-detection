import {Component} from "react";

class Register extends Component {


  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
    }
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value })
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  onButtonClick = () => {
      const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    }

    const conf = {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newUser),
    }
    
    fetch('https://face-detection-api.onrender.com/register', conf)
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      }
        )

  }

  render() {
    return (
    
            <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m mw6 center pa2 cb shadow-5">
      <div>
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="ph0 mh0 fw6 clip">Sign Up</legend>
          <div className="mt3">
            <label className="db fw4 lh-copy f6" >Name</label>
              <input className="pa2 input-reset ba bg-transparent w-100 measure hover-bg-black white"
                onChange={ this.onNameChange }
                type="text" name="name" id="name" />
          </div>
          <div className="mt3">
            <label className="db fw4 lh-copy f6">Email</label>
              <input className="pa2 input-reset ba bg-transparent w-100 measure hover-bg-black white"
                onChange={ this.onEmailChange }
                type="email" name="email-address" id="email-address" />
          </div>
          <div className="mt3">
            <label className="db fw4 lh-copy f6" >Password</label>
              <input className="b pa2 input-reset ba bg-transparent hover-bg-black white"
                onChange={ this.onPasswordChange }
                type="password" name="password" id="password" />
          </div>
        </fieldset>
                    <div className="mt3"><button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" value="Sign in" onClick={ this.onButtonClick }>Register</button></div>
                    <div className="mt3 pointer hover-white" onClick={() => this.props.onRouteChange('signin') }>Already a member?</div>
      </div>
    </article>
            
    
        )


  }

}


export default Register;