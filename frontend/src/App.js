function App() {
  return (
    <div>
      <header>
        <button
          onClick={() => {
            fetch("http://127.0.0.1:5000/api/v1/auth/", {})
              .then((response) => {
                if (!response.ok) {
                  throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
              })
              .then((data) => console.log(data))
              .catch((error) => console.error('There was a problem with the fetch operation:', error));
          }}
        >
          GET SOME DATA
        </button>
      </header>
    </div>
  );
}

export default App;
