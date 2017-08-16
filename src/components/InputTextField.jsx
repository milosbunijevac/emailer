import React from 'react';

class InputTextField extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  render() {
    return (
      <div>
        <textarea className="bodyField col-md-10" placeholder="Enter information to send..." onChange={this.props.textAreaInput} name="bodyField" rows="20" cols="50">
          
        </textarea>
      </div>
    );
  }

}

export default InputTextField;
