import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Splash } from './pages/Splash';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';

// Admin Portals
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminUsers } from './pages/admin/Users';
import { AdminUserDetail } from './pages/admin/UserDetail';
import { AdminTrainers } from './pages/admin/Trainers';
import { AdminPosts } from './pages/admin/Posts';
import { AdminComments } from './pages/admin/Comments';
import { AdminExerciseLibrary } from './pages/admin/ExerciseLibrary';
import { AdminAnalytics } from './pages/admin/Analytics';
import { AdminSettings } from './pages/admin/Settings';

import { ThemeProvider } from './context/ThemeContext';

// Trainer Portals
import { TrainerDashboard } from './pages/trainer/Dashboard';
import { TrainerClients } from './pages/trainer/Clients';
import { TrainerClientDetail } from './pages/trainer/ClientDetail';
import { TrainerPlans } from './pages/trainer/Plans';
import { TrainerPlanEditor } from './pages/trainer/PlanEditor';
import { TrainerMessages } from './pages/trainer/Messages';
import { TrainerProfile } from './pages/trainer/Profile';

// Client Portals
import { ClientDashboard } from './pages/client/Dashboard';
import { ClientFeed } from './pages/client/Feed';
import { ClientSessions } from './pages/client/Sessions';
import { ClientTrainer } from './pages/client/Trainer';
import { ClientGoals } from './pages/client/Goals';
import { ClientProfile } from './pages/client/Profile';
import { ClientProgress } from './pages/client/Progress';
import { ClientNutrition } from './pages/client/Nutrition';
import { ClientMeals } from './pages/client/Meals';
import { ClientPoseAnalysis } from './pages/client/PoseAnalysis';

// Shared Portals
import { SharedExercises } from './pages/shared/Exercises';
const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, profile, loading } = useAuth();

  if (loading) return <div className="splash-container"><div className="loader"></div></div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!profile) {
    return <Navigate to="/" replace />;
  }
  
  const userRole = profile.role || 'client';
  
  if (userRole !== allowedRole) {
    return <Navigate to="/" replace />; // Let splash redirect to correct dashboard
  }

  return children;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute allowedRole="admin"><AdminUsers /></ProtectedRoute>} />
          <Route path="/admin/users/:id" element={<ProtectedRoute allowedRole="admin"><AdminUserDetail /></ProtectedRoute>} />
          <Route path="/admin/trainers" element={<ProtectedRoute allowedRole="admin"><AdminTrainers /></ProtectedRoute>} />
          <Route path="/admin/content" element={<ProtectedRoute allowedRole="admin"><AdminPosts /></ProtectedRoute>} />
          <Route path="/admin/content/comments" element={<ProtectedRoute allowedRole="admin"><AdminComments /></ProtectedRoute>} />
          <Route path="/admin/exercise-library" element={<ProtectedRoute allowedRole="admin"><AdminExerciseLibrary /></ProtectedRoute>} />
          <Route path="/admin/analytics" element={<ProtectedRoute allowedRole="admin"><AdminAnalytics /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute allowedRole="admin"><AdminSettings /></ProtectedRoute>} />
          
          {/* Trainer Routes */}
          <Route path="/trainer" element={<ProtectedRoute allowedRole="trainer"><TrainerDashboard /></ProtectedRoute>} />
          <Route path="/trainer/clients" element={<ProtectedRoute allowedRole="trainer"><TrainerClients /></ProtectedRoute>} />
          <Route path="/trainer/clients/:clientId" element={<ProtectedRoute allowedRole="trainer"><TrainerClientDetail /></ProtectedRoute>} />
          <Route path="/trainer/plans" element={<ProtectedRoute allowedRole="trainer"><TrainerPlans /></ProtectedRoute>} />
          <Route path="/trainer/plans/:planId" element={<ProtectedRoute allowedRole="trainer"><TrainerPlanEditor /></ProtectedRoute>} />
          <Route path="/trainer/messages" element={<ProtectedRoute allowedRole="trainer"><TrainerMessages /></ProtectedRoute>} />
          <Route path="/trainer/profile" element={<ProtectedRoute allowedRole="trainer"><TrainerProfile /></ProtectedRoute>} />
          <Route path="/trainer/exercises" element={<ProtectedRoute allowedRole="trainer"><SharedExercises role="trainer" /></ProtectedRoute>} />
          
          {/* Client Routes */}
          <Route path="/client" element={<Navigate to="/client/feed" replace />} />
          <Route path="/client/feed" element={<ProtectedRoute allowedRole="client"><ClientFeed /></ProtectedRoute>} />
          <Route path="/client/sessions" element={<ProtectedRoute allowedRole="client"><ClientSessions /></ProtectedRoute>} />
          <Route path="/client/progress" element={<ProtectedRoute allowedRole="client"><ClientProgress /></ProtectedRoute>} />
          <Route path="/client/trainer" element={<ProtectedRoute allowedRole="client"><ClientTrainer /></ProtectedRoute>} />
          <Route path="/client/goals" element={<ProtectedRoute allowedRole="client"><ClientGoals /></ProtectedRoute>} />
          <Route path="/client/profile" element={<ProtectedRoute allowedRole="client"><ClientProfile /></ProtectedRoute>} />
          <Route path="/client/exercises" element={<ProtectedRoute allowedRole="client"><SharedExercises role="client" /></ProtectedRoute>} />
          <Route path="/client/nutrition" element={<ProtectedRoute allowedRole="client"><ClientNutrition /></ProtectedRoute>} />
          <Route path="/client/meals" element={<ProtectedRoute allowedRole="client"><ClientMeals /></ProtectedRoute>} />
          <Route path="/client/pose-analysis" element={<ProtectedRoute allowedRole="client"><ClientPoseAnalysis /></ProtectedRoute>} />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
