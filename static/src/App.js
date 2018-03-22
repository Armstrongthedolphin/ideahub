import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';

class App extends Component {
  render() {
    //const{user,tweet_amount,file_name,keyword} = this.state;
    return (
    <MuiThemeProvider>
      <div className="App">
        <AppBar
          title="IDEAHub"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <form onSubmit={this.handleSubmit.bind(this)}>
          <TextField hintText="Username" floatingLabelText="Username"
                type="text" id="user"
                onChange={this.handleChange.bind(this)}/><br/>
          <TextField hintText="Tweets amount" floatingLabelText="Tweets amount"
                type="text" id="tweet_amount"
                onChange={this.handleChange.bind(this)}/><br/>
          <TextField hintText="CSV file name" floatingLabelText="CSV file name"
                type="text" id="filename"
                onChange={this.handleChange.bind(this)}/><br/>
          <TextField hintText="Keyword" floatingLabelText="Keyword"
                type="text" id="keyword"
                onChange={this.handleChange.bind(this)}/><br/>
          <DatePicker hintText="Start Date" floatingLabelText="Start Date"
                id="start_date" openToYearSelection={true}
                onChange={this.handleStartDateChange.bind(this)}/>
          <DatePicker hintText="End Date" floatingLabelText="End Date"
                id="end_date" openToYearSelection={true}
                onChange={this.handleEndDateChange.bind(this)}/>
          <RaisedButton label="Submit" type="submit"/>
        </form>
      </div>
    </MuiThemeProvider>
    );
  }
  
  handleStartDateChange(e,date){
    this.setState({'start_date': date});
  }

  handleEndDateChange(e,date){
    this.setState({'end_date': date});
  }

  handleChange(e,index,value){
    var name=e.target.id
    this.setState({[e.target.id]: index});
  }

  //for username search
  handleSubmit(e){
    e.preventDefault();
    console.log(this.state.user);
    fetch('http://127.0.0.1:5000/api/byUserName', {
      method: 'POST',
      headers: new Headers(
         {"Content-Type": "application/json"}
      ),
      body: JSON.stringify({user:this.state.user}),
    }).then(function (result) {
    console.log(result.user);
    });
  }

  //for keyword search
  handleSubmit(e){
    e.preventDefault();
    console.log(this.state.keyword);
    console.log(this.state);
    fetch('http://127.0.0.1:5000/api/byKeyword', {
      method: 'POST',
      headers: new Headers(
         {"Content-Type": "application/json"}
      ),
      body: JSON.stringify({keyword: this.state.keyword, tweet_amount: this.state.tweet_amount}),
    }).then(function (result) {
    console.log(result.keyword);
    });
  }
}

export default App;
