import axios from 'axios';


const Auth = {
    isAuthenticated: false,
    userId: '',
    userName: '',
    authenticate(payload, func){
        console.log("AUTH: authenticate: ",payload)
        axios({
            url: '/api/login',
            method: 'POST',
            data: payload
        })
        .then((resp) => {
            console.log("Data sent to server. Response: ", resp);
            if (resp.data.userId){
                this.isAuthenticated = true;
                this.userId = resp.data.userId;
                this.userName = resp.data.userName;
                console.log("userId:",this.userId, ". userName:",this.userName);
                func(this.userId);
                return "login successful"
            } else {
                return "login failed: " + resp.data.msg
            }
        })
        .catch((err) => {
            console.log("Internal server error.", err);
            alert(err.message)
            return "login failed"
        });
    },
    register(payload, func){
        console.log("AUTH: register")
        axios({
            url: '/api/register',
            method: 'POST',
            data: payload
        })
        .then((resp) => {
            console.log("Data sent to server");
            this.isAuthenticated = true; 
            this.userId = resp.data.userId;
            func(this.userId);
            return "registration successful. logged in."
        })
        .catch((err) => {
            console.log("Err details: ",err.name," // ", err.response)
            console.log("Registration failed due to internal server error.", err);
            
                if (err.response.data.fail === "user-exists") {
                   // Duplicate username
                  alert('User already exists!');
                 }
           
        })
    },
    signout(func){
        console.log("AUTH: logout");
        const payload = {userId: this.userId};

        axios({
            url: '/api/logout',
            method: 'POST',
            data: payload
        })
        .then((resp) => {
            console.log("Data sent to server. Response: ", resp);
            this.isAuthenticated = false;
            this.userId = '';
            this.userName = '';
            console.log("User ",payload, " logged out.");
            return "logout successful"
        })
        .catch((err) => {
            console.log("Internal server error.", err);
            alert(err.message)
            return "logout failed"
        });
        this.isAuthenticated = false;
        func('');
    },
    getAuth(){
        return this.isAuthenticated;
    },
    getUserId(){
        return this.userId;
    },
    getUserName(){
        return this.userName;
    }
}

export default Auth;