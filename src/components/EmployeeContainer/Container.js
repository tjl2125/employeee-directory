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
    get initialSortDirections() {
        return {
          name: "",
          phone: "",
          email: "",
          dob: "",
        };
      }
    
      componentDidMount() {
        API.getEmployees()
          .then((res) =>
            this.setState({
              employees: res.data.results,
              filteredEmployees: res.data.results,
            })
          )
          .catch((err) => console.log(err));
      }
    
      // filtering by employee name by updating state
      handleInputChange = (event) => {
        const value = event.target.value;
        this.setState({ search: value });
        this.filterEmployees(value.toLowerCase().trim());
      };
    
      handleFormSubmit = (event) => {
        event.preventDefault();
      };
    
      // sort through the key of specified object.
      sortBy = (key, primary = 0, secondary = 0) => {
        let sortedEmployees = this.state.filteredEmployees;
        if (this.state.sortDirections[key]) {
          this.setState({
            filteredEmployees: sortedEmployees.reverse(),
            sortDirections: {
              ...this.initialSortDirections,
              [key]: this.state.sortDirections[key] === "asc" ? "desc" : "asc",
            },
          });
        } else {
          sortedEmployees = this.state.filteredEmployees.sort((a, b) => {
            a = a[key];
            b = b[key];
    
            // sorting with secondary if the primary is the same
            if (primary) {
              if (secondary && a[primary] === b[primary]) {
                return a[secondary].localeCompare(b[secondary]);
              }
              return a[primary].localeCompare(b[primary]);
            } else {
              return a.localeCompare(b);
            }
          });
    
          this.setState({
            filteredEmployees: sortedEmployees,
            sortDirections: {
              ...this.initialSortDirections,
              [key]: "asc",
            },
          });
        }
      };
    
      filterEmployees = (input) => {
        if (input) {
          this.setState({
            filteredEmployees: this.state.employees.filter((employee) => {
              return (
                employee.name.first
                  .toLowerCase()
                  .concat(" ", employee.name.last.toLowerCase())
                  .includes(input) ||
                employee.phone.includes(input) ||
                employee.phone.replace(/[^\w\s]/gi, "").includes(input) ||
                employee.email.includes(input) ||
                this.formatDate(employee.dob.date).includes(input)
              );
            }),
          });
        } else {
          this.setState({ filteredEmployees: this.state.employees });
        }
      };
    
      formatDate = (date) => {
        date = new Date(date);
        let dob = [];
        dob.push(("0" + (date.getMonth() + 1)).slice(-2));
        dob.push(("0" + date.getDate()).slice(-2));
        dob.push(date.getFullYear());
    
        // join formatted date
        return dob.join("-");
      };
    
      render() {
        return (
          <>
            <Search
              value={this.state.search}
              handleInputChange={this.handleInputChange}
              handleFormSubmit={this.handleFormSubmit}
            />
            <div className="container mt-4">
              <List
                state={this.state}
                sortBy={this.sortBy}
                filterEmployees={this.filterEmployees}
                formatDate={this.formatDate}
              />
            </div>
          </>
        );
      }
    }

export default Container; 