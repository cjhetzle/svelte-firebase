import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase/firestore';
import { FB_CLIENT_EMAIL, FB_PROJECT_ID, FB_SECRET_KEY } from '$env/static/private';
import pkg from 'firebase-admin';

try {
	pkg.initializeApp({
		credential: pkg.credential.cert({
			projectId: FB_PROJECT_ID,
			clientEmail: FB_CLIENT_EMAIL,
			privateKey: FB_SECRET_KEY
		})
	});
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
} catch (err: any) {
	console.error('Firebase Admin Error: ', err.stack);
}

export const adminAuth = getAuth();
export const adminDb = getFirestore();