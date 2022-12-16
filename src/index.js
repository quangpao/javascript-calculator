import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'

class Calculator extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      input: '0',
      isResult: false,
      hasDecimal: false,
    }

    this.handleClickButton = this.handleClickButton.bind(this)
    this.handleResult = this.handleResult.bind(this)
    this.handleOperator = this.handleOperator.bind(this)

  }

  handleResult = (e) => {

    let result
    try {
      var expression = this.state.input
      var copy = expression

      expression = expression.replace(/[0-9]+/g, "#").replace(/[\(|\|\.)]/g, "");

      var numbers = copy.split(/[^0-9\.]+/);

      var operators = expression.split("#").filter(function (n) { return n });
      for (var i = 0; i < operators.length; i++) {
        if (operators[i].length === 2 && operators[i][1] === '-') {
          break
        }
        if (operators[i].length >= 2) {
          operators[i] = operators[i][operators[i].length - 1]
        }
      }

      var resultArr = [];
      for (i = 0; i < numbers.length; i++) {
        resultArr.push(numbers[i]);
        if (i < operators.length) resultArr.push(operators[i]);
      }


      result = resultArr.join('')
      result = eval(result)
    } catch (error) {
      result = 'Error'
    }

    this.setState({
      input: result,
      isResult: true,
      hasDecimal: false,
    })
  }


  handleClickButton = (e) => {
    const targetId = e.target.id

    if (targetId === 'clear') {
      this.setState({
        input: '0',
        isResult: false,
        hasDecimal: false,
      })
      return;
    }

    if (this.state.input === '0' || this.state.isResult) {
      this.setState({
        input: e.target.innerHTML,
        isResult: false,
      })
      return
    }

    if (targetId === 'decimal') {
      if (!this.state.hasDecimal) {
        this.setState({
          input: this.state.input + e.target.innerHTML,
          hasDecimal: true,
        })
      }
      return
    }

    this.setState({
      input: this.state.input + e.target.innerHTML,
    })

  }

  handleOperator = (e) => {
    const targetId = e.target.id
    if (targetId === 'add' || targetId === 'subtract' || targetId === 'multiply' || targetId === 'divide') {
      this.setState({
        hasDecimal: false,
      })
    }

    this.setState({
      input: this.state.input + e.target.innerHTML,
      isResult: false,
    })
  }

  render() {

    return (
      <div className='container'>
        <div className='calculator-box'>

          <div className='display-box' id='display'>
            {this.state.input}
          </div>

          <div className='input-box'>
            <div className='clear-box'>
              <button id='clear' className='up' onClick={this.handleClickButton}>AC</button>
            </div>
            <div className='row-content'>
              <div className='numbers'>
                <button id='seven' className='raise' onClick={this.handleClickButton}>7</button>
                <button id='eight' className='raise' onClick={this.handleClickButton}>8</button>
                <button id='nine' className='raise' onClick={this.handleClickButton}>9</button>
                <button id='four' className='raise' onClick={this.handleClickButton}>4</button>
                <button id='five' className='raise' onClick={this.handleClickButton}>5</button>
                <button id='six' className='raise' onClick={this.handleClickButton}>6</button>
                <button id='one' className='raise' onClick={this.handleClickButton}>1</button>
                <button id='two' className='raise' onClick={this.handleClickButton}>2</button>
                <button id='three' className='raise' onClick={this.handleClickButton}>3</button>
                <button id='zero' className='raise' onClick={this.handleClickButton}>0</button>
                <button id='decimal' className='pulse' onClick={this.handleClickButton}>.</button>
                <button id='equals' className='pulse' onClick={this.handleResult}>=</button>
              </div>
              <div className='operators'>
                <button id='add' className='pulse' onClick={this.handleOperator}>+</button>
                <button id='subtract' className='pulse' onClick={this.handleOperator}>-</button>
                <button id='multiply' className='pulse' onClick={this.handleOperator}>*</button>
                <button id='divide' className='pulse' onClick={this.handleOperator}>/</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    )

  }

}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>
);

reportWebVitals();
