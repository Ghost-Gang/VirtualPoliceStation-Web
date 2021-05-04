import React from "react";

function App() {
  if (window.location.hostname === "virtualpolicestation.herokuapp.com") {
    window.location.href = "https://virtualpolicestation.atmandas.co";
  }
  return (
    <div>
      This project is moved to
      <a href="https://virtualpolicestation.atmandas.co">Here</a>
    </div>
  );
}

export default App;
