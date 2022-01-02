import React, { useState, memo, useRef } from 'react';
import Try from './Try';

function getNumbers() { // 숫자 네 개를 겹치지 않고 랜덤하게 뽑아내는 함수
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for (let i = 0 ; i < 4; i += 1) {
        const num = candidate.splice(Math.floor(Math.random() * (9-i)), 1)[0];
        array.push(num);
    }
    return array;
}

const NumberBaseball = memo(() => {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]);

  const inputRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (value === answer.join('')) {
      setResult('홈런');
      setTries((prevState) => {
        return [...prevState, {try: value, result: '홈런!'}];
      });
      alert('게임을 다시 시작합니다!');
      setValue('');
      setAnswer(getNumbers());
      setTries([]);
      
      inputRef.current.focus();

    } else {
        const answerArray = value.split('').map((v) => parseInt(v));
        let strike = 0;
        let ball = 0;
        if (tries.length >=9 ){
            setResult(`10번 넘게 틀려서 실패 답은 ${answer.join(',')} 였습니다!`);
            alert('게임을 다시 시작합니다!');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
            inputRef.current.focus();
        } else {
            for (let i =0; i<4; i+=1){
                if (answerArray[i] === answer[i]) {
                    strike +=1;
                } else if (answer.includes(answerArray[i])) {
                    ball += 1;
                }
            }
            setValue('');
            setTries((prevState) => {
              return [...prevState, {try : value, result: `${strike} 스트라이크, ${ball} 볼입니다.`}];
            });
            inputRef.current.focus();
        }
    }
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };
  
  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmit}>
          <input ref={inputRef} maxLength={4} value={value} onChange={onChange} />
          <button>입력</button>
      </form>
      <div>시도: {tries.length}</div>
      <ul>
          {/* {(() => {
            const array = [];
            for (let i = 0; i < tries.length; i++) {
              array.push(<Try key={`${i +1}차 시도 :`} tryInfo={v} index={i} />);
            }
            return [];
          })()} */}
          {tries.map((v, i) => {
              return (
                <Try key={`${i +1}차 시도 :`} tryInfo={v} index={i} />
              );
          })}
      </ul>
    </>
  );
});

export default NumberBaseball;