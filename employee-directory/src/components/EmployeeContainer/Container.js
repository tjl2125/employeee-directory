import React, {Component} from 'react'; 
import Search from '../Search/Search';
import List from '../List/List';
import API from '../../utils/API'; 

class Container extends Component {
    state = {
        search: "",
        employees: [],
        filteredEmployees: [],
        sortDirections: this.initialSortDirections,
    };


    
}
