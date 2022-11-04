import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

body{
	margin:0;
	padding:0;
	font-family:"arial",heletica,sans-serif;
	font-size:12px;
    background: #2980b9 url('https://cdn.discordapp.com/attachments/992088142855274596/1037088303641538577/testeDale.jpg') repeat 0 0;
	animation: 180s linear 0s normal none infinite animate;
}
 
@keyframes animate {
	from {background-position:0 0;}
	to {background-position: 0 6000px;}
}

.login-card-container{
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	padding: 1rem;
}

.login-container{
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5rem;
}

.login-avatar{
	background: #327da8;
	margin-top: 1rem;
	color: #fff;
}

.login-input{
	margin-top: 1rem;
}

.login-card-content{
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.login-card-action{
	padding: 1rem 2rem 2rem 2rem;
	display: flex;
	justify-content: center;
	align-items: center;
}

.login-button{
	width: 150px;
}
`