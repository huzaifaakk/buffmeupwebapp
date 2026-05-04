import React, { useState, useEffect } from 'react';
import { ClientLayout } from '../client/Sessions';
import { SidebarLayout } from '../../components/ui/Layouts';
import { trainerLinks } from '../trainer/Dashboard';
import { useYMove } from '../../hooks/useYMove';
import { Search } from 'lucide-react';

export const SharedExercises = ({ role }) => {
  const { getExercises, loading, error } = useYMove();
  const [exercises, setExercises] = useState([]);
  const [search, setSearch] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  
  const muscleGroups = ['chest', 'back', 'legs', 'shoulders', 'arms', 'core', 'full_body'];

  const fetchExercises = async () => {
    const data = await getExercises({
      q: search,
      muscleGroup: muscleGroup,
      limit: 20
    });
    if (data && data.data) {
      setExercises(data.data);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, [muscleGroup]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchExercises();
  };

  const content = (
    <div className="exercises-container p-6 bg-card border rounded-md">
      <h2 className="text-2xl mb-6">Exercise Library</h2>
      
      <form onSubmit={handleSearch} className="filters flex gap-4 mb-6">
        <div className="flex-1 relative">
          <input 
            type="text" 
            placeholder="Search exercises..." 
            className="w-full bg-sidebar border rounded-md p-3 pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-secondary" size={20} />
        </div>
        <select 
          className="bg-sidebar border rounded-md p-3"
          value={muscleGroup}
          onChange={(e) => setMuscleGroup(e.target.value)}
        >
          <option value="">All Muscles</option>
          {muscleGroups.map(m => (
            <option key={m} value={m}>{m.replace('_', ' ').toUpperCase()}</option>
          ))}
        </select>
        <button type="submit" className="bg-accent-primary text-white px-6 rounded-md font-medium">Search</button>
      </form>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-md mb-6 text-center">
          Error: {error}. Check console and verify API key in .env
        </div>
      )}

      {loading ? (
        <div className="text-center p-10 text-secondary">Loading exercises...</div>
      ) : (
        <div className="exercises-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map(ex => (
            <div 
              key={ex.id} 
              className="exercise-card bg-sidebar border rounded-md overflow-hidden fade-in cursor-pointer hover-glow"
              onClick={() => setExpandedId(expandedId === ex.id ? null : ex.id)}
            >
              {ex.videoUrl ? (
                <video 
                  src={ex.videoUrl} 
                  poster={ex.thumbnailUrl} 
                  controls 
                  className="w-full aspect-video object-cover"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : ex.thumbnailUrl ? (
                <img src={ex.thumbnailUrl} alt={ex.title} className="w-full aspect-video object-cover" />
              ) : (
                <div className="w-full aspect-video bg-card flex items-center justify-center text-secondary">No Video</div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{ex.title}</h3>
                <p className="text-sm text-secondary mb-2">
                  Target: {ex.muscleGroup?.replace('_', ' ')} | Type: {ex.exerciseType?.join(', ')}
                </p>
                <div className={`text-sm text-secondary ${expandedId === ex.id ? '' : 'line-clamp-3'}`} dangerouslySetInnerHTML={{ __html: ex.instructions || '' }} />
                {ex.instructions && expandedId !== ex.id && (
                  <div className="text-accent-primary text-sm mt-2 font-medium">Click to view full instructions</div>
                )}
                {ex.instructions && expandedId === ex.id && (
                  <div className="text-accent-primary text-sm mt-2 font-medium">Click to collapse</div>
                )}
              </div>
            </div>
          ))}
          {exercises.length === 0 && !loading && (
            <div className="col-span-full text-center p-10 text-secondary border rounded-md border-dashed">
              No exercises found.
            </div>
          )}
        </div>
      )}

      <style>{`
        .bg-card { background-color: var(--bg-card); }
        .bg-sidebar { background-color: var(--bg-color); }
        .bg-accent-primary { background-color: var(--accent-primary); }
        .border { border: 1px solid var(--border-color); }
        .border-dashed { border-style: dashed; }
        .rounded-md { border-radius: var(--radius-card); }
        .p-6 { padding: 1.5rem; }
        .p-4 { padding: 1rem; }
        .p-3 { padding: 0.75rem; }
        .p-10 { padding: 2.5rem; }
        .pl-10 { padding-left: 2.5rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-1 { margin-bottom: 0.25rem; }
        .flex { display: flex; }
        .gap-4 { gap: 1rem; }
        .gap-6 { gap: 1.5rem; }
        .grid { display: grid; }
        .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
        @media (min-width: 768px) { .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (min-width: 1024px) { .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
        .col-span-full { grid-column: 1 / -1; }
        .w-full { width: 100%; }
        .relative { position: relative; }
        .absolute { position: absolute; }
        .left-3 { left: 0.75rem; }
        .top-3 { top: 0.75rem; }
        .text-2xl { font-size: 1.5rem; font-weight: 600; margin: 0; }
        .text-lg { font-size: 1.125rem; }
        .text-sm { font-size: 0.875rem; }
        .text-secondary { color: var(--text-secondary); }
        .text-white { color: white; }
        .text-center { text-align: center; }
        .font-semibold { font-weight: 600; }
        .font-medium { font-weight: 500; }
        .overflow-hidden { overflow: hidden; }
        .aspect-video { aspect-ratio: 16 / 9; }
        .object-cover { object-fit: cover; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .items-center { align-items: center; }
        .justify-center { justify-content: center; }
        .flex-1 { flex: 1; }
        .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
      `}</style>
    </div>
  );

  if (role === 'trainer') {
    return (
      <SidebarLayout title="Exercises" links={trainerLinks}>
        {content}
      </SidebarLayout>
    );
  }

  return (
    <ClientLayout activePath="/client/exercises">
      {content}
    </ClientLayout>
  );
};
