<template>
    <div class="container">
        <div class="center">
            <div class="welcome-content">
                <h3>Welcome to our site</h3>
                <h1>Login</h1>
                <h2>Teras Rindang Resto</h2>
                <div class="content">
                    <p>When you rise in the morning, give thanks for the light, for your strength.
                    Give thanks for your food and for the joy of living.
                    If you see no reason to give thanks, the fault lies in yourself.
                    </p>
                    <p style="margin-top: 3px">-- Tecumseh --</p>
                </div>
                <div class="sliders">
                    <Slider
                        :image="images[chosenImage]"
                        :image2="imagess[chosenImage]"
                        :image3="imagesss[chosenImage]"
                        :image4="imagessss[chosenImage]"
                    />
                </div>
            </div>
            <div class="btn-top">
                <p>HI TERASER !</p>
            </div>
            <nav class="navbar">
                <ul>
                    <li><a href="#">LOGIN</a></li>
                    <li><a href="#">ABOUT</a></li>
                    <li><a href="#">CONTACTS</a></li>
                </ul>
            </nav>
            <div class="side">
                <div class="background-login">
                    <div class="container-login">
                        <div class="login" v-show="!show">
                            <h1>LOGIN</h1>
                            <label for="email"><b-icon icon="envelope-fill" font-scale="1"></b-icon></label>
                            <input
                                type="text"
                                id="email"
                                placeholder="Email Address"
                                v-model="formLogin.email"
                                required
                            ><br>
                            <label for="password"><b-icon icon="lock-fill"></b-icon></label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                v-model="formLogin.password"
                                required
                            >
                            <div class="btn">
                                <button class="checkout" @click="login(formLogin)">Login</button>
                            </div>
                            <p>New user ? <span @click="showRegis()">REGISTER</span></p>
                        </div>

                        <div class="regis" v-show="show">
                            <h1>REGISTER</h1>
                            <div>
                                <label for="nameRegis"><b-icon icon="person-fill"></b-icon></label>
                                <input
                                    type="text"
                                    id="nameRegis"
                                    placeholder="Name"
                                    v-model="name"
                                    required
                                >
                            </div>
                            <label for="emailRegis"><b-icon icon="envelope-fill"></b-icon></label>
                            <input
                                type="text"
                                id="emailRegis"
                                placeholder="Email Address"
                                v-model="email"
                                required
                            ><br>
                            <span class="msg">{{msgEmail}}</span>
                            <label for="passwordRegis"><b-icon icon="lock-fill"></b-icon></label>
                            <input
                                type="password"
                                id="passwordRegis"
                                placeholder="Password"
                                v-model="password"
                                required
                            ><br>
                            <span class="msg">{{msgPassword}}</span>
                            <div class="btn">
                                <button class="checkout" @click="register(name, email, password)">Register</button>
                            </div>
                            <p>Have an account ? <span @click="showLogin()">LOGIN</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Slider from '../components/Slider'

    export default {
        name : "login",
        components: {
            Slider
        },
        data() {
            return {
                show : false,
                name : null,
                email : null,
                password : null,
                formLogin : {
                    email : null,
                    password : null
                },
                msgEmail : null,
                msgPassword : null,
                images : [
                    {url: "https://user-images.githubusercontent.com/58587826/107792315-91428380-6d87-11eb-9e8e-020fdc44d253.png"},
                    {url: "https://user-images.githubusercontent.com/58587826/107792664-f5654780-6d87-11eb-96fc-793baef88119.png"}
                ],
                imagess : [
                    {url: "https://user-images.githubusercontent.com/58587826/107792303-8ee02980-6d87-11eb-865f-e89470fea867.png"},
                    {url: "https://user-images.githubusercontent.com/58587826/107792668-f72f0b00-6d87-11eb-9369-703a0a8af0a3.png"}
                ],
                imagesss : [
                    {url: "https://user-images.githubusercontent.com/58587826/107792300-8daefc80-6d87-11eb-8e25-9ec1f889c8da.png"},
                    {url: "https://user-images.githubusercontent.com/58587826/107792677-f8f8ce80-6d87-11eb-983c-17e3c2c1b9e4.png"}
                ],
                imagessss : [
                    {url: "https://user-images.githubusercontent.com/58587826/107792291-8ab40c00-6d87-11eb-913f-3a705a510de7.png"},
                    {url: "https://user-images.githubusercontent.com/58587826/107792682-fac29200-6d87-11eb-95bb-91decb84d246.png"}
                ],
                chosenImage: 0
            }
        },
        methods: {
            showRegis() {
                this.show = true
                this.formLogin.email = null
                this.formLogin.password = null
            },
            showLogin() {
                this.show = false
                this.name = null
                this.email = null
                this.password = null
                this.msgEmail = null
                this.msgPassword = null
            },
            login(data) {
                this.$store.dispatch("login", data)
                .then(() => {
                    this.$router.push({ path: "/"}).catch((err) => {err})
                    location.reload()
                })
                .catch((err) => {
                    console.log(err);
                })
            },
            register(data) {
                data = {
                    name : this.name,
                    email : this.email,
                    password : this.password,
                    role : "customer"
                }
                if (data.name == undefined || data.email == undefined || data.password == undefined) {
                    return alert("Make sure all data is filled.")
                }
                if (this.msgEmail != '' || this.msgPassword != '') {
                    return alert("Make sure all data is correct.")
                }

                axios({
                    method : "post",
                    url : process.env.VUE_APP_URL + "users", data,
                    headers : {
                        "Content-type" : "application/json"
                    },
                })
                .then(() => {
                        alert("User added! Please login.");
                        this.$router.push({ path: "/login"}).catch((err) => {err})
                        location.reload()
                }).catch((err) => {
                    alert("Email is already registered.")
                    console.log(err)
                });
                this.show = false
            },
            move() {
                let flag = this.chosenImage
                flag++
                if(flag >= this.images.length) {
                    flag = 0
                }
                this.chosenImage = flag
            }
        },
        created() {
            let self = this
            setInterval(() => {
                self.move()
            }, 5000)
        },
        watch : {
            email : function() {
                this.msgEmail = this.validateEmail
            },
            password : function() {
                this.msgPassword = this.validatePassword
            }
        },
        computed : {
            validateEmail() {
                if (this.email != null) {
                    let reg = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    if (reg.test(this.email)) {
                        return ''
                    }
                    else {
                        return 'Invalid email address'
                    }
                }
                else {
                    return this.email
                }
            },
            validatePassword() {
                if (this.password != null) {
                    let difference = 8 - this.password.length;
                    if (this.password.length < 8) {
                        return `Must be 8 characters! ${difference} characters left`
                    }
                    else {
                        return ''
                    }
                }
                else {
                    return this.password
                }
            },
        },
    }
