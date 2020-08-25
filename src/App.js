import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title:"Repo 1",
      url:"Repo 1.com",
      techs: ["65", "65"]
  })


  setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete('repositories/'+id)

    setRepositories(repositories.filter(repositorie => repositorie.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((reposorie) => (
          <li key={reposorie.id}>
            {reposorie.title}

            <button onClick={() => handleRemoveRepository(reposorie.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
