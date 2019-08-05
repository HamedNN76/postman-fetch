import React, { Component } from 'react';

export default class Button extends Component {

  generateStyleFromType = type => {
    switch (type) {
      default:
      case 'primary':
        return {
          backgroundColor: 'blue'
        };
      case 'secondary':
        return {
          backgroundColor: 'tomato'
        };
      case 'danger':
        return {
          backgroundColor: 'red'
        }
    }
  };

  render() {
    const { children, type, ...restProps } = this.props;
    const globalButtonStyle = {
      border: '1px solid black',
      borderRadius: 5,
      color: 'white',
      padding: '10px 25px',
      fontSize: 18,
      cursor: 'pointer'
    };
    const buttonStyle = {
      ...globalButtonStyle,
      ...this.generateStyleFromType(type)
    };

    return <button style={buttonStyle} {...restProps}>{children}</button>;
  }
}
