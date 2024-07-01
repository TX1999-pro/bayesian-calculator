// SessionTabs.js
import React from 'react';
import deleteIcon from '../assets/icon_delete.png';

const SessionTabs = ({ sessions, currentSessionIndex, switchSession, deleteSession, addSession }) => {
    return (
        <div className="sessionTabsContainer">
            <button
                className="addButton"
                onClick={addSession}
            > 新的计算
            </button>
            {sessions.map((session, index) => (
                <div key={index}
                    className="sessionTab"
                    style={{
                        backgroundColor: currentSessionIndex === index ? '#f0f0f0' : 'transparent'
                    }}>
                    <button className="sessionButton" onClick={() => switchSession(index)}>
                        情景 {index + 1}
                    </button>
                    {sessions.length > 1 && (
                        <button className="deleteButton" onClick={() => deleteSession(index)}>
                            <img src={deleteIcon} alt="Delete" className="deleteIcon" />
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};


export default SessionTabs;