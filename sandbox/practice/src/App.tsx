import { useState } from 'react';
import { Menu } from './components/Menu';
import { BoxBar } from './components/BoxBar';

export const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [boxes, setBoxes] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleAddBox = () => {
        setBoxes([...boxes, inputValue]);
        setInputValue('');
    };

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'absolute',
                    top: '5vw',
                    left: '5vw',
                }}
            >
                <button
                    style={{
                        width: '12.5vw',
                        height: '12.5vw',
                        borderRadius: '50%',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        zIndex: 1000,
                    }}
                    onClick={toggleMenu}
                >
                    ☰
                </button>
                <span
                    style={{
                        marginLeft: '5vw',
                        fontSize: '20px',
                        color: '#000',
                        fontWeight: 'bold'
                    }}
                >
                    Test Page
                </span>
            </div>
            {isMenuOpen && <Menu />}
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
