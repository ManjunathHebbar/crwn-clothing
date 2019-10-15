import React from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import './sign-in.styles.scss'
import { auth, signInWithGoogle} from '../../firebase/firebase.utils'

export default class SignIn extends React.Component{
    constructor(props){
      super(props)
      this.state = {
         email:'',
         password:''
      } 
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {email, password} = this.state;
        console.log(email);
        console.log(password);
        try{
            await auth.signInWithEmailAndPassword(email,password);
            this.setState({email:'', password:''})
        }

        catch(error){
            console.log(error);
        }
        
    };

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
              <form onSubmit={this.handleSubmit}>
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
