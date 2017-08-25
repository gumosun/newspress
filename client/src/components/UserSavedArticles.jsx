import React, { Component } from 'react';
import axios from 'axios';
import Forum from './Forum'
import UserArticleSingle from './UserArticleSingle';
class UserSavedArticles extends Component {

    constructor(props) {
    super(props);
    this.state = {
      savedArticlesArray: null,
      dataLoaded: false, 
      fireRedirect: false,
      singleArticle: false,
      currentArticle: null 
    }
     this.deleteSavedArticle = this.deleteSavedArticle.bind(this);
     this.renderSingleArticle= this.renderSingleArticle.bind(this);
    //  this.resetState=this.resetState.bind(this);
}


componentWillMount(){
    console.log("props user ID "+ this.props.userID);
    axios.post('/news/userSavedArticles', {Id:this.props.userID} )
        .then(res => {
            console.log(res.data)
            console.log(res.data.data)
            this.setState({
                 
                    savedArticlesArray: res.data.data,
                       dataLoaded: true,
                })
        }).catch(err =>{console.log(err.response)
    });
}

deleteSavedArticle(articleID) {
      console.log("the articke ID is========= " +articleID);
    axios.post(`/news/deleteArticle`,{
      article_id:articleID
    }) 
      .then(res => {
        console.log(res);
        this.setState({
          fireRedirect: true,
        });
      }).catch(err => {
        console.log(err);
      });
  }

renderSingleArticle(article_object){
    console.log ("bob");
     console.log("the article is for single Art is========= " +  article_object);
     this.setState({
                      singleArticle: true,
                      currentArticle: article_object

                });
    console.log ("after "+this.state.singleArticle);
    
}
/*resetState(){
    
     this.setState({
                      singleArticle: false,
                });
 
     console.log("state set to again========= " +this.state.singleArticle);
    
}*/


renderSavedArticles(){
    if (!this.props.auth)  return <p className="message">Please Login</p>;
    else if (!this.state.dataLoaded) return <p className="message">No Articles Saved</p>;
    else if (this.state.dataLoaded && this.props.auth) {
      if (this.state.singleArticle){
         //this.resetState(); 
          return <UserArticleSingle userID={this.props.userID} username={this.props.userName} article={this.state.currentArticle}/>
    
      } else { 
      return this.state.savedArticlesArray.map(article => {
          console.log ("in map "+ article);
        return (
         <div>   
            <div className="userArticle">Viewing User Saved Article
                 <button className="delete" type="button" onClick={()=>{this.deleteSavedArticle(article.id)}}>Delete Source</button>
                 <button className="singleView" type="button" onClick={()=>{this.renderSingleArticle(article)}}>View More</button>

            </div>   
                <h1>{article.title}</h1>
                <p>{article.description}</p>
                <img src={article.image_url}/>
                <Forum username={this.props.userName} article_title={article.title}/>
          </div>
        );
      });
    }}else return <p className="message">Loading Data</p>
}


    render(){
        return(
              <div>{this.renderSavedArticles()}</div>
        )
    }
}





export default UserSavedArticles;