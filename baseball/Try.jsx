import React, {memo, useState} from 'react';

const Try = memo(({tryInfo}) => {
    return (
            <li>
                <div>{tryInfo.try }</div>
                <div>{result}</div>
            </li>
        );
});

export default Try; 