import React, {useState, useEffect} from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [repositories, setRepositories ] = useState([]);

  useEffect(()=>{
    api.get('/repositories').then(response => {setRepositories(response.data)});
  },[]);

  async function handleAddRepository() {
    
    const response = await api.post('/repositories',{
                                                title:`Titulo ${Date.now()}`,
                                                url:`http://www.${Date.now()}.com`,
                                                techs:["NodeJs","teste1","Teste2"]
                                              });
    const repositorie = response.data;
    setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    if (response.status === 204){

      setRepositories(repositories.filter(repositorie=> repositorie.id !== id));
    }
  }

  return (
    <div >
      <>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => 
        <li key={repositorie.id}>
          {repositorie.title}

          <button onClick={() => handleRemoveRepository(repositorie.id)}>
            Remover
          </button>
        </li>
         )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
      </>
    </div>
  );
}

export default App;
