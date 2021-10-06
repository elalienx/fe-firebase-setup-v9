// NPM packages
import { Firestore, collection, getDocs } from "firebase/firestore/lite";

// Read files
export async function getCollection(db: Firestore, path: string) {
  const myCollection = collection(db, path);
  const mySnapshot = await getDocs(myCollection);
  const myList = mySnapshot.docs.map((doc) => doc.data()); // something about id

  return myList;
}
