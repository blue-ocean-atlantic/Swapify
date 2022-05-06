import React, { Component } from 'react';

class Card extends Component {
  constructor(props){
    super(props);

    this.state = {
      isVisible: false
    }
  }

  handleToggleShow = () => {
    this.setState({
      isVisible: !this.state.isVisible
    })
  }


  render() {
    const {name, num} = this.props.data;

    return (
      <div onClick={this.handleToggleShow}>
        <p>{name}</p>

        {this.state.isVisible && <p>{num}</p>}

      </div>
    );
  }
}

export default Card;