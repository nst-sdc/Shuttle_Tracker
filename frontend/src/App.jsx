import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Shuttle Tracker App</h1>
      <p>This is a placeholder for the Shuttle Tracker front-end.</p>
      <button onClick={() => setCount((c) => c + 1)}>Clicked {count} times</button>
    </>
  );
}

export default App;
