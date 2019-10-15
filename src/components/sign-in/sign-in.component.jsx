import React from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import './sign-in.styles.scss'
import {signInWithGoogle} from '../../firebase/firebase.utils'

export default class SignIn extends React.Component{
    constructor(props){
      super(props)
      this.state = {
         email:'',
         password:''
      } 
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({email:'', password:''})
    }

    handleChange = (event) =>{
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    render(){
        return(
            <div className="sign-in">
              <div className="title">
              <h2>I already have an account</h2>
              <span>Sign-In with your email and password</span>
              </div>
              <form onSubmit={this.hadleSubmit}>
                  <FormInput 
                  type="email" 
                  name="email" 
                  label="email"
                  handleChange = {this.handleChange} 
                  value={this.state.email} required/>
                  
                  <FormInput 
                  type="password" 
                  name="password" 
                  label ="password"
                  handleChange = {this.handleChange}
                  value={this.state.password} required/>
                  
                  <div className="button">
                  <CustomButton type="submit">sign in</CustomButton>
                  <CustomButton onClick={signInWithGoogle} isGoogleSignIn>sign in with google</CustomButton>
                  </div>
              </form>
            </div>
        )
    }
}
