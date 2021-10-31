import logo from './logo.svg';
import './App.css';
import React from 'react'
import allchars from './chars.js';

class App extends React.Component {
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
    this.setState({ value: event.target.value });
  }


  genName() {
    const index = Number(this.state.value);
    const name1 = this.allchars[index % this.allchars.length];
    const name2 = this.allchars[index * 2 % this.allchars.length];
    const name3 = this.allchars[index * 3 % this.allchars.length];
    const name4 = this.allchars[index * 4 % this.allchars.length];
    this.setState({ name: "Your name is " + name1 + name2 + " " + name3 + name4 });
  }

  render() {
    return (
      <div className="App">
        <header className="Aipp-header">
          <h1>氏名生成器</h1>
          <h4>今の氏名って非効率だと思いませんか？<br/>
          多くのエンジニアが珍しい名前を扱うシステムの構築に苦労していることだと思います。<br/>
          そこで日本国民に一意に割り振られるマイナンバーから氏名を生成するサービスを作りました。<br/>
          常用漢字2136字から、2文字の名字と2文字の名前を生成します。<br/><br/>
          姓名分割は2文字で区切れば終わりですし、旧字体の扱いに悩むこともありません。<br/>
          将来的には日常生活に登場する2文字の単語を確実に出ないようにすることで、<br/>
          氏名抽出システムの精度向上にも貢献する予定です</h4>
        </header>
        <div>
          <p className="left"><h2>マイナンバーを入力してください</h2></p>
          <textarea value={this.state.value} onChange={this.handleChange} cols={20} rows={1} className="Input" />
        </div>
        <br />
        <button onClick={this.genName} className="Button">
          生成する
        </button>
        <p className="output">
          <h1>{this.state.name}</h1>
        </p>
      </div>
    );
  }
}

export default App;
