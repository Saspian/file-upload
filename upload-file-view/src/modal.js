import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Modal({ match }) {
  const [card, setCard] = useState('');
  const [newImage, setNewImage] = useState('');

  const getSingleCard = async () => {
    const getData = await fetch(`/getCard/${match.params.id}`);
    const data = await getData.json();
    setCard(data);
  };
  console.log(card);
  // EDIT PHOTO
  const fileChangeHandler = (e) => {
    // Cancel gareko bela ma image ko k hunxa vane xaina hai
    // CHECKING FILETYPE
    if (
      e.target.files[0].type === 'image/jpeg' ||
      e.target.files[0].type === 'image/png'
    ) {
      // CHECKING FILESIZE LIMITING TO 5 MB
      if (e.target.files[0].size <= 1000 * 1000 * 5) {
        setNewImage({ profile: e.target.files[0] });
      } else {
        setNewImage({
          err: 'Please choose file less than 5MB',
        });
      }
    } else {
      setNewImage({
        err: 'unsupported format, please choose jpeg or png file',
      });
    }
  };

  const editPhoto = (id, e) => {
    const formdata = new FormData();
    formdata.append('profile', newImage.profile);
    axios
      .post(`/editcard/image/${id}`, formdata)
      .then((response) => {
        console.log(response);
        window.location.href = '/';
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };

  useEffect(() => {
    getSingleCard();
  }, []);

  return (
    <div>
      <div id='myModal' className='modal'>
        <div className='modal-content'>
          {newImage.err ? (
            <i style={{ color: 'red', margin: '0px auto' }}>{newImage.err}</i>
          ) : (
            ''
          )}
          <Link to='/' className='close'>
            &times;
          </Link>
          <p>Change picture of {card.username}</p> <br />
          <p>Select the new image</p>
          <input type='file' onChange={fileChangeHandler} /> <br />
          <button type='submit' onClick={(e) => editPhoto(card._id, e)}>
            Change
          </button>
        </div>
      </div>
    </div>
  );
}
export default Modal;
