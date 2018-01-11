import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
var adder = [];
var cryptoHolder = [];
var keyHold = [];

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      cryptos: [],
      amount: '',
      finalInput: []
    };
  }


  componentDidMount(){
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC,XRP,NEO,ADA,XVG,TRX,XLM&tsyms=CAD')
      .then(res => {
        const cryptos = res.data;
        console.log(cryptos);
        this.setState({cryptos:cryptos});
      })
  }

  findTotal(){
    var total = 0;
    for (var i=0; i < adder.length; i++){
      total += adder[i] * cryptoHolder[i].CAD;
      console.log(adder[i]);
      console.log(cryptoHolder[i].CAD);

    }
    console.log(total);

  }
  handleSubmit(e){
    e.preventDefault();
    this.addCryptoValue();
    console.log(adder);
    console.log(cryptoHolder);
    this.findTotal();
  }

  addCryptoValue(){
    for (var i = 0; i < keyHold.length; i++){
      cryptoHolder.push(this.state.cryptos[keyHold[i]]);
    }
  }

  onInput(key, e){
    e.preventDefault();
    var number = e.target.value;
    console.log(e.target.value);
    //this.setState({amount : number})
    adder.push(number);
    keyHold.push(key);
  }

  eachInput (text, i){
    return(
      <Number 
    )
  }
  render() {
    return (
      <div className="App">
        <h1 align="center"> Crypto Calculator </h1>

        {Object.keys(this.state.cryptos).map((key) => (
          <div id="crypto-container">
            <span className="left">{key}</span>
            <input className="center-block" type="number" required ref="newamount" onChange = {this.onInput.bind(this, key)} value={this.state.number}/>
            <span className="right"> {this.state.cryptos[key].CAD} </span>
            {this.state.finalInput.map(this.eachInput)}
          </div>
        ))}
        
        <button className="center-button" type="sumbit" onClick={this.handleSubmit.bind(this)}>CALCULATE</button>
      </div>
    );
  }
}

export default App;
