import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import AgentsList from '../features/agents/pages/AgentsList';
import AgentForm from '../features/agents/pages/AgentForm';
import UsersList from '../features/users/pages/UsersList';
import UserForm from '../features/users/pages/UserForm';
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
            <Route
                path="/users"
                element={
                    <PrivateRoute>
                        <UsersList />
                    </PrivateRoute>
                }
            />
            <Route
                path="/users/new"
                element={
                    <PrivateRoute>
                        <UserForm />
                    </PrivateRoute>
                }
            />
            <Route
                path="/users/:id/edit"
                element={
                    <PrivateRoute>
                        <UserForm />
                    </PrivateRoute>
                }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}
