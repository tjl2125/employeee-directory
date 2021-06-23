import React from 'react'; 
import "./style.css"; 

const Header = () => {
    return (
        <header>
            <h1 className = "text-center">Employee Directory</h1>
            <p className = "text-center">Use the search bar to narrow down
            your results.
            </p>
        </header>
    ); 
};

export default Header; 