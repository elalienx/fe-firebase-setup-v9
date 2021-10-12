// Project files
import { useState } from "react";
import iCandidate from "types/iCandidate";

// Interface
interface iProps {
  item: iCandidate;
  onDelete: Function;
  onUpdate: Function;
}

export default function ItemCandidate({ item, onDelete, onUpdate }: iProps) {
  const { id, name, age, willingToRelocate } = item;

  // Local
  const [myAge, setMyAge] = useState(age);

  // Methods
  function onUpdateButton() {
    const editedCandidate = {
      id: id,
      name: name,
      age: myAge,
      willingToRelocate: willingToRelocate,
    };

    onUpdate(id, editedCandidate);
  }

  // Properties
  const relocationText = willingToRelocate ? "Is willing to relocate" : "";

  return (
    <li>
      <button onClick={() => onUpdateButton()}>Update me</button>
      <b>{name}:</b>
      <input
        type="number"
        value={myAge}
        onChange={(event) => setMyAge(Number(event.target.value))}
      />

      {relocationText}
    </li>
  );
}
