import Router from "./Router";
import { useState } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./thems";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  line-height: 1.2;
}
a {
  text-decoration:none;
  color:inherit;
}
`;

const ToggleBox = styled.div`
  position: relative;
  cursor: pointer;
  float: right;
  margin: 10px 15px 0px 0px;
  .toggle-container {
    width: 60px;
    height: 34px;
    border-radius: 30px;
    background-color: #ccc;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    font-size: 22px;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    &.toggle--checked {
      background-color: #2f3640;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }
  }
  .toggle-circle {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    border-radius: 50%;
    background-color: #ffffff;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    &.toggle--checked {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
  }
`;

function App() {
  const [theme, setTheme] = useState("dark");
  const handleToggle = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <>
        <GlobalStyle />
        <ToggleBox onClick={handleToggle}>
          <div
            className={`toggle-container ${
              theme === "light" ? "toggle--checked" : ""
            }`}
          >
            <div>🌛</div>
            <div>🌞</div>
          </div>
          <div
            className={`toggle-circle ${
              theme === "light" ? "toggle--checked" : ""
            }`}
          />
        </ToggleBox>
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </>
    </ThemeProvider>
  );
}

export default App;
