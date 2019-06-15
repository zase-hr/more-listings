import React from 'react';
import axios from 'axios';
import ListOfHomes from './ListOfHomes.jsx';

class MoreHomes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: window.innerHeight,
      width: window.innerWidth,
      data: [],
    }

    this.handleResize = this.handleResize.bind(this);
  }

  handleResize() {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth
    });
  }

  componentDidMount(e) {
    window.addEventListener("resize", this.handleResize);
    const search = window.location.search;
    const params = new URLSearchParams(search);
    // axios.get(`/MoreHomes?id=${params.get('id')}`)
    //   .then((response) => {
    //     console.log(response.data.results);
    //     const rows = response.data.results[0].data.map(data => {
    //       let { row } = data
    //       return row[0];
    //     });
    //     this.setState({ data: rows })
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   });
    fetch('http://localhost:7474/db/data/transaction/commit', {
      headers: {
        "Accept": "application/json; charset=UTF-8",
        "Content-Type": "application/json",
        "Authorization": "Basic bmVvNGo6aG9kYWs="
      },
      method: 'POST',
      body: JSON.stringify({
        statements : [ {
          statement: `MATCH (a:Listing {id: ${params.get('id')}})-[:RECOMMENDS]->(b:Listing) RETURN b`    
        } ]
      })
    })
      .then((response) => {
        return response.json();
      })
      .then(json => {
        console.log(json);
        const rows = json.results[0].data.map(data => {
            let { row } = data
            return row[0];
          });
        this.setState({ data: rows });
      })
      .catch(err => {
        console.log('Error retrieving data: ' + err);
      });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    return (
      <div className="module">
        <div className="moduleTitle">
          <span>More homes you may like</span>
        </div>
        <ListOfHomes data={this.state.data}
          height={this.state.height}
          width={this.state.width}
        />
      </div>
    )
  }
}

export default MoreHomes;
