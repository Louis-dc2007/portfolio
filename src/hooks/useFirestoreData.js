import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db, portfolioId } from '../config/firebase';

export const useFirestoreData = () => {
    const [projects, setProjects] = useState([]);
    const [experience, setExperience] = useState([]);
    const [education, setEducation] = useState([]);
    const [photos, setPhotos] = useState([]);

    const [loadingData, setLoadingData] = useState({
        projects: true,
        experience: true,
        education: true,
        photos: true
    });

    useEffect(() => {
        const setupListener = (collectionName, setter) => {
            const q = collection(db, 'artifacts', portfolioId, 'public', 'data', collectionName);
            return onSnapshot(q, (snapshot) => {
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                // Tri manuel par date de création
                data.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
                setter(data);
                setLoadingData(prev => ({ ...prev, [collectionName]: false }));
            }, (error) => {
                console.error(`Erreur ${collectionName}:`, error);
                setLoadingData(prev => ({ ...prev, [collectionName]: false }));
            });
        };

        const unsubProjects = setupListener('projects', setProjects);
        const unsubExp = setupListener('experience', setExperience);
        const unsubEdu = setupListener('education', setEducation);
        const unsubPhotos = setupListener('photos', setPhotos);

        return () => {
            unsubProjects();
            unsubExp();
            unsubEdu();
            unsubPhotos();
        };
    }, []);

    return {
        projects, setProjects,
        experience, setExperience,
        education, setEducation,
        photos, setPhotos,
        loadingData
    };
};
