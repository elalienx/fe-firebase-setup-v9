// Project files
import Placeholder from "assets/images/image-placeholder.png";
import { useState, FormEvent } from "react";
import iCandidate from "types/iCandidate";
import { uploadFile } from "scripts/cloudStorage";

// Interface
interface iProps {
  item: iCandidate;
  onDelete: Function;
  onUpdate: Function;
}

export default function ItemCandidate({ item, onUpdate }: iProps) {
  const { id, name, age, willingToRelocate, cvURL, imageURL } = item;

  // Local
  const [myImageURL, setMyImageURL] = useState(imageURL);
  const [myCVURL, setMyCVURL] = useState(cvURL);

  // Properties
  const relocationText = willingToRelocate ? "Is willing to relocate" : "";

  // Methods
  async function onFileChange(event: FormEvent) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const filename = `files/candidate-cv-${name}-${id}.pdf`;
    const fileUpload = await uploadFile(filename, file);

    // After the break
    alert("File uploaded");
    setMyCVURL(fileUpload);
  }

  async function onImageChange(event: FormEvent) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const filename = `images/candidate-image-${name}-${id}.jpg`;
    const fileUpload = await uploadFile(filename, file);

    // After the break
    setMyImageURL(fileUpload);
  }

  function onUpdateButton() {
    const editedCandidate = {
      id: id,
      name: name,
      age: age,
      willingToRelocate: willingToRelocate,
      cvURL: myCVURL,
      imageURL: myImageURL,
    };

    onUpdate(id, editedCandidate);
  }

  return (
    <li>
      <button onClick={() => onUpdateButton()}>Update me</button>
      <b>{name}:</b>
      {relocationText}
      <a href={cvURL} target="_blank" rel="noreferrer">
        Download CV
      </a>
      <br />

      {/* File uploader */}
      <input type="file" onChange={(event) => onFileChange(event)} />
      <br />

      {/* Image uploader */}
      <label className="custom-file-chooser">
        <input
          accept="image/gif, image/jpeg, image/png"
          onChange={(event) => onImageChange(event)}
          type="file"
        />
        <img src={myImageURL} alt="User generated content" />
      </label>
      <hr />
    </li>
  );
}
