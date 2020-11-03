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
    console.log('hi')
    console.log(bookmark)
    this.setState({
      bookmarks: [...this.state.bookmarks,bookmark],
      showAddForm:false

    });
  }

  // handleSubmit(submit){
  //   this.setState({

  //   })
  // }



  componentDidMount() {
    const url = 'https://tf-ed-bookmarks-api.herokuapp.com/v3/bookmarks';
    const options = {
      method: 'GET',
      headers: {
        "Authorization": "Bearer a20c092a-65d0-41e6-87f3-2bcb105b85c8",
        "Content-Type": "application/json"
      }
    };

    console.log(url,options)

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
