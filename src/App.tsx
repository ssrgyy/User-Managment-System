import './App.scss';
import React from 'react';
import { AppRouter } from './components/AppRouter';

export const App: React.FC = () => {
    return (
        <div className="App">
            <AppRouter/>
        </div>
    );
}