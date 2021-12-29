import React, { PureComponent } from 'react';

class RenderTest extends PureComponent {
    state = {
        counter: 0,
        string: 'hello',
        number: 1,
        boolean: true,
        object:{},
        array:[],
    };

    // state가 변하지 않으면 랜더링되지 않도록 처리
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if (this.state.counter !== nextState.counter) {
    //         return true;
    //     }
    //     return false;
    // }

    onClick = () => {
        this.setState({
            array: [ ...this.state.array, 1]
        });
    };

    render() {
        return(
            <div>
                <button onClick={this.onClick}>클릭</button>
            </div>
        );
    }
}

export default RenderTest;