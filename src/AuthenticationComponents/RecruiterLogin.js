import React, { Component } from 'react';
import AuthenticationDataService from "./AuthenticationDataService"
import AuthenticationService from './AuthenticationService';
import CompanyHomePage from '../CompanyComponents/CompanyHome'
import { withRouter } from 'react-router';

import Cookies from 'universal-cookie';

class RecruiterLogin extends Component {
  
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onSubmit(values) {

        const { history } = this.props;

        
        let requestBody ={
            
        username:this.state.username,
        password:this.state.password,
              
        }

        AuthenticationDataService.recruiterLogin(requestBody)
        .then((response) => { 
                AuthenticationService.registerSuccessfulCompanyLogin(response.data);  
                console.log(new Cookies().get('Recruiter'));
                if(response.data == null)
                {
                    this.setState({error:"Invalid credentials"})
                } 
                else{  
                    this.setState({error:"Valid credentials"});
                    console.log( response.data );
                    alert("valid credentials");
                    //history.push('/Company/Home');
                }
                console.log(response.data) })
        .catch(  
        err=>{
            console.log(err)
            this.setState({error:"Invalid credentials"})
        } )
    }


    componentDidMount() {
        console.log("Company login component did mount");
    }

    handleChange(event)//This is a synthetic event
    {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <div className="container">

                <div className="row">
                    <div className="col-md-6">

                        {this.state.error && <div className="alert alert-danger" role="alert">
                            {this.state.error}
                        </div>}

                    </div>
                </div>

                <div className="row">
                    <div>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" name="username" className="form-control" onChange={this.handleChange}
                                placeholder="Enter email" />
                            <small className="form-text text-muted">Your registered official email goes here</small>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" className="form-control" onChange={this.handleChange}
                                id="exampleInputPassword1" placeholder="Password" />
                        </div>

                        <br />

                        <button type="submit" className="btn btn-success" style={{ width: "100%" }}
                            onClick={this.onSubmit}
                        >Submit</button>

                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(RecruiterLogin);