import React, { Component } from 'react';
import './App.css';

import AddBookmark from './addBookmark/addBookmark';
import BookmarkApp from './bookmarkApp/bookmarkApp';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
      showAddForm: false
    };
  }

  setShowAddForm(show) {
    this.setState({
      showAddForm: show
    });
  }

  addBookmark(bookmark) {
    this.setState({
      bookmarks: [...this.state.bookmarks,bookmark],
      showAddForm:false

    });
  }

  // handleSubmit(submit){
  //   this.setState({

  //   })
  // }

  handleSubmit(e) {
    e.preventDefault();
    const {title, url, description, rating} = this.state;
    const bookmark = {title, url, description, rating};
    // const url ='https://tf-ed-bookmarks-api.herokuapp.com/v3/bookmarks';
    const options = {
      method: 'POST',
      body: JSON.stringify(bookmark),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer $2a$10$7FyrEl8qOKfiD3h/vBZIQ.JXWMikW6aZUlKG/xDi7GeHqGqouMKxm"
      }
    };

    fetch(url, options)
      .then(res => {
        if(!res.ok) {
          throw new Error('Something went wrong, please try again later');
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          title: "",
          url: "",
          description: "",
          rating: 1
        });
        this.props.handleAdd(bookmark);
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }

  componentDidMount() {
    const url = 'https://tf-ed-bookmarks-api.herokuapp.com/v3/bookmarks';
    const options = {
      method: 'GET',
      headers: {
        "Authorization": "Bearer $2a$10$7FyrEl8qOKfiD3h/vBZIQ.JXWMikW6aZUlKG/xDi7GeHqGqouMKxm",
        "Content-Type": "application/json"
      }
    };

    fetch(url, options)
      .then(res => {
        if(!res.ok) {
          throw new Error('Something went wrong, please try again later.');
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          bookmarks: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });

  }

  render() {
    const page = this.state.showAddForm
          ? <AddBookmark 
              showForm={show => this.setShowAddForm(show)}
              handleAdd={bookmark => this.addBookmark(bookmark)}
            />
          : <BookmarkApp 
              showForm={show => this.setShowAddForm(show)}  
              bookmarks={this.state.bookmarks}/>; 

    return (
      <div className="App">
        { page }
      </div>
    );
  }
}

export default App;
