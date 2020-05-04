import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Cards() {
  // styling gallery
  const style = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  };
  const gallery = {
    margin: '10px',
  };

  // STATES
  const [cards, setCards] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  // GETTING DATA
  const getData = async () => {
    try {
      const data = await fetch('/getCard');
      const cards = await data.json();
      setCards(cards);
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE CARD
  const deleteFile = (id, e) => {
    e.preventDefault();
    if (window.confirm('Are you sure want to delete?')) {
      axios
        .delete(`/deleteCard/${id}`)
        .then((response) => {
          console.log(response);
          window.location.reload();
          return response;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    } else {
      alert('Delete is canceled');
    }
  };
  const getUsername = (id, content, e) => {
    var changes = window.prompt('Editing username', content);
    editUsername(id, changes, content);
  };
  const getEmail = (id, content, e) => {
    var changes = window.prompt('Editing email', content);
    editEmail(id, changes, content);
  };

  // EDIT USERNAME
  const editUsername = (id, changes, content) => {
    const formdata = new FormData();
    formdata.append('newusername', changes);
    if (changes === content) {
      alert('Username not changed');
    } else if (changes === null || changes === '') {
      alert('Edit is canceled');
    } else {
      // rest of the code
      axios
        .post(`/editCard/username/${id}`, formdata)
        .then((response) => {
          console.log(response);
          window.location.reload();
          return response;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    }
  };

  // EDIT EMAIL
  const editEmail = (id, changes, content) => {
    const formdata = new FormData();
    formdata.append('newemail', changes);
    if (changes === content) {
      alert('email not changed');
    } else if (changes === null || changes === '') {
      alert('Edit is canceled');
    } else {
      // rest of the code
      axios
        .post(`/editCard/email/${id}`, formdata)
        .then((response) => {
          console.log(response);
          window.location.reload();
          return response;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    }
  };

  return (
    <div style={style}>
      {cards.map((card) => (
        <div style={gallery} key={card._id}>
          <h2>
            {card.username}
            <i
              className='material-icons'
              onClick={(e) => getUsername(card._id, card.username, e)}
              title='click to edit'
            >
              edit
            </i>{' '}
          </h2>
          <div className='image'>
            <label className='custom-file-upload-edit'>
              <Link to={`/card/${card._id}`}>
                <i className='material-icons' title='click to edit'>
                  edit
                </i>
              </Link>
            </label>
            <img src={card.profile} style={{ width: '12vw' }} alt={card._id} />
          </div>
          <p>
            {card.email}
            <i
              className='material-icons'
              onClick={(e) => getEmail(card._id, card.email, e)}
              title='click to edit'
            >
              edit
            </i>
          </p>
          <br />
          <i>{card._id}</i> <br />
          <p
            className='delete'
            title='click to delete'
            onClick={(e) => deleteFile(card._id, e)}
          >
            DELETE
            <i className='material-icons' title='click to delete'>
              delete
            </i>
          </p>
        </div>
      ))}
    </div>
  );
}

export default Cards;
