import { createGlobalStyle } from "styled-components";

const backgroundAuth = localStorage.getItem("token")
let background: string | null = `body{
    background: rgb(68,68,68) url('https://media.discordapp.net/attachments/992088142855274596/1037831849067696168/6b87ce53-030e-4075-9c10-d39064057f16.png?width=557&height=559') repeat 0 0;

}`
if(!backgroundAuth)background = null

export default createGlobalStyle`
    ${background}
    .card-navbar{
        background: #363534;
    }
    .login-link{
        color: #fff;
    }
    .text-title{
        color: #8a8a8a;
    }
    .text-content{
        color: #fff;
    }
    .pet-img{
        display: flex;
        justify-content: center;
        background: #ccc;
    }
    .pet-navbar-card{
        display: flex;
        justify-content: flex-end;
    }
`