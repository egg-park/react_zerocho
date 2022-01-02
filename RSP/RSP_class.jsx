import React, { Component } from 'react';

// 클래스의 경우 : constructor -> render -> render의 ref -> componentDidMount
// -> (setState/props 바뀔때 -> shouldComponentUpdate(true) -> render -> componentDidUpdate)
// 부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸

const rspCoords = {
    바위:'0',
    가위:'-142px',
    보:'-284px'
};

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
}

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
        return v[1] === imgCoord;
     })[0];
};

class RSP extends Component {
    state = {
        result: '',
        score: 0,
        imgCoord: rspCoords.바위,
    };

    interval;

    // 컴포넌트가 첫 렌더링 된 후 (리렌더링할 땐 실행되지 않음) -> 비동기 요청을 많이 함
    componentDidMount() {
        this.interval = setInterval(this.changeHand, 100);
    }

    // 리렌더링 후
    componentDidUpdate() {

    }

    // 컴포넌트가 제거되기 직전 ( componentDidMount에서 사용됐던걸 제거하는 용도) -> 비동기 요청을 정리 많이함
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    changeHand = () => {
        const {imgCoord} = this.state;
        if (imgCoord === rspCoords.바위) {
            this.setState({
                imgCoord: rspCoords.가위
            });
        } else if (imgCoord === rspCoords.가위) {
            this.setState({
                imgCoord: rspCoords.보
            });
        } else if (imgCoord === rspCoords.보) {
            this.setState({
                imgCoord: rspCoords.바위
            });
        }
    }

    // 고차함수 사용
    onClickBtn = (choice) => () => {
        const {imgCoord} = this.state;
        // 인터벌을 멈추고
        clearInterval(this.interval);
        // 점수계산
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
            this.setState({
                result: '비겼습니다!'
            });
        } else if ([-1, 2].includes(diff)) {
            this.setState((prevState) => {
                return {
                    result: '이겼습니다!',
                    score: prevState.score + 1,

                }
            })
        } else {
            this.setState((prevState) => {
                return {
                    result: '졌습니다!',
                    score: prevState.score -1,
                }
            });    
        }
        // 인터벌 시작
        setTimeout(() => {
            this.interval = setInterval(this.changeHand, 100);    
        }, 2000);
    }

    render() {
        const {result, score, imgCoord} = this.state;
        return (
            <>
                <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
                <div>
                <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
           </>
        );
    }
}

export default RSP;