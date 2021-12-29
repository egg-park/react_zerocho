const React = require('react');
const {useState, useRef} = React;

WordRealy = () => {
    const [word, setWord] = useState('어규이');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
  
    const inputRef = useRef(null);

    const onSubmit = (e) => {
        e.preventDefault();
        if (word[word.length -1 ] === value[0]) {
            setResult('딩동댕');
            setWord(value);
            setValue('');
            
            inputRef.current.focus();
        } else {
            setResult('땡');
            setValue('');

            inputRef.current.focus();
        }
    };

    const onChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmit}>
                <label htmlFor="wordInput">글자를 입력하세요.</label>
                <input ref={inputRef} onChange={onChange} value={value}/>
                <button className="enter">입력</button>
            </form>
            <div>{result}</div>
        </>
    );
}

// 바깥에서 사용할 수 있도록 설정
module.exports = WordRealy;