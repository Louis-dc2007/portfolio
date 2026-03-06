import { useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, signInAnonymously } from 'firebase/auth';
import { auth } from '../config/firebase';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                if (currentUser && !currentUser.isAnonymous) {
                    setUser(currentUser);
                } else {
                    setUser(null);
                    if (!currentUser) {
                        signInAnonymously(auth).catch((err) => console.error("Auth Error:", err));
                    }
                }
                setIsLoadingAuth(false);
            });
            return unsubscribe;
        };
        initAuth();
    }, []);

    const loginAdmin = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    };

    const logoutAdmin = async () => {
        await signOut(auth);
    };

    return { user, isLoadingAuth, loginAdmin, logoutAdmin };
};
