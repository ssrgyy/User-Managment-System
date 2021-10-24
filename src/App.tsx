import './App.scss';
import React from 'react';
import { AppRouter } from './components/AppRouter';
import { AuthProvider } from './components/AuthProvider';

export const App: React.FC = () => {
    return (
        <div className="App">
            <AuthProvider>
                <AppRouter/>
            </AuthProvider>
        </div>
    );
}