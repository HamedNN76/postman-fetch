import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Button, Input, Modal } from "./Components";
import { fetch, setVariables, variables } from './fetch';

export default class Books extends Component {

  state = {
    loading: false,
    data: [],
    name: '',
    author: '',
    pages: '',
    isAdding: false,
    editingId: null
  };

  handleChange = e => this.setState({
    [e.target.name]: e.target.value
  });

  getBooks = async () => {
    const { data } = await fetch('exampleBooks.Get Books');
    await this.setState({ data });
  };

  showAddModal = () => {
    this._modal.show();
    this.setState({
      name: '',
      author: '',
      pages: '',
      isAdding: true
    });
  };

  showEditModal = ({ name, author, pages, id }) => {
    this.setState({
      name,
      author,
      pages,
      isAdding: false,
      editingId: id
    }, () => this._modal.show());
  };

  addBook = async () => {
    const { name, author, pages } = this.state;
    const newBook = { name, author, pages };

    try {
      const { data } = await fetch('createBook', { data: newBook });
      await this.setState({
        name: '',
        author: '',
        pages: '',
        data,
        isAdding: false
      });
      await this._modal.hide();
    } catch (e) {
      alert(e);
    }
  };

  removeBook = async bookId => {
    await setVariables({ bookId });
    try {
      await fetch('deleteBook');
      await this.setState({
        data: this.state.data.filter(item => item.id !== bookId)
      })
    } catch (e) {
      alert(e);
    }
  };

  editBook = async () => {
    const { name, author, pages, editingId } = this.state;
    const editedBook = { name, author, pages };

    try {
      await setVariables({ bookId: editingId });
      const { data } = await fetch('editBook', { data: editedBook });
      await this.setState({
        data: this.state.data.map(item => item.id === editingId ? data : item)
      });
      await this._modal.hide();
    } catch (e) {
      alert(e);
    }
  };

  componentDidMount() {
    return this.getBooks();
  }

  render() {
    const { data, loading, author, name, pages, isAdding } = this.state;
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
        Cell: row => (
          <div>
            <Button type="secondary" onClick={() => this.showEditModal(row.original)}>Edit book</Button>
            <Button type="danger" onClick={() => this.removeBook(row.original.id)}>Remove book</Button>
          </div>
        )
      }
    ];

    return (
      <div>
        {
          loading ?
            '...loading...' :
            <>
              <div className="text-center">
                <Button type="primary" onClick={this.showAddModal}>Add Book</Button>
              </div>
              <ReactTable
                data={data}
                columns={columns}
                defaultPageSize={10}
              />
              <Modal ref={ref => this._modal = ref}>
                <form onSubmit={e => e.preventDefault()}>
                  <Input onChange={this.handleChange} value={name} name="name" type="text" title="Name: "/>
                  <Input onChange={this.handleChange} value={author} name="author" type="text" title="Author: "/>
                  <Input onChange={this.handleChange} value={pages} name="pages" type="number" title="Pages: "/>
                  {isAdding ? <Button type="primary" onClick={this.addBook}>Add Book</Button> : null}
                  {!isAdding ? <Button type="primary" onClick={this.editBook}>Edit Book</Button> : null}
                </form>
              </Modal>
            </>
        }
      </div>
    );
  }
}
