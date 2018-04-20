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
        const {login, id, company, email, created_at, bio, html_url, avatar_url} = this.state
        return (
            <div className="wrapper">
                <div className="data">
                    <h1>{login}</h1>
                    <p>login: {login}</p>
                    <p>id: {id}</p>
                    <p>company: {company}</p>
                    <p>email: {email}</p>
                    <p>created at: {created_at}</p>
                    <p>bio: {bio}</p>
                    <p>html url: {html_url}</p>
                    <h2>Repositories:</h2>
                    <ol>{data}</ol>
                </div>
                <img src = {avatar_url} alt="img"/>
            </div>
        );
    }
}
  
  export default UserInfo;
  