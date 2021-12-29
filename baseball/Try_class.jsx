import React, {PureComponent} from 'react';

class Try_class extends PureComponent {
    render () {
        const { tryInfo } = this.props;
        return (
            <li>
                <div>{tryInfo.try }</div>
                <div>{tryInfo.result}</div>
            </li>
        );
    }
}

export default Try_class; 