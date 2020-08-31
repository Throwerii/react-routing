import React, { Component } from 'react';
import jeopardyService from "../assets/jeopardyservice/jeopardyService";

class Jeopardy extends Component {
  
  constructor(props){
    super(props);
    this.client = new jeopardyService();
    this.state = {
        submitted: false,
      data: {},
      score: 0,
      displayAnswer:'',
      formData: {
        answer: '',
      },
    }
  }
  getNewDisplay=(props)=>{
      return <strong>Welcome to Jeopardy</strong>


  }

  getNewQuestion() {
    return this.client.getQuestion().then(result => {
      this.setState({
        data: result.data[0]
      })
    })
  }
  handleChange = (event) => {
    const formData = { ...this.state.formData };
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.getScore()
    this.getNewQuestion()
    this.setState({
        displayAnswer:this.state.data.answer,
        formData:{
            answer:''
        },
    })
  }
  resetForm = (event) => {
    this.setState({
      submitted: false,
      formData: {
        answer: '',
        
      }
    });
  }


getScore(){
    let currentScore=this.state.score
    let newScore=0
    if(this.state.formData.answer===this.state.data.answer){
        newScore=currentScore+this.state.data.value

    }
    else{
        newScore=currentScore-this.state.data.value
    }
    this.setState({score:newScore})
}
  
  componentDidMount() {
    this.getNewQuestion();
  }
 
  render() {
      let category="loading"
      if(this.state.data.category ){
          category=this.state.data.category.title
      }

    return (
        <div>
        <div className="Answer">
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="">Answer</label>
            <input
              type="text"
              name="answer"
              value={this.state.formData.answer}
              onChange={this.handleChange}
              />
          </div>
          
          <button>Submit Answer</button>
        </form>
        <div>
          {this.state.displayAnswer}
          <br />
        </div>
              </div>
              <strong>Points:</strong>{this.state.score}<br/>
                <strong>Question:</strong>{this.state.data.question}<br/>
                <strong>Value:</strong>{this.state.data.value}<br/>
                <strong>Catergory:</strong>{category}<br/>
              </div>
    );
  }
}
export default Jeopardy;