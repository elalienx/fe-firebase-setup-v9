// Project files
import iCandidate from "types/iCandidate";

interface iProps {
  item: iCandidate;
}

export default function ItemCandidate({ item }: iProps) {
  const { name, age, willingToRelocate } = item;

  // Properties
  const relocationText = willingToRelocate ? "Is willing to relocate" : "";

  return (
    <li>
      <b>{name}:</b> {age}, {relocationText}
    </li>
  );
}
