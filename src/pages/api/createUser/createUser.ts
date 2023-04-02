import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from 'firebase-admin/auth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') res.status(400).json({ error: 'Bad request' });

    if (!req.body) res.status(400).json({ error: 'No body' });

    if (!req.body.email || !req.body.password ) res.status(400).json({ error: 'Missing fields' });

    getAuth()
    .createUser({
        email: 'user@example.com',
        emailVerified: false,
        password: 'secretPassword',
        displayName: 'John Doe',
        photoURL: 'http://www.example.com/12345678/photo.png',
        disabled: false,
    })
    .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully created new user:', userRecord.uid);
    })
    .catch((error) => {
        console.log('Error creating new user:', error);
    });
}
