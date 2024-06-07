import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Menu } from './components/Menu';
import { AddBoxBar } from './components/AddBoxBar';
import { Item1 } from './components/Item1';

export const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <Router>
            <div id="top"
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
                    &#9776;
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
            <Routes>
                <Route path="/" element={<AddBoxBar />} />
                <Route path="/item1" element={<Item1 />} />
            </Routes>
        </Router>
    );
};
