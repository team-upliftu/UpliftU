import React, { useState } from 'react';

export const Button1 = () => {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
    };

    return (
        <div style={{ paddingLeft: '3.5vw', paddingTop: '15vw' }}>
            <button onClick={handleClick}>
                Click me!
            </button>
            <p>You clicked {count} times</p>
        </div>
    );
};

