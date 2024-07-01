import React, { useState } from 'react';
import CalculationProcess from './CalculationProcess'; // Import CalculationProcess
import SessionTabs from './SessionTabs';

function BayesianCalculator2() {
    // Initial state for a single session
    const initialSession = {
        prior: 0.4,
        likelihood: 0.8,
        falseLikelihood: 0.15,
    };

    // State to hold all sessions
    const [sessions, setSessions] = useState([initialSession]);
    // State to track the current session index
    const [currentSessionIndex, setCurrentSessionIndex] = useState(0);

    // Derived state for the current session
    const currentSession = sessions[currentSessionIndex];

    // Function to add a new session
    const addSession = () => {
        const newSession = { ...initialSession }; // Or any other default values
        setSessions([...sessions, newSession]);
        setCurrentSessionIndex(sessions.length); // Switch to the new session
    };

    // Function to switch sessions
    const switchSession = (index) => {
        setCurrentSessionIndex(index);
    };

    // Function to update the current session's state
    const updateCurrentSession = (key, value) => {
        const updatedSessions = sessions.map((session, index) =>
            index === currentSessionIndex ? { ...session, [key]: value } : session
        );
        setSessions(updatedSessions);
    };

    // Handlers for input changes
    const handleInputChange = (key) => (event) => {
        updateCurrentSession(key, parseFloat(event.target.value));
    };

    const deleteSession = (index) => {
        const newSessions = sessions.filter((_, i) => i !== index);
        setSessions(newSessions);
        // Update current session index. Set to 0 or the last session if the current session is deleted.
        if (currentSessionIndex >= newSessions.length) {
            setCurrentSessionIndex(newSessions.length - 1);
        }
    };

    return (
        <div className="widget">
            <h1>贝叶斯后验概率计算器</h1>
            <SessionTabs
                sessions={sessions}
                currentSessionIndex={currentSessionIndex}
                switchSession={switchSession}
                deleteSession={deleteSession}
                addSession={addSession}
            />
            <div>
                <div className="userInput">
                    <p>针对某个命题H,和新证据E, 请你估测以下概率: </p>
                    <label className="先验概率">
                        <input
                            type="number"
                            value={currentSession.prior}
                            className="先验概率 inputbox"
                            min="0"
                            max="1"
                            step="0.01"
                            onChange={handleInputChange('prior')}
                        />
                    </label>
                    <label className="先验概率">
                        <input
                            type="range"
                            value={currentSession.prior}
                            min="0"
                            max="1"
                            step="0.001"
                            onChange={handleInputChange('prior')}
                        />
                        - 先验概率 P(H)
                    </label>
                    <br />
                    <label className="证据可能性">
                        <input
                            type="number"
                            value={currentSession.likelihood}
                            className="证据可能性 inputbox"
                            min="0"
                            max="1"
                            step="0.01"
                            onChange={handleInputChange('likelihood')}
                        />
                    </label>
                    <label className="证据可能性">
                        <input
                            type="range"
                            value={currentSession.likelihood}
                            min="0"
                            max="1"
                            step="0.001"
                            onChange={handleInputChange('likelihood')}
                        />
                        - 证据可能性 P(E|H)
                    </label>
                    <br />
                    <label className="证伪项">
                        <input
                            type="number"
                            value={currentSession.falseLikelihood}
                            className="证伪项 inputbox"
                            min="0"
                            max="1"
                            step="0.01"
                            onChange={handleInputChange("falseLikelihood")}
                        />
                    </label>
                    <label className="证伪项">
                        <input
                            type="range"
                            value={currentSession.falseLikelihood}
                            min="0"
                            max="1"
                            step="0.001"
                            onChange={handleInputChange("falseLikelihood")}
                        />
                        - 证伪项 P(E|H')
                    </label>
                </div>
                <CalculationProcess
                    prior={currentSession.prior}
                    likelihood={currentSession.likelihood}
                    falseLikelihood={currentSession.falseLikelihood}
                />
            </div>
        </div>
    );
}

export default BayesianCalculator2;