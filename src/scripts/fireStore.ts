// NPM packages
import {
  Firestore,
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore/lite";

// C✅.R✅.U⏱.D✅

// Create file
export async function createDoc(db: Firestore, path: string, data: object) {
  const docRef = await addDoc(collection(db, path), data);

  console.log("Document written with ID: ", docRef.id);
}

// Read files
export async function getCollection(db: Firestore, path: string) {
  const myCollection = collection(db, path);
  const mySnapshot = await getDocs(myCollection);
  const myList = mySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  return myList;
}

// Update file
export async function updateDocument(
  db: Firestore,
  path: string,
  id: string,
  data: Object
) {
  const documentReference = doc(db, path, id);
  await updateDoc(documentReference, data);

  console.log(`Document id: ${id} was updated on ${path}.`);
}

// Delete file
export async function deleteDocument(db: Firestore, path: string, id: string) {
  await deleteDoc(doc(db, path, id));

  console.log(`Document id: ${id} was deleted from ${path}.`);
}
