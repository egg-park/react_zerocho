import React, { useState, useRef } from 'react';

const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요.');
    const [result, setResult] = useState([]);
    const timeout = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

    const onClickScreen = () => {
        if (state === 'waiting') {
            setState('ready');
            setMessage('초록색이 되면 클릭하세요.');
            timeout.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭');
                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000) + 2000); //2초~3초 랜덤
        } else if(state === 'ready') {
            clearTimeout(timeout.current);
            setState('waiting');
            setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
        } else if (state === 'now') { // 반응속도 체크
            endTime.current = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요');
            setResult((prevState) => {
                return [...prevState, endTime.current - startTime.current];
            });
        }
    };

    const renderAverage = () => {
        return result.length === 0
        ? null
        : <>
            <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
            <button onClick={onReset}>Reset</button>
          </>
    };

    const onReset = () => {
        setResult([]);
    };

    return (
        <>
            <div 
                id="screen"
                className={state}
                onClick={onClickScreen}
                >
                    {message}
            </div>
            {/* 함수 안에서 if문 사용하기. 즉시실행 함수로 써야함 (jsx에서는 if문을 사용할 수 없음) */}
            {/* {
                (() => {
                    if (result.length === 0) {
                        return null;
                    } else {
                        return  result.length === 0
                        ? null
                        : <>
                            <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
                            <button onClick={onReset}>Reset</button>
                          </>
                    }
                })()
            } */}
            {renderAverage()}
        </>
    );
}

export default ResponseCheck;