import React, { useState } from 'react';
import axios from 'axios';

function FormInput() {
  const [infos, setInfos] = useState([]);
  const [files, setFiles] = useState('');

  // ADDING INFOS
  const changeHandler = (e) => {
    setInfos({ ...infos, [e.target.name]: e.target.value });
  };
  // ADING FILES
  const fileChangeHandler = (e) => {
    // CHECKING FILETYPE
    if (
      e.target.files[0].type === 'image/jpeg' ||
      e.target.files[0].type === 'image/png'
    ) {
      // CHECKING FILESIZE LIMITING TO 5 MB
      if (e.target.files[0].size <= 1000 * 1000 * 5) {
        setFiles({ profile: e.target.files[0] });
      } else {
        setFiles({
          err: 'Please choose file less than 5MB',
        });
        console.log(files.err);
      }
    } else {
      setFiles({
        err: 'unsupported format, please choose jpeg or png file',
      });
      console.log(files.err);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // CREATING FORM DATA
    const formdata = new FormData();
    if (files.err) {
      throw new Error('File not supported');
    } else {
      // ADDING DATA TO FORM DATA
      formdata.append('username', infos.username);
      formdata.append('email', infos.email);
      formdata.append('profile', files.profile);
      console.log(files.profile);
      axios
        .post('/addCard', formdata)
        .then((response) => {
          console.log(response, 'this is response');
          return response;
        })
        .catch((error) => {
          console.log(error, 'this is error');
          return error;
        });
      console.log(infos, 'this is info');
    }
  };
  return (
    <div>
      <h1>React form to upload image</h1>
      {files.err ? <i style={{ color: 'red' }}>{files.err}</i> : ''}
      <form
        onSubmit={submitHandler}
        method='POST'
        encType='multipart/form-data'
      >
        <label>username :</label>{' '}
        <input
          type='text'
          name='username'
          size='20'
          onChange={changeHandler}
          required
        />{' '}
        <br />
        <label>email :</label>{' '}
        <input
          type='email'
          name='email'
          size='20'
          onChange={changeHandler}
          required
        />{' '}
        <br />
        <label>Profile image</label>
        <input
          type='file'
          name='profile'
          onChange={fileChangeHandler}
          required
        />{' '}
        <br />
        <input type='submit' />
      </form>
      <h1>List of cards</h1>
      <hr />
    </div>
  );
}
export default FormInput;
