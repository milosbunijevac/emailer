import React from 'react';

class InputTextField extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  render() {
    return (
      <div className = "bodyTextField">
        <textarea className="bodyField col-md-10" placeholder="Enter information to send..." onChange={this.props.textAreaInput.bind(this, 'bodyText')} name="bodyField" rows="20" cols="50">
        </textarea>
      </div>
    );
  }

}

export default InputTextField;
