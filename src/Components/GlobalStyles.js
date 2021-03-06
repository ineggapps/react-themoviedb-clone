import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Days+One&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Fredoka+One&display=swap');
    ${reset};
    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        box-sizing:border-box;
    }
    body{
        padding:180px 0 50px;
        font-family: 'Lato',-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size:1.4em;
        overflow-x:hidden;
    }
    header{
        z-index:100;
    }
`;

export default globalStyles;
