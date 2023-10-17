import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`

* {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
}

body {
    width: 100% vw;
    height: 100% vh;
    display: flex;
    justify-content: center;
    background-color: #1A202C;
    color: #F7FAFC;
}
`;

export default Global;