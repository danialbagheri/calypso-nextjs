// import React from "react";
import React, { useState, useEffect } from "react";
import data from "../../data.json";
export default function TopBar() {
  const [message, setMessage] = useState(null);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    async function getTopBarStatus() {
      const endpoint = data.apiUrl + "web/configuration/top_bar/";
      const res = await fetch(endpoint);
      const json = await res.json();
      setMessage(json.value);
    }
    getTopBarStatus();
  }, []);
  if (message) {
    return (
      <div className="bg-danger top-bar">
        <p className="text-white text-centre">{message}</p>
      </div>
    );
  } else {
    return null;
  }
}

// export default class TopBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoaded: false,
//       message: "",
//     };
//   }
//   componentDidMount() {
//     this.fetchStatus();
//   }
//   fetchStatus() {
//     const baseUrl = process.env.API_URL;
//     const endPoint = baseUrl + "web/configuration/top_bar/";
//     fetch(endPoint)
//       .then((response) => response.json())
//       .then((result) => {
//         if (result.active) {
//           this.setState({
//             isLoaded: true,
//             message: result.value,
//           });
//         }
//       });
//   }
//   render() {
//     const { message, isLoaded } = this.state;
//     const topBar = isLoaded ? (
//       <div className="bg-danger top-bar">
//         <p className="text-white text-centre">{message}test</p>
//       </div>
//     ) : null;
//     return topBar;
//   }
// }
