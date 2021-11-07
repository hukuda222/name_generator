import logo from './logo2.svg';
import './App.css';
import React from 'react'
import allChars from './chars.js';
import allJukugos from './jukugos.js';
import sha512 from 'js-sha512';
import Select from 'react-select'
import 'semantic-ui-css/semantic.min.css'
import { Button, Icon } from 'semantic-ui-react'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputNumber: '',
      name: '',
      type: 'none',
      valid: false,
      textarea: {
        rows: 1,
        cols: 20,
        limit: 100,
      }
    };
    this.options = [
      { value: 'raw', label: '生の値' },
      { value: 'sha512', label: 'sha512' },
    ]

    this.allChars = allChars.split("\n")
    this.allJukugos = new Set(allJukugos.split("\n"));
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.tweet = this.tweet.bind(this);
    this.genName = this.genName.bind(this);
    this.regex_raw = /^[0-9]{12}$/g;
    this.regex_sha512 = /^[0-9a-f]{128}$/g;
  }

  handleInputChange(event) {
    this.setState({ inputNumber: event.target.value });
  }

  handleTypeChange(event) {
    this.setState({ type: event.value });
    this.setState({ inputNumber: "" });
    this.setState({ name: "" });
    if (event.value === "raw") {
      this.setState({
        textarea: {
          rows: 1,
          cols: 15,
          limit: 12,
        }
      });
    } else {
      this.setState({
        textarea: {
          rows: 3,
          cols: 50,
          limit: 128,
        }
      });
    }
  }


  genName() {
    if (this.state.type === "raw") {
      const found = this.state.inputNumber.match(this.regex_raw);
      if (found === null || found.length !== 1) {
        this.setState({ valid: false });
        this.setState({ name: "12桁の半角数字を入力してください" });
        return;
      }
    } else if (this.state.type === "sha512") {
      const found = this.state.inputNumber.match(this.regex_sha512);
      if (found === null || found.length !== 1) {
        this.setState({ valid: false });
        this.setState({ name: "sha512で変換した値を入力してください" });
        return;
      }
    } else {
      this.setState({ valid: false });
      this.setState({ name: "入力形式を選択してください" });
      return;
    }

    const index = parseInt(this.state.type === "raw" ? sha512(this.state.inputNumber, 10) : this.state.inputNumber, 16) % this.allChars.length;

    const name1 = this.allChars[index % this.allChars.length];
    let name2 = this.allChars[(index * 2) % this.allChars.length];
    let count = 0;
    while (this.allJukugos.has(name1 + name2) || name1 === name2) {
      name2 = this.allChars[(index * 2 + count) % this.allChars.length];
      count += 1;
    }
    let name3 = this.allChars[(index * 3) % this.allChars.length];
    while (this.allJukugos.has(name2 + name3) || name1 === name3 || name2 === name3) {
      name3 = this.allChars[(index * 3 + count) % this.allChars.length];
      count += 1;
    }
    let name4 = this.allChars[(index * 4) % this.allChars.length];
    while (this.allJukugos.has(name3 + name4) || name1 === name4 || name2 === name4 || name3 === name4) {
      name4 = this.allChars[(index * 4 + count) % this.allChars.length];
      count += 1;
    }
    this.setState({ valid: true });
    this.setState({ name: "あなたの名前は、" + name1 + name2 + " " + name3 + name4 });
  }

  tweet() {
    this.setState({ type: "none" });
    this.setState({ inputNumber: "" });
    const result = "新しい名前を生成しよう https://hukuda222.github.io/name_generator/";
    window.location.href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(result);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="title">Perfect Name Generator</p>
        </header>
        <br />
        <p className="abst">今の氏名システムって非効率的だと思いませんか？<br /><br />
          多くのエンジニアが珍しい名前を扱うシステムの構築に苦労していることだと思います。<br />
          そこで日本国民に一意に割り振られるマイナンバーから氏名を生成するサービスを作りました。<br />
          常用漢字2136字から、2文字の名字と2文字の名前を生成します。<br /><br />
          短い名前や長い名前、旧字体の扱いに悩むこともありませんし、姓名分割は2文字で区切れば終わります。<br />
          日常生活に登場する2文字の単語を出さないようにしているため、氏名抽出システムの精度向上にも貢献します。</p>
        <div>
          <br />
          <p className="guide_input">マイナンバーを入力してください</p>
          <Select placeholder="入力形式" options={this.options}
            onChange={this.handleTypeChange} className="select" />
          <br />
          <textarea value={this.state.inputNumber} onChange={this.handleInputChange}
            cols={this.state.textarea.cols} rows={this.state.textarea.rows} maxLength={this.state.textarea.limit}
            className={`${this.state.type === "raw" ? "input_raw" : "input_sha512"}`} />
        </div>
        <div className="button">
          <Button primary onClick={this.genName}>
            生成する
          </Button>
        </div>
        <p className={`${this.state.valid ? "output" : "error"}`}>
          {this.state.name}
        </p>
        <div className={`${this.state.valid ? "tweet_output" : "tweet_error"}`}>
          <Button color='twitter' onClick={this.tweet}>
            <Icon name='twitter' /> ツイートする
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
