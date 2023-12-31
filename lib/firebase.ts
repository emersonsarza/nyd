// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  doc,
  getFirestore,
  collection,
  getDocs,
  getDoc,
  DocumentReference,
  DocumentSnapshot,
  setDoc,
} from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBr0gJvT0TDMfxYPlqzQOzwBtA5JXukEDg",
  authDomain: "nyday-20705.firebaseapp.com",
  projectId: "nyday-20705",
  storageBucket: "nyday-20705.appspot.com",
  messagingSenderId: "157637995014",
  appId: "1:157637995014:web:cd9f38e4bc766cd8c9f187",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
export async function getUsers() {
  const usersCol = collection(db, "user");
  const userSnapshot = await getDocs(usersCol);

  const userList = await Promise.all(
    userSnapshot.docs.map(async (userDoc) => {
      try {
        const userData = userDoc.data();
        const userStories = await Promise.all(
          userData.stories.map(async (storyRef: any) => {
            const storyDoc = await getDoc(storyRef);
            if (storyDoc.exists()) {
              return { id: storyDoc.id, ...(storyDoc.data() as any) };
            } else {
              return null;
            }
          })
        );

        return {
          id: userDoc.id,
          name: userData.name,
          stories: userStories.filter((story) => story !== null),
        };
      } catch (error: any) {
        console.error("Error fetching user:", error.message);
        return null;
      }
    })
  );

  return userList.filter((user) => user !== null);
}
export interface Story {
  id: string;
  bg: string;
  caption: string;
  message: string;
  title: string;
}

export interface User {
  id: string;
  name: string;
  stories: (Story & { items: Story[] })[];
}

export async function getUser(userId: string): Promise<User | null> {
  const userDocRef: DocumentReference = doc(db, "user", userId);

  try {
    const userDocSnapshot: DocumentSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData: any = userDocSnapshot.data(); // Adjust as per your actual data structure

      const userStories: Story[] = await Promise.all(
        userData.stories.map(async (storyRef: any) => {
          const storyDoc: DocumentSnapshot = await getDoc(storyRef);
          return storyDoc.exists()
            ? { id: storyDoc.id, ...storyDoc.data() }
            : null;
        })
      );

      return {
        id: userDocSnapshot.id,
        name: userData.name,
        stories: userStories.filter((story) => story !== null) as (Story & {
          items: Story[];
        })[],
      };
    } else {
      console.log("User does not exist");
      return null;
    }
  } catch (error: any) {
    console.error("Error fetching user:", error.message);
    return null;
  }
}

// Add a new document in collection "cities"

export const addData = async (name: string) => {
  await setDoc(doc(db, "viewed", name), {
    on: new Date(),
  });
};
