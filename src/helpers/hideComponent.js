import React, { useEffect } from 'react'

const App = () => {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setCount('Timeout called!');
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      Hello, World
    </div>
  );
};

export default hideComponent;