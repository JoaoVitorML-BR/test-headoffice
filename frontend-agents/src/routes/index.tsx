import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import AgentsList from '../pages/AgentsList';
import AgentForm from '../pages/AgentForm';
import { PrivateRoute } from '../components/PrivateRoute';

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            />
            <Route
                path="/agents"
                element={
                    <PrivateRoute>
                        <AgentsList />
                    </PrivateRoute>
                }
            />
            <Route
                path="/agents/new"
                element={
                    <PrivateRoute>
                        <AgentForm />
                    </PrivateRoute>
                }
            />
            <Route
                path="/agents/:id/edit"
                element={
                    <PrivateRoute>
                        <AgentForm />
                    </PrivateRoute>
                }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}
