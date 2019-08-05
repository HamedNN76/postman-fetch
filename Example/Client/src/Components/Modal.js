import React, { Component } from 'react';
import './modal.scss';

export default class Modal extends Component {

  state = {
    show: false
  };

  setModalVisibility = visibility => this.setState({ show: visibility });

  show = () => this.setModalVisibility(true);

  hide = () => this.setModalVisibility(false);

  render() {
    const { show } = this.state;
    const { children } = this.props;

    return show ? (
      <div className="modal">
        <div className="modal-container">
          <div className="modal-close" onClick={() => this.setModalVisibility(false)}>x</div>
          {children}
        </div>
      </div>
    ) : null;
  }
}
