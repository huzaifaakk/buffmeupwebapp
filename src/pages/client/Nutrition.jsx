import React, { useState } from 'react';
import { ClientLayout } from './Sessions';
import { useYMove } from '../../hooks/useYMove';
import { Search, Utensils, Apple } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const ClientNutrition = () => {
  const { searchFoods, generateMealPlan, loading, error } = useYMove();
  const [activeTab, setActiveTab] = useState('tracker');
  
  // Tracker State
  const [foodQuery, setFoodQuery] = useState('');
  const [foods, setFoods] = useState([]);
  
  // Meal Plan State
  const [calories, setCalories] = useState(2000);
  const [diet, setDiet] = useState('balanced');
  const [mealPlan, setMealPlan] = useState(null);

  const handleSearchFoods = async (e) => {
    e.preventDefault();
    if (!foodQuery.trim()) return;
    const data = await searchFoods(foodQuery);
    if (data && data.data) {
      setFoods(data.data);
    }
  };

  const handleGenerateMealPlan = async (e) => {
    e.preventDefault();
    const data = await generateMealPlan({ calories, diet });
    if (data && data.data) {
      setMealPlan(data.data);
    }
  };

  return (
    <ClientLayout activePath="/client/nutrition">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        
        {/* Header & Tabs */}
        <div className="bg-card border rounded-md p-6 fade-in flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-1">Nutrition Hub</h2>
            <p className="text-secondary">Track your macros and generate meal plans.</p>
          </div>
          <div className="flex bg-sidebar rounded-md border p-1">
            <button 
              className={`px-4 py-2 rounded ${activeTab === 'tracker' ? 'bg-accent-primary text-white' : 'text-secondary hover:text-white'}`}
              onClick={() => setActiveTab('tracker')}
            >
              Food Tracker
            </button>
            <button 
              className={`px-4 py-2 rounded ${activeTab === 'meals' ? 'bg-accent-primary text-white' : 'text-secondary hover:text-white'}`}
              onClick={() => setActiveTab('meals')}
            >
              Meal Plans
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-md mb-2 text-center">
            Error: {error}. Check console and verify API key in .env
          </div>
        )}

        {/* Content Area */}
        {activeTab === 'tracker' && (
          <div className="bg-card border rounded-md p-6 fade-in">
            <h3 className="text-xl mb-4 flex items-center gap-2"><Apple className="text-accent-primary" /> Search Database</h3>
            <form onSubmit={handleSearchFoods} className="flex gap-4 mb-8">
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  placeholder="E.g., Chicken Breast, Banana..." 
                  className="w-full bg-sidebar border rounded-md p-3 pl-10"
                  value={foodQuery}
                  onChange={(e) => setFoodQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-3 text-secondary" size={20} />
              </div>
              <Button type="submit" disabled={loading}>Search</Button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {loading && foods.length === 0 ? (
                <div className="col-span-full text-center p-10 text-secondary">Searching foods...</div>
              ) : foods.length > 0 ? (
                foods.map((food, i) => (
                  <div key={i} className="bg-sidebar border rounded-md p-4 flex justify-between items-center hover-glow">
                    <div>
                      <h4 className="font-medium text-lg">{food.displayName || food.shortName || food.name}</h4>
                      <p className="text-sm text-secondary">
                        {food.servingDescription || `${food.servingSize}g`}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-accent-primary">{food.calories} kcal</div>
                      <div className="text-xs text-secondary">
                        P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center p-10 border border-dashed rounded-md text-secondary">
                  No foods found. Try searching for something above!
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'meals' && (
          <div className="bg-card border rounded-md p-6 fade-in">
            <h3 className="text-xl mb-4 flex items-center gap-2"><Utensils className="text-accent-primary" /> Generate Meal Plan</h3>
            <form onSubmit={handleGenerateMealPlan} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div>
                <label className="block text-sm text-secondary mb-1">Target Calories</label>
                <input 
                  type="number" 
                  className="w-full bg-sidebar border rounded-md p-3"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm text-secondary mb-1">Diet Preference</label>
                <select 
                  className="w-full bg-sidebar border rounded-md p-3"
                  value={diet}
                  onChange={(e) => setDiet(e.target.value)}
                >
                  <option value="balanced">Balanced</option>
                  <option value="high_protein">High Protein</option>
                  <option value="low_carb">Low Carb</option>
                  <option value="keto">Keto</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button type="submit" disabled={loading} className="w-full h-12">
                  {loading ? 'Generating...' : 'Generate Plan'}
                </Button>
              </div>
            </form>

            {mealPlan && (
              <div className="meal-plan-results fade-in">
                <div className="mb-6 p-4 border rounded-md bg-sidebar text-center">
                  <h4 className="text-lg font-semibold text-accent-primary">Daily Totals</h4>
                  <p className="text-secondary text-sm">
                    {mealPlan.calories} kcal | Protein: {mealPlan.protein}g | Carbs: {mealPlan.carbs}g | Fat: {mealPlan.fat}g
                  </p>
                </div>
                
                <div className="space-y-4">
                  {mealPlan.meals?.map((meal, index) => (
                    <div 
                      key={index} 
                      className="border rounded-md overflow-hidden bg-card transition-all group"
                    >
                      <div className="p-4 border-b bg-sidebar flex justify-between items-center">
                        <h5 className="font-semibold">{meal.type || `Meal ${index + 1}`}</h5>
                        <span className="text-sm font-medium text-accent-primary">{meal.calories} kcal</span>
                      </div>
                      <div className="p-4">
                        <h6 className="font-medium mb-1 group-hover:text-accent-primary transition-colors">{meal.recipe?.title || meal.name}</h6>
                        <p className="text-sm text-secondary mb-3">
                          Prep time: {meal.recipe?.readyInMinutes || '?'} mins | Servings: {meal.recipe?.servings || 1}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
      <style>{`
        .bg-card { background-color: var(--bg-card); }
        .bg-sidebar { background-color: var(--bg-color); }
        .bg-accent-primary { background-color: var(--accent-primary); }
        .border { border: 1px solid var(--border-color); }
        .border-dashed { border-style: dashed; }
        .border-b { border-bottom: 1px solid var(--border-color); }
        .rounded-md { border-radius: var(--radius-card); }
        .rounded { border-radius: 0.25rem; }
        .p-6 { padding: 1.5rem; }
        .p-4 { padding: 1rem; }
        .p-3 { padding: 0.75rem; }
        .p-1 { padding: 0.25rem; }
        .px-4 { padding-left: 1rem; padding-right: 1rem; }
        .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
        .pl-10 { padding-left: 2.5rem; }
        .mb-1 { margin-bottom: 0.25rem; }
        .mb-3 { margin-bottom: 0.75rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-8 { margin-bottom: 2rem; }
        .mt-2 { margin-top: 0.5rem; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .max-w-6xl { max-width: 72rem; }
        .w-full { width: 100%; }
        .h-12 { height: 3rem; }
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .flex-1 { flex: 1; }
        .grid { display: grid; }
        .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
        @media (min-width: 768px) {
          .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }
        .gap-2 { gap: 0.5rem; }
        .gap-4 { gap: 1rem; }
        .gap-6 { gap: 1.5rem; }
        .space-y-4 > * + * { margin-top: 1rem; }
        .justify-between { justify-content: space-between; }
        .items-center { align-items: center; }
        .items-end { align-items: flex-end; }
        .relative { position: relative; }
        .absolute { position: absolute; }
        .left-3 { left: 0.75rem; }
        .top-3 { top: 0.75rem; }
        .text-2xl { font-size: 1.5rem; }
        .text-xl { font-size: 1.25rem; }
        .text-lg { font-size: 1.125rem; }
        .text-sm { font-size: 0.875rem; }
        .text-xs { font-size: 0.75rem; }
        .font-bold { font-weight: 700; }
        .font-semibold { font-weight: 600; }
        .font-medium { font-weight: 500; }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .text-white { color: white; }
        .text-secondary { color: var(--text-secondary); }
        .text-accent-primary { color: var(--accent-primary); }
        .hover\\:text-white:hover { color: white; }
        .hover\\:underline:hover { text-decoration: underline; }
        .block { display: block; }
        .overflow-hidden { overflow: hidden; }
        .hover-glow { transition: all 0.2s; }
        .hover-glow:hover { border-color: var(--accent-primary); box-shadow: 0 0 10px rgba(0, 210, 255, 0.1); }
      `}</style>
    </ClientLayout>
  );
};
