import React from 'react';

class Banner extends React.Component {
  constructor() {
    super();
  }

  render() {
    return(
      <div className = "container-fluid banner">
        <h2 className="bannerText"> The Milos email service. </h2>
      </div>
    )
  }

}

export default Banner;
