import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="protected-page">
      <h3>This content is only visible to authenticated users.</h3>
    </div>
  );
}

export default ProtectedPage;
