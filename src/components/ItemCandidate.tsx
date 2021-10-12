// Project files
import { useState, FormEvent } from "react";
import iCandidate from "types/iCandidate";
import { uploadFile } from "scripts/cloudStorage";
import dataURLToFile from "scripts/upload-image/dataURLToFile";
import readImage from "scripts/upload-image/readImage";
import resizeImage from "scripts/upload-image/resizeImage";

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
    const filename = `images/candidate-image-${name}-${id}.png`;

    const originalImage = await readImage(file);
    const resizedImage = await resizeImage(originalImage, 250, 250);
    const finalImage = await dataURLToFile(resizedImage, `${filename}.png`);

    const fileUpload = await uploadFile(filename, finalImage);

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
      <br />

      <b>{name}:</b>
      {relocationText}
      <a href={cvURL} target="_blank" rel="noreferrer">
        Download CV
      </a>
      <br />

      {/* File uploader */}
      <b>Upload CV:</b>
      <br />
      <input type="file" onChange={(event) => onFileChange(event)} />
      <br />

      {/* Image uploader */}
      <b>Upload Thumbnail:</b>
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
