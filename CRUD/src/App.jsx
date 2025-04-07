import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setformData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      alert(result.message);
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <h1>Sign Up</h1>
          <div>
            <label htmlFor="name">Name : </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password : </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="btn">
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </div>
      </form>
    </>
  );
}

export default App;
