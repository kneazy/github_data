import React, { Component } from 'react';
import axios from 'axios';


class UserInfo extends Component {

    constructor(props){
        super(props);
        this.state = {
            login: '',
            avatar_url:'',
            id:'',
            company:'',
            email:'',
            created_at:'',
            bio: '',
            html_url: '',
            data:[]
        }
    }
    componentDidMount () {
        axios.get('https://api.github.com/users/'+this.props.userName)
        .then((info) => {
            this.setState({
                bio: info.data.bio,
                login: info.data.login,
                avatar_url: info.data.avatar_url,
                id: info.data.id,
                company: info.data.company,
                email: info.data.email,
                created_at: info.data.created_at,
                html_url: info.data.html_url

              })
        })   
        axios.get('https://api.github.com/users/'+this.props.userName+'/repos')
        .then((dataRepo) => {
            this.setState({
                data: dataRepo.data
            })
        })
        .catch(function (error) {
                console.log(error);
            });
        }
    repoData(){
        return (
           this.state.data.map((item, i) => {
                 return (<li key={i}>{item.name}</li>);
            })
        );
    }
    render() {
        const data = this.repoData();
        return (
            <div className="wrapper">
                <div className="data">
                    <h1>{this.state.login}</h1>
                    <p>login: {this.state.login}</p>
                    <p>id: {this.state.id}</p>
                    <p>company: {this.state.company}</p>
                    <p>email: {this.state.email}</p>
                    <p>created at: {this.state.created_at}</p>
                    <p>bio: {this.state.bio}</p>
                    <p>html url: {this.state.html_url}</p>
                    <h2>Repositories:</h2>
                    <ol>{data}</ol>
                </div>
                <img src = {this.state.avatar_url} alt="img"/>
            </div>
        );
    }
  }
  
  export default UserInfo;
  