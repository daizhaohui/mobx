import React, { Fragment } from "react";
import { Provider, inject, observer } from "mobx-react";
import { store } from "./store";
import { ResultsList, SearchTextField } from "./components";
import { Grid, Paper, Typography } from "@material-ui/core";

const Header = () => {
  return (
    <Typography
      variant="title"
      color="inherit"
      style={{ marginBottom: 20, textAlign: "center" }}
    >
      Book Store
    </Typography>
  );
};

@inject("store")
@observer
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { store } = this.props;
    return (
      <Fragment>
        <Header />
        <Grid container>
          <Grid item xs={12}>
            <Paper elevation={2} style={{ padding: "1rem" }}>
              <SearchTextField
                onChange={this.updateSearchText}
                onEnter={store.search}
              />
            </Paper>
          </Grid>
        </Grid>
        <ResultsList style={{ marginTop: "2rem" }} />
      </Fragment>
    );
  }

  updateSearchText = event => {
    this.props.store.setTerm(event.target.value);
  };
}

export default class AppContainer extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
