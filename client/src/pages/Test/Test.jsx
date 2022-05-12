import React, { useState } from 'react';
import axios from 'axios';

const Test = () => {

  const currentUser = document.cookie;

  console.log('currentUser at TEST PAGE', currentUser);
  // handleGetData(() =>{
  //   axios.get('/api/users', { currentUser }) //go to your endpoint to query data
  // })

  return (
    <>
      <button>
        Hello
      </button>
    </>
  );
}

export default Test;
