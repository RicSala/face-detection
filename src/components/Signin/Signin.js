import React from "react";

class Signin extends React.Component {
  
  constructor( props ) {
    super();
    this.state = {
      email: "",
      password: "",
    }
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  onButtonClick = (event) => {

    const user = {
      email: this.state.email,
      password: this.state.password,
    }
    
    const conf = {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(user),
    }

    fetch('http://localhost:3000/signin', conf)
      .then(response => response.json())
      .then(data => {
        
        if ( data.id ) {
          this.props.loadUser(data);
          this.props.onRouteChange('home');
        } else {
          const warning = document.createElement("div");
          warning.setAttribute("id", "warning-div")
          const warningMessage = document.createTextNode("FAILED TO LOG IN");
          warning.appendChild(warningMessage);
          warning.classList = "red pa2 b"
          document.getElementById("submit-button").append(warning);
        }
      })


  }


  render() {
    const { onRouteChange } = this.props;
    return (

<article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m mw6 center pa2 cb shadow-5">
  <div>
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="ph0 mh0 fw6 clip">Sign in</legend>
      <div className="mt3">
        <label className="db fw4 lh-copy f6">Email</label>
              <input className="pa2 input-reset ba bg-transparent w-100 measure hover-bg-black white"
                onChange={this.onEmailChange} type="email" name="email-address" id="email-address"/>
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6">Password</label>
        <input className="b pa2 input-reset ba bg-transparent hover-bg-black white" onChange={ this.onPasswordChange } type="password" name="password"  id="password"/>
      </div>
    </fieldset>
                <div className="mt3" id="submit-button"><button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" value="Sign in" onClick={ this.onButtonClick }>Sign In</button></div>
                <div className="mt3 hover-white pointer" onClick={() => onRouteChange('register')}>Register</div>
  </div>
</article>
    )
  
}
}

export default Signin;