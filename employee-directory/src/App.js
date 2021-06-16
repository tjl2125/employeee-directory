import React from "react";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import Container from "./components/EmployeeContainer/Container";
import List from "./components/List/List";
// import "./App.css";

function App() {
  return (
    <div class = "App">
      <Header />
        <Search />
        <Container>
          <List>

          </List>
        </Container>

    </div>
    
  );
}

export default App;