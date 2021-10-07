// NPM packages
import { useEffect, useState, useCallback } from "react";
import { getFirestore, updateDoc } from "firebase/firestore/lite";

// Project files
import firebaseInstance from "scripts/firebase";
import {
  getCollection,
  deleteDocument,
  updateDocument,
} from "scripts/fireStore";
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
  function onDelete(id: string) {
    deleteDocument(database, "candidates", id);
  }

  function onUpdate(id: string, editedCandidate: object) {
    updateDocument(database, "candidates", id, editedCandidate);
  }

  const candidatesCallback = useCallback(async () => {
    const collection = await getCollection(database, "candidates");
    setCandidates(collection as iCandidate[]);
    setStatus(1);
  }, [database]);

  useEffect(() => {
    candidatesCallback();
  }, [candidatesCallback]);

  // Components
  const CandidateItems = candidates.map((item) => (
    <ItemCandidate
      key={item.id}
      item={item}
      onDelete={onDelete}
      onUpdate={onUpdate}
    />
  ));

  return (
    <div className="App">
      <h1>FE Firebase Setup V9</h1>

      {status === 0 && <p>Loading ⏱</p>}
      {status === 1 && <ul>{CandidateItems}</ul>}
      {status === 1 && <Form database={database} />}
      {status === 2 && <p>Error 🚨</p>}
    </div>
  );
}
