import './App.scss';
import React from 'react';
import { RequestStatus } from './components/RequestStatus';
import { AuthProvider } from './components/AuthProvider';
import { UserManager } from './components/UserManager';
import { AppRouter } from './components/AppRouter';

export const App: React.FC = () => {
    return (
        <div className="App">
            <RequestStatus>
                <AuthProvider>
                    <UserManager>
                        <AppRouter/>
                    </UserManager>
                </AuthProvider>
            </RequestStatus>
        </div>
    );
}