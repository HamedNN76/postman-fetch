import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Button, Modal } from "./Components";
import { fetch } from './fetch';

fetch('zadan');

export default class Books extends Component {

  _modal = null;

  getBooks = () => {

  };

  addbook = newBook => {

  };

  removeBook = bookId => {

  };

  editBook = editedBook => {

  };

  render() {
    const data = [
      {
        author: 'Zadan',
        name: 'name',
        pages: 1000
      },
      {
        author: 'Zadan',
        name: 'name',
        pages: 1000
      },
      {
        author: 'Zadan',
        name: 'name',
        pages: 1000
      },
      {
        author: 'Zadan',
        name: 'name',
        pages: 1000
      }
    ];

    const columns = [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Author',
        accessor: 'author'
      },
      {
        Header: 'Pages',
        accessor: 'pages'
      },
      {
        Header: 'Operation',
        accessor: '',
        Cell: row => <Button type="secondary" onClick={() => console.log(row.original.id)}>Edit book</Button>
      }
    ];

    return (
      <div>
        <Button type="primary">Add Book</Button>
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={10}
        />
        <Modal ref={ref => this._modal = ref}>

        </Modal>
      </div>
    );
  }
}
