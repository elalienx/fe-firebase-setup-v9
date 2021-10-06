// NPM packages
import { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore/lite";

// Project files
import TodoOffClass from "components/TodoOffClass";
import TodoOnClass from "components/TodoOnClass";
import firebaseInstance from "scripts/firebase";
import { getCollection } from "scripts/fireStore";
import iCandidate from "types/iCandidate";
import ItemCandidate from "components/ItemCandidate";
import Form from "components/Form";
import "./sakura.css";

export default function App() {
  // Local state
  const [candidates, setCandidates] = useState(Array<iCandidate>());
  const [status, setStatus] = useState(0); // 0: loading, 1: loaded, 2: error

  // Properties
  const database = getFirestore(firebaseInstance);

  // Methods
  useEffect(() => {
    getCollection(database, "candidates")
      .then((result) => {
        setCandidates(result as iCandidate[]);
        setStatus(1);
      })
      .catch((error) => {
        console.log(error);
        setStatus(2);
      });
  }, [database]);

  // Components
  const CandidateItems = candidates.map((item) => (
    <ItemCandidate key={item.id} item={item} />
  ));

  return (
    <div className="App">
      <h1>FE Firebase Setup V9</h1>

      <TodoOffClass />
      <TodoOnClass />

      {status === 0 && <p>Loading ⏱</p>}
      {status === 1 && <ul>{CandidateItems}</ul>}
      {status === 1 && <Form database={database} />}
      {status === 2 && <p>Error 🚨</p>}
    </div>
  );
}
