import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    .app-navbar{
        display: flex;
        justify-content: space-between;
    }
    .button-navbar-container{
        display: flex;
    }
    .button-switch-theme{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 1rem;
    }
`