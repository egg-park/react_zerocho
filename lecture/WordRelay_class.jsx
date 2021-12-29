const React = require('react');
const ReactDom = require('react-dom');

const { Component } = React;

class WordRealy extends Component {
    state = {
        word: '어규이12',
        value: '',
        result: '',
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.word[this.state.word.length -1 ] === this.state.value[0]) {
            this.setState({
                result: '딩동댕',
                word: this.state.value,
                value: ''
            });
            this.input.focus();
        } else {
            this.setState({
                result: '땡',
                value: ''
            })
        }
    };

    onChange = (e) => {
        this.setState({ value: e.target.value });
    };

    input;
    onRefInput = (c) => {
        this.input = c;
    }

    render () {
        return (
            <>
                <div>{this.state.word}</div>
                <form onSubmit={this.onSubmit}>
                    <input ref={this.onRefInput} onChange={this.onChange} value={this.state.value}/>
                    <button>입력</button>
                </form>
                <div>{this.state.result}</div>
            </>
        );
    }
}

// 바깥에서 사용할 수 있도록 설정
module.exports = WordRealy;