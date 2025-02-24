import React from 'react';
import { useHistory } from 'react-router-dom';

function ProtectedPage() {
  const history = useHistory();


  if (!localStorage.getItem('token')) {
    history.push('/login'); 
  }

  return (
    <div className="protected-container">
      <h2>Protected Content</h2>
      <p>This content is only visible to authenticated users.</p>
      <button
        onClick={() => {
          localStorage.removeItem('token'); 
          history.push('/login'); 
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default ProtectedPage;
