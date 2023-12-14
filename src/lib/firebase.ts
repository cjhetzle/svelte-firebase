/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { derived, writable, type Readable } from 'svelte/store';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyC7HTBjLaa1RqZK4Parow-vWBl9z8bIArk',
	authDomain: 'svelte-firebase-b0c85.firebaseapp.com',
	projectId: 'svelte-firebase-b0c85',
	storageBucket: 'svelte-firebase-b0c85.appspot.com',
	messagingSenderId: '1008739597633',
	appId: '1:1008739597633:web:8463b3953e106bb738b5c0',
	measurementId: 'G-N6XRBCQ1T5'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();

function userStore() {
	let unsubscribe: () => void;

	if (!auth || !globalThis.window) {
		console.warn('Auth is not initialized or not in browser');
		const { subscribe } = writable<User | null>(null);
		return { subscribe };
	}

	const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
		unsubscribe = onAuthStateChanged(auth, (user) => {
			set(user);
		});
		return () => unsubscribe();
	});

  return {
    subscribe,
  }
}

export const user = userStore();


export function docStore<T>(path: string) {
  const docRef = doc(db, path);
  let unsubscribe: () => void;
  const { subscribe, set, update } = writable<T | null>(null, (set) => {
    unsubscribe = onSnapshot(docRef, (snapshot) => {
      set((snapshot.data() as T) ?? null);
    })
    return () => unsubscribe();
  });

  return {
    subscribe,
    ref: docRef,
    id: docRef.id,
  }
}

interface UserData {
  username: string;
  bio: string;
  photoURL: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  links: any[];
}

export const userData: Readable<UserData | null> = derived(user, ($user, set) => {
  if ($user) {
    return docStore<UserData>(`users/${$user.uid}`).subscribe(set);
  } else {
    set(null);
  }
});