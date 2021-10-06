// NPM packages
import {
  Firestore,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore/lite";

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
