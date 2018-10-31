import React from 'react'
import FacebookLogin from 'react-facebook-login'
//import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import './App.css'
import axios from 'axios'
//const sender = `Uc5527e90cf3cab8c540dd8f41d70aec1`

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "Kachain Jantalat",
            email: "chainrock55@gmail.com",
            picture: "https://images.pexels.com/photos/371997/pexels-photo-371997.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"

        }
        this.responseFacebook = this.responseFacebook.bind(this)
        
    }

    responseFacebook(response) {
         this.setState = {
             name: response.name,
             email: response.email,
             picture: response.picture

         }
        //  console.log(response.name)
        //  console.log(response.email)
        //  console.log(response.id)
        //  console.log(response.status)
          console.log(response)
          //เปลี่ยนตลอด
        axios.post('https://17e6aac3.ngrok.io/alert/login/facebook', {
            id:`Uc5527e90cf3cab8c540dd8f41d70aec1`,
            img: response.picture.data.url,
            name:response.name,
            email:response.email,
            token:response.accessToken
        })
        
    }
   
    render() {
        return (
            <div className="App">

                <FacebookLogin
                    appId='2151104588290288'
                    fields="name,email,picture"
                    
                    callback={this.responseFacebook}
                    cssClass="my-facebook-button-class"
                    icon="fa-facebook"
                    // render={(renderProps) => (
                    //     <button onClick={renderProps.onClick}>Login Facebook</button>
                       

                    // )}

                />
                
                <div>
                
                    <div id="status">
                    </div>

                    <figure>
                        <img src={this.state.picture} alt="Not found" height="200" width="300" />
                    </figure>
                </div>
                <div>
                    <p>{this.state.name}</p>
                    <p>{this.state.email}</p>
                </div>
            </div>


        )
    }
}
export default Register