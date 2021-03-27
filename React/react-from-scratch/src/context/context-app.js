import React from "react";
import {ThemeContext, themes} from "./theme-context";
import ThemeTogglerButton from "./theme-toggle-button";

function Toolbar(props) {
  return (
    <ThemeButton onClick={props.changeTheme}>Change Theme</ThemeButton>
  );
}

class ContextApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.ligth,
    };

    this.toggleTheme = () => {
      this.setState(state => ({
        theme: state.theme === themes.dark ? themes.ligth : themes.dark,
      }));
    };
  }

  render() {
    return (
      <Page>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme}/>
        </ThemeContext.Provider>
        <Section>
          <ThemeButton/>
        </Section>
      </Page>
    )
  }
}