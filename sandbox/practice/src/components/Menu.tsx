import { Link } from 'react-router-dom';

export const Menu = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div
            style={{
                position: 'absolute',
                top: '22.5vw',
                left: '2.5vw',
                width: '50vw',
                backgroundColor: '#eee',
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                zIndex: 999,
            }}
        >
            <ul style={{ listStyle: 'none', paddingLeft: '5vw', fontWeight: "bold" }}>
                <li>
                <Link 
                        to="/" 
                        style={{ 
                            textDecoration: 'none', 
                            color: 'inherit' 
                        }}
                    >
                        Top
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/item1" 
                        style={{ 
                            textDecoration: 'none', 
                            color: 'inherit' 
                        }}
                    >
                        Item 1
                    </Link>
                </li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        </div>
    );
};
