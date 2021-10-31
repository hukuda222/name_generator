import logo from './logo.svg';
import './App.css';
import React from 'react'
import allchars from './chars.js';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      name: ''
    };
    this.allchars = allchars.split("\n")
    this.handleChange = this.handleChange.bind(this);    
    this.genName = this.genName.bind(this);    
  }
 
  handleChange(event) {
    this.setState({value: event.target.value});
  }  
  

  genName() {
    const index = Number(this.state.value);
    const name1 = this.allchars[index%this.allchars.length];
    const name2 = this.allchars[index*2%this.allchars.length];
    const name3 = this.allchars[index*3%this.allchars.length];
    const name4 = this.allchars[index*4%this.allchars.length];
    this.setState({name: "Your name is "+name1+name2+" "+name3+name4});
  }  
   
   render(){
   return (
    <div className="App">
      <header className="Aipp-header">
         <h1>Perfect Name Generator</h1>
	 <img src={logo} className="App-logo" alt="logo" />
      </header>
        <div>
	<p className="left"><h2>Please input my-number</h2></p> 
	<textarea value={this.state.value} onChange={this.handleChange}  cols={20} rows={1} className="Input" />
	</div>
	  <br/>
	<button onClick={this.genName} className="Button">
            Generate
        </button>
         <p className="output"> 
	 <h1>{this.state.name}</h1>
	 </p>
      </div>
  );
  }
}

export default App;