</script>

<style scoped>
    @font-face {
        font-family: dynalight;
        src : url(../../dynalight-regular-webfont.woff) format('woff');
        font-family: kaushan;
        src : url(../../kaushanscript-regular-webfont.woff) format('woff');
    }
    body {
        height: 100%;
    }
    .container {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: -1;
        background-position: center;
        background-image: url("../assets/ryan.jpg");
        background-size: cover;
    }
    .msg {
        width: fit-content;
        display: block;
        font-size: 11px;
        color: red;
        text-align: center;
        margin: 0 5px;
        position: relative;
        padding: 3px 8px;
        border-radius: 3px;
        z-index: 1;
    }
    .center {
        width: 90%;
        height: 90%;
        position: fixed;
        z-index: 0;
        margin: 2.5% 5%;
        background-image: url("../assets/0001.jpg");
        background-size: cover;
    }
    .navbar {
        width: 59%;
        position: fixed;
        top: 8%;
        left: 25%;
        font-weight: bold;
    }
    .navbar ul li {
        display: inline-block;
        margin: 5px 10px;
        width: 70px;
        text-align: center;
    }
    .navbar ul li a {
        text-decoration: none;
        color: rgba(0, 0, 0, .5);
        font-size: 12px;
    }
    .navbar ul li a:hover {
        background-color: rgb(146, 190, 58);
        padding: 8px;
        color: white;
        font-weight: bold;
        border-radius: 10px;
    }
    .welcome-content {
        width: calc(100% - 400px);
        height: 450px;
        margin-top: 10%;
        padding: 2% 50px 30px 10%;
        line-height: 32px;
        overflow: auto;
    }
    .welcome-content h3 {
        font-size: 20px;
        margin-left: 20px;
        color: rgba(0, 0, 0, .5);
    }
    .welcome-content h1 {
        font-size: 48px;
        color: #F08519;
        margin: 20px;
    }
    .welcome-content h2 {
        font-size: 28px;
        font-family: kaushan;
        color: #F08519;
        margin-left: 20px;
    }
    .content {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        color: rgba(0, 0, 0, .4);
        margin: 45px 0 30px 20px;
        font-weight: bold;
        width: 70%;
    }
    .welcome-content p {
        text-align: left;
        font-size: 14px;
        line-height: 24px;
        margin-bottom: 10px;
    }
    .menu {
        width: 70%;
        margin: 10px 0 0 20px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }
    .menu .img {
        width: 100px;
    }
    .menu .img img {
        width: 90px;
    }
    .btn-top {
        width: 100px;
        height: 30px;
        border: 1px solid rgba(0, 0, 0, .6);
        border-radius: 10px;
        position: fixed;
        top: 8%;
        right: 8%;
    }
    .btn-top p {
        margin-top: 0;
        line-height: 30px;
        color: rgba(0, 0, 0, .6);
        font-weight: bolder;
    }
    .side {
        width: 330px;
        height: 74%;
        position: fixed;
        z-index: 1;
        top: 18%;
        right: 9%;
    }
    .background-login {
        width: 100%;
        height: 470px;
        box-shadow: 0 3px 20px 0 rgba(0, 0, 0, .2);
        margin: auto;
        padding-top: 120px;
        background-color: rgba(255, 255, 255, .5);
        border-radius: 30px;
        background-image: url("../assets/zhen.jpg");
        background-size: cover;
    }
    .container-login {
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, .9);
        border-radius: 30px;
        padding: 30px 40px 40px 31px;
    }
    .login h1, .regis h1 {
        margin: 0 0 20px 3px;
        font-size: 28px;
    }
    button, input {
        width: 100%;
        padding: 9px 35px;
        font-size: 13px;
        border: none;
        margin: 5px;
        color: black;
        background: rgba(0, 0, 0, .1);
    }
    .btn button {
        color: white;
    }
    input:focus {
        outline: none;
    }
    button {
        margin: -10px 0 0 -95px;
        background-color: red;
        border-radius: 20px;
    }
    label {
        position: absolute;
        margin: 14px 0 0 15px;
    }
    p {
        width: 100%;
        font-size: 12px;
        text-align: center;
        margin-top: -20px;
    }
    span {
        color: blue;
        cursor: pointer;
    }
    .sliders {
        margin-left: 20px;
    }

    @media (max-width: 760px) {
        .welcome-content {
            width: 50%;
            margin: 27% 0 0 -40px;
        }
        .content {
            display: none;
        }
        .sliders {
            display: none;
        }
    }
    @media (max-width: 600px) {
        .center {
            background-image: none;
            height: 100%;
        }
        .welcome-content {
            display: none;
        }
        .btn-top {
            display: none;
        }
        .side {
            margin-top: -5%;
        }
        .navbar {
            width: fit-content;
            margin: -20px 0 0 -20%;
        }
        .navbar ul li a {
            color: white;
            font-weight: bolder;
        }
    }
    @media (max-width: 400px) {
        .side {
            right: 3%;
            margin-top: -10vw;
        }
    }
</style>