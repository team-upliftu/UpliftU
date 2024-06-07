import { useState } from 'react';
import { BoxBar } from './BoxBar';

export const AddBoxBar = () => {
    const [boxes, setBoxes] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');

    const handleAddBox = () => {
        setBoxes([...boxes, inputValue]);
        setInputValue('');
    };

    return (
        <>
            <div style={{ marginTop: '22.5vw', padding: '3.5vw' }}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    style={{
                        fontSize: '15px',
                        padding: '2vw 2vw',
                        marginRight: '2vw',
                        backgroundColor: '#ddd',
                        border: 'none',
                        borderRadius: '0.5vw'
                    }}
                />
                <button
                    onClick={handleAddBox}
                    style={{
                        fontSize: '15px',
                        padding: '2vw 4vw',
                        backgroundColor: '#28a745',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '0.5vw'
                    }}
                >
                    add
                </button>
            </div>
            <div className="context">
                {boxes.map((box, index) => (
                    <BoxBar key={index} text={box} />
                ))}
            </div>
        </>
    );
};
