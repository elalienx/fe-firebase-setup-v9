// NPM package
import { Firestore } from "firebase/firestore/lite";
import { useState } from "react";

// Project file
import { createDoc } from "scripts/fireStore";

// Inteface
interface iProps {
  database: Firestore;
}

export default function Form({ database }: iProps) {
  // Local storage
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  // Method
  function onSubmit(event: any) {
    event.preventDefault();

    const newCandidate = {
      name: name,
      age: age,
      willingToRelocate: false,
    };

    createDoc(database, "candidates", newCandidate);
  }

  return (
    <form>
      <h2>Formulary to add candidates</h2>

      <label>
        Name:
        <input
          type="text"
          placeholder="Eduardo"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>

      <label>
        Age:
        <input
          type="number"
          placeholder="35"
          value={age}
          onChange={(event) => setAge(Number(event.target.value))}
        />
      </label>

      <button onClick={(event) => onSubmit(event)}>Add candidate</button>
    </form>
  );
}
