// NPM packages
import { useEffect, useState, useCallback } from "react";

// Project files
import {
  getCollection,
  deleteDocument,
  updateDocument,
} from "scripts/fireStore";
import { firestoreReference } from "scripts/firebase";
import iCandidate from "types/iCandidate";
import ItemCandidate from "components/ItemCandidate";
import Form from "components/Form";
import "./sakura.css";

export default function App() {
  // Local state
  const [candidates, setCandidates] = useState(Array<iCandidate>());
  const [status, setStatus] = useState(0); // 0: loading, 1: loaded, 2: error

  // Methods
  function onDelete(id: string) {
    deleteDocument(firestoreReference, "candidates", id);
  }

  function onUpdate(id: string, editedCandidate: object) {
    updateDocument(firestoreReference, "candidates", id, editedCandidate);
  }

  const candidatesCallback = useCallback(async () => {
    const collection = await getCollection(firestoreReference, "candidates");
    setCandidates(collection as iCandidate[]);
    setStatus(1);
  }, []);

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
      {status === 1 && <Form firestoreReference={firestoreReference} />}
      {status === 2 && <p>Error 🚨</p>}
    </div>
  );
}
