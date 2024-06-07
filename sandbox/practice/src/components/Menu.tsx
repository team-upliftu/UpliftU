export const Menu = () => {
    return (
        <div
            style={{
                position: 'absolute',
                top: '50px',
                left: '10px',
                width: '200px',
                backgroundColor: '#fff',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                zIndex: 999,
            }}
        >
            <ul style={{ listStyle: 'none', padding: '10px' }}>
                <li>Menu Item 1</li>
                <li>Menu Item 2</li>
                <li>Menu Item 3</li>
            </ul>
        </div>
    );
};
