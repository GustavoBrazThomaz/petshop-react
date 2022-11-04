import { createGlobalStyle } from "styled-components";

const backgroundAuth = localStorage.getItem("token")
let background: string | null = `body{
    background: #c4c4c4 url('https://cdn.discordapp.com/attachments/992088142855274596/1037088303641538577/testeDale.jpg') repeat 0 0;
}`
if(!backgroundAuth)background = null

export default createGlobalStyle`
    ${background}
    .app-navbar{
        background: #01023b;
    }
    .card-navbar{
        background: #01023b;
    }
    .login-link{
        color: black;
    }

    .button-primary{
        background: #01023b;
    }

    .text-title{
        color: #3d3d3d;
    }
    .text-content{
        color: #242424;
    }

    .pet-navbar-card{
        display: flex;
        justify-content: flex-end;
        background: rgb(65 86 120);
    }
    .pet-img{
        display: flex;
        justify-content: center;
        background: rgb(215 226 238);
    }
`