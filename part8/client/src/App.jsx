import './App.css';

import { gql, useQuery } from '@apollo/client';

const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`;

function App() {
  const result = useQuery(ALL_PERSONS);

  if (result.loading) {
    return <>loading ...</>;
  }
  return <>{result.data.allPersons.map((p) => p.name).join(', ')}</>;
}

export default App;
