import React from 'react'; 

const Search = (props) => {

    return (
        <nav className="navbar navbar-light bg-light justify-content-center">
          <form className="form-inline" onSubmit={props.handleFormSubmit}>
            <input
              className="form-control"
              value={props.value}
              name="search"
              onChange={props.handleInputChange}
              type="search"
              placeholder="Searchbar"
            />
          </form>
        </nav>
        
      );

};




export default Search; 