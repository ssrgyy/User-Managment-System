import './App.scss';
import React from 'react';
import { AppRouter } from './components/AppRouter';
import { AuthProvider } from './components/AuthProvider';
import { UserManager } from './components/UserManager';

export const App: React.FC = () => {
    return (
        <div className="App">
            <AuthProvider>
                <UserManager>
                    <AppRouter/>
                </UserManager>
            </AuthProvider>
        </div>
    );
}