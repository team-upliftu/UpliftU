import React from 'react';

export const BoxBar = ({ text }: { text: string }) => {
    return (
        <div
            style={{
                margin: 'auto',
                width: '85vw',
                paddingTop: '5vw',
                paddingBottom: '5vw',
                paddingLeft: '5vw',
                borderRadius: '1vw',
                backgroundColor: '#ddd',
                fontWeight: 'bold',
                marginTop: '2vw'
            }}
        >
            {text}
        </div>
    );
};
