import React, { useState } from 'react';
import { Lock, Upload, Trash2 } from 'lucide-react';
import { addDoc, collection, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { db, portfolioId } from '../../config/firebase';

const AdminConsole = ({
    user,
    handleLogout,
    projects, setProjects,
    journal, setJournal,
    experience, setExperience,
    education, setEducation,
    photos, setPhotos
}) => {
    const [newProject, setNewProject] = useState({ title: '', category: '', description: '', image: '' });
    const [newPost, setNewPost] = useState({ title: '', content: '', image: '' });
    const [newExp, setNewExp] = useState({ company: '', role: '', period: '', description: '' });
    const [newEdu, setNewEdu] = useState({ school: '', degree: '', period: '', description: '' });
    const [newPhotos, setNewPhotos] = useState([]);

    if (!user || user.isAnonymous) return null;

    const handleFileUpload = (e, setter, field) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.onload = () => {
                    const maxDimension = 1200;
                    let width = img.width;
                    let height = img.height;
                    if (width > height && width > maxDimension) {
                        height = Math.round((height * maxDimension) / width);
                        width = maxDimension;
                    } else if (height > maxDimension) {
                        width = Math.round((width * maxDimension) / height);
                        height = maxDimension;
                    }
                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
                    setter(prev => ({ ...prev, [field]: compressedBase64 }));
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const addDocToFirestore = async (col, data, resetter, initialData) => {
        if (!user || user.isAnonymous) return;
        try {
            const payload = {
                ...data,
                createdAt: serverTimestamp()
            };
            if (col === 'journal') {
                payload.date = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
            }
            await addDoc(collection(db, 'artifacts', portfolioId, 'public', 'data', col), payload);
            resetter(initialData);
        } catch (err) {
            console.error("Erreur d'envoi Firestore:", err);
            alert("Erreur lors de l'enregistrement. Vérifiez votre connexion.");
        }
    };

    const deleteItem = async (col, id) => {
        if (!user || user.isAnonymous) return;
        if (!window.confirm('Supprimer cet élément ?')) return;
        try {
            if (col === 'photos') {
                await deleteDoc(doc(db, 'artifacts', portfolioId, 'public', 'data', col, id));
                setPhotos(prev => prev.filter(p => p.id !== id));
            } else {
                await deleteDoc(doc(db, 'artifacts', portfolioId, 'public', 'data', col, id));
                if (col === 'projects') setProjects(prev => prev.filter(item => item.id !== id));
                if (col === 'journal') setJournal(prev => prev.filter(item => item.id !== id));
                if (col === 'experience') setExperience(prev => prev.filter(item => item.id !== id));
                if (col === 'education') setEducation(prev => prev.filter(item => item.id !== id));
            }
        } catch (err) {
            console.error("Erreur de suppression:", err);
            alert("Erreur lors de la suppression.");
        }
    };

    return (
        <section className="max-w-[1200px] mx-auto px-8 py-32 animate-fade-in pb-60">
            <header className="mb-20 border-b border-rose-100 dark:border-rose-900/50 pb-8 flex justify-between items-center">
                <h2 className="font-serif text-4xl md:text-6xl tracking-tighter text-rose-600 dark:text-rose-500 flex items-center gap-4"><Lock size={40} className="hidden md:block" /> Console Admin</h2>
                <button onClick={handleLogout} className="text-neutral-400 hover:text-rose-600 dark:hover:text-rose-500 font-bold text-[10px] uppercase tracking-widest border border-neutral-100 dark:border-white/10 px-4 py-2 transition-colors">Déconnexion</button>
            </header>

            <div className="grid lg:grid-cols-2 gap-x-20 gap-y-32">
                {/* Gérer les Projets */}
                <div className="space-y-10">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-4">Nouveau Projet</h3>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            addDocToFirestore('projects', newProject, setNewProject, { title: '', category: '', description: '', image: '' });
                        }}
                        className="space-y-6 bg-neutral-50 dark:bg-white/5 p-10 shadow-sm"
                    >
                        <input type="text" placeholder="Titre" className="w-full bg-transparent border-b border-neutral-200 dark:border-white/20 py-2 focus:outline-none focus:border-neutral-950 dark:focus:border-white text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600" value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })} required />
                        <input type="text" placeholder="Catégorie" className="w-full bg-transparent border-b border-neutral-200 dark:border-white/20 py-2 focus:outline-none focus:border-neutral-950 dark:focus:border-white text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600" value={newProject.category} onChange={e => setNewProject({ ...newProject, category: e.target.value })} required />
                        <textarea placeholder="Description" className="w-full bg-transparent border-b border-neutral-200 dark:border-white/20 py-2 focus:outline-none h-24 focus:border-neutral-950 dark:focus:border-white text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600" value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })} required />
                        <label className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 dark:border-neutral-700 p-8 hover:border-neutral-950 dark:hover:border-white transition-colors cursor-pointer bg-white dark:bg-neutral-900">
                            {newProject.image ? (
                                <img src={newProject.image} className="max-h-32 mb-2" alt="Aperçu" />
                            ) : (
                                <Upload size={24} className="text-neutral-300 mb-2" />
                            )}
                            <span className="text-[10px] font-bold uppercase">Image du projet (PC)</span>
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, setNewProject, 'image')} />
                        </label>
                        <button type="submit" className="w-full bg-neutral-950 text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors">Publier Projet</button>
                    </form>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                        {projects.map(p => (
                            <div key={p.id} className="flex items-center justify-between p-4 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-white/5 group">
                                <span className="font-serif truncate mr-4">{p.title}</span>
                                <button onClick={() => deleteItem('projects', p.id)} className="text-neutral-200 group-hover:text-rose-600 transition-colors flex-shrink-0"><Trash2 size={18} /></button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Gérer le Journal */}
                <div className="space-y-10">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-4">Nouvelle Note Journal</h3>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            addDocToFirestore('journal', newPost, setNewPost, { title: '', content: '', image: '' });
                        }}
                        className="space-y-6 bg-neutral-50 dark:bg-white/5 p-10 shadow-sm"
                    >
                        <input type="text" placeholder="Titre de la note" className="w-full bg-transparent border-b border-neutral-200 dark:border-white/20 py-2 focus:outline-none focus:border-neutral-950 dark:focus:border-white text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600" value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} required />
                        <textarea placeholder="Réflexion..." className="w-full bg-transparent border-b border-neutral-200 dark:border-white/20 py-2 focus:outline-none h-44 focus:border-neutral-950 dark:focus:border-white text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600" value={newPost.content} onChange={e => setNewPost({ ...newPost, content: e.target.value })} required />
                        <label className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 dark:border-neutral-700 p-8 hover:border-neutral-950 dark:hover:border-white transition-colors cursor-pointer bg-white dark:bg-neutral-900">
                            {newPost.image ? (
                                <img src={newPost.image} className="max-h-32 mb-2" alt="Aperçu" />
                            ) : (
                                <Upload size={24} className="text-neutral-300 mb-2" />
                            )}
                            <span className="text-[10px] font-bold uppercase">Image illustrative (PC)</span>
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, setNewPost, 'image')} />
                        </label>
                        <button type="submit" className="w-full bg-neutral-950 text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors">Enregistrer Note</button>
                    </form>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                        {journal.map(post => (
                            <div key={post.id} className="flex items-center justify-between p-4 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-white/5 group">
                                <span className="font-serif truncate mr-4">{post.title}</span>
                                <button onClick={() => deleteItem('journal', post.id)} className="text-neutral-200 group-hover:text-rose-600 transition-colors flex-shrink-0"><Trash2 size={18} /></button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Gérer les Expériences */}
                <div className="space-y-10">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-4">Ajouter Expérience</h3>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            addDocToFirestore('experience', newExp, setNewExp, { company: '', role: '', period: '', description: '' });
                        }}
                        className="space-y-6 bg-neutral-50 dark:bg-white/5 p-10 shadow-sm"
                    >
                        <input type="text" placeholder="Entreprise" className="w-full bg-transparent border-b border-neutral-200 dark:border-white/20 py-2 focus:outline-none focus:border-neutral-950 dark:focus:border-white text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600" value={newExp.company} onChange={e => setNewExp({ ...newExp, company: e.target.value })} required />
                        <input type="text" placeholder="Rôle" className="w-full bg-transparent border-b border-neutral-200 dark:border-white/20 py-2 focus:outline-none focus:border-neutral-950 dark:focus:border-white text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600" value={newExp.role} onChange={e => setNewExp({ ...newExp, role: e.target.value })} required />
                        <input type="text" placeholder="Période" className="w-full bg-transparent border-b border-neutral-200 dark:border-white/20 py-2 focus:outline-none focus:border-neutral-950 dark:focus:border-white text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600" value={newExp.period} onChange={e => setNewExp({ ...newExp, period: e.target.value })} required />
                        <textarea placeholder="Détails..." className="w-full bg-transparent border-b border-neutral-200 dark:border-white/20 py-2 focus:outline-none h-24 focus:border-neutral-950 dark:focus:border-white text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600" value={newExp.description} onChange={e => setNewExp({ ...newExp, description: e.target.value })} required />
                        <button type="submit" className="w-full bg-neutral-950 text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors">Ajouter</button>
                    </form>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                        {experience.map(exp => (
                            <div key={exp.id} className="flex items-center justify-between p-4 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-white/5 group">
                                <span className="font-serif truncate mr-4">{exp.role} @ {exp.company}</span>
                                <button onClick={() => deleteItem('experience', exp.id)} className="text-neutral-200 group-hover:text-rose-600 transition-colors flex-shrink-0"><Trash2 size={18} /></button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Gérer les Formations */}
                <div className="space-y-10">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-4">Ajouter Formation</h3>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            addDocToFirestore('education', newEdu, setNewEdu, { school: '', degree: '', period: '', description: '' });
                        }}
                        className="space-y-6 bg-neutral-50 dark:bg-white/5 p-10 shadow-sm"
                    >
                        <input type="text" placeholder="École" className="w-full bg-transparent border-b border-neutral-200 dark:border-white/20 py-2 focus:outline-none focus:border-neutral-950 dark:focus:border-white text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600" value={newEdu.school} onChange={e => setNewEdu({ ...newEdu, school: e.target.value })} required />
                        <input type="text" placeholder="Diplôme" className="w-full bg-transparent border-b border-neutral-200 dark:border-white/20 py-2 focus:outline-none focus:border-neutral-950 dark:focus:border-white text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600" value={newEdu.degree} onChange={e => setNewEdu({ ...newEdu, degree: e.target.value })} required />
                        <input type="text" placeholder="Période" className="w-full bg-transparent border-b border-neutral-200 dark:border-white/20 py-2 focus:outline-none focus:border-neutral-950 dark:focus:border-white text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600" value={newEdu.period} onChange={e => setNewEdu({ ...newEdu, period: e.target.value })} required />
                        <textarea placeholder="Détails..." className="w-full bg-transparent border-b border-neutral-200 dark:border-white/20 py-2 focus:outline-none h-24 focus:border-neutral-950 dark:focus:border-white text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600" value={newEdu.description} onChange={e => setNewEdu({ ...newEdu, description: e.target.value })} required />
                        <button type="submit" className="w-full bg-neutral-950 text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors">Ajouter</button>
                    </form>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                        {education.map(edu => (
                            <div key={edu.id} className="flex items-center justify-between p-4 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-white/5 group">
                                <span className="font-serif truncate mr-4">{edu.degree} @ {edu.school}</span>
                                <button onClick={() => deleteItem('education', edu.id)} className="text-neutral-200 group-hover:text-rose-600 transition-colors flex-shrink-0"><Trash2 size={18} /></button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Gérer la Galerie Photo */}
                <div className="space-y-10 lg:col-span-2">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-4">Gérer la Galerie Photo</h3>
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            if (!user || user.isAnonymous || newPhotos.length === 0) return;
                            try {
                                for (const photo of newPhotos) {
                                    const payload = {
                                        image: photo.image,
                                        caption: photo.caption || '',
                                        createdAt: serverTimestamp()
                                    };
                                    await addDoc(collection(db, 'artifacts', portfolioId, 'public', 'data', 'photos'), payload);
                                }
                                setNewPhotos([]);
                            } catch (err) {
                                console.error("Erreur d'envoi Firestore:", err);
                                alert("Erreur lors de l'enregistrement des photos.");
                            }
                        }}
                        className="bg-neutral-50 dark:bg-white/5 p-10 grid md:grid-cols-2 gap-10 shadow-sm"
                    >
                        <div className="space-y-6">
                            <label className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 dark:border-neutral-700 p-12 hover:border-neutral-950 dark:hover:border-white transition-colors cursor-pointer bg-white dark:bg-neutral-900">
                                {newPhotos.length > 0 ? (
                                    <div className="text-center">
                                        <p className="text-3xl font-serif mb-2 text-neutral-950 dark:text-white">{newPhotos.length}</p>
                                        <p className="text-[10px] font-bold uppercase text-neutral-500">Photos sélectionnées</p>
                                    </div>
                                ) : (
                                    <Upload size={32} className="text-neutral-300 mb-2" />
                                )}
                                <span className="text-[10px] font-bold uppercase mt-4">Sélectionner des fichiers</span>
                                <input type="file" className="hidden" accept="image/*" multiple onChange={(e) => {
                                    const files = Array.from(e.target.files);
                                    files.forEach(file => {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            const img = new Image();
                                            img.onload = () => {
                                                const maxDimension = 1200;
                                                let width = img.width;
                                                let height = img.height;
                                                if (width > height && width > maxDimension) {
                                                    height = Math.round((height * maxDimension) / width);
                                                    width = maxDimension;
                                                } else if (height > maxDimension) {
                                                    width = Math.round((width * maxDimension) / height);
                                                    height = maxDimension;
                                                }
                                                const canvas = document.createElement('canvas');
                                                canvas.width = width;
                                                canvas.height = height;
                                                const ctx = canvas.getContext('2d');
                                                ctx.drawImage(img, 0, 0, width, height);
                                                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
                                                setNewPhotos(prev => [...prev, { image: compressedBase64 }]);
                                            };
                                            img.src = reader.result;
                                        };
                                        reader.readAsDataURL(file);
                                    });
                                }} />
                            </label>
                            <button type="submit" className="w-full bg-neutral-950 text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors" disabled={newPhotos.length === 0}>
                                Ajouter {newPhotos.length > 0 ? newPhotos.length : ''} photo{newPhotos.length > 1 ? 's' : ''} à la galerie
                            </button>
                            {newPhotos.length > 0 && (
                                <button type="button" onClick={() => setNewPhotos([])} className="w-full bg-rose-600 text-white py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-rose-700 transition-colors">
                                    Vider la sélection
                                </button>
                            )}
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 overflow-y-auto max-h-[400px] p-2 bg-white dark:bg-neutral-900">
                            {photos.map(photo => (
                                <div key={photo.id} className="relative aspect-square border border-neutral-100 dark:border-white/5 group bg-neutral-50 dark:bg-white/5 focus:outline-none" tabIndex="0">
                                    <img src={photo.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-focus:grayscale-0 transition-all duration-700" alt="Galerie" />
                                    <button type="button" onClick={() => deleteItem('photos', photo.id)} className="absolute top-1 right-1 bg-white/90 p-1 text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"><Trash2 size={14} /></button>
                                </div>
                            ))}
                        </div>
                    </form>
                </div>

            </div>
        </section>
    );
};

export default AdminConsole;
