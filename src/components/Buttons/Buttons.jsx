import React from 'react';

const Buttons = ({ children }) => {
    return (
        <div className="text-center">
            <button className="btn btn-accent">{children}</button>
        </div>
    );
};

export default Buttons;