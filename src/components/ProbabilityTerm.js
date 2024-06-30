import React from 'react';

function ProbabilityTerm({ label, value, className }) {
    if (isNaN(value)) {
        return (
            <span className={className}>
                <strong>{label}</strong>
            </span>
        )
    }
    if (label === "") {
        return (
            <span className={className}>
                <span>{value}</span>
            </span>
        )
    }
    return (
        <span className={className}>
            <strong>{label}</strong> =  <span>{value}</span>
        </span>
    );
}

export default ProbabilityTerm;