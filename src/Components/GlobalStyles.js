import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Lato:400,700&display=swap');
    ${reset};
    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        box-sizing:border-box;
    }
    body{
        padding-top:111px;
        font-family: 'Lato',-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size:1.4em;
    }
    header{
        z-index:100;
    }
`;

export default globalStyles;
