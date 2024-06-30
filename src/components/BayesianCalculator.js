import React, { useState } from 'react';

function BayesianCalculator() {
    const [prior, setPrior] = useState(0);     // P(H)
    const [likelihood, setLikelihood] = useState(0); // P(E|H)
    const [falseLikelihood, setFalseLikelihood] = useState(0); // P(E|H')

    const calculateTotalProbability = () => {
        return likelihood * prior + falseLikelihood * (1 - prior);
    };

    const calculatePosterior = () => {
        const totalProbability = calculateTotalProbability();
        if (totalProbability > 0) {
            return (likelihood * prior) / totalProbability;
        }
        return 0; // 如果全概率为0，则后验概率不可计算
    };

    return (
        <div>
            <h1>贝叶斯后验概率计算器</h1>
            <label>
                先验概率 P(H):
                <input
                    type="number"
                    value={prior}
                    min="0"
                    max="1"
                    step="0.01"
                    onChange={e => setPrior(parseFloat(e.target.value))}
                />
            </label>
            <br />
            <label>
                证据可能性 P(E|H):
                <input
                    type="number"
                    value={likelihood}
                    min="0"
                    max="1"
                    step="0.01"
                    onChange={e => setLikelihood(parseFloat(e.target.value))}
                />
            </label>
            <br />
            <label>
                证伪项 P(E|H'):
                <input
                    type="number"
                    value={falseLikelihood}
                    min="0"
                    max="1"
                    step="0.01"
                    onChange={e => setFalseLikelihood(parseFloat(e.target.value))}
                />
            </label>
            <br />
            <h2>全概率公式计算:</h2>
            <p>P(E) = P(E|H) × P(H) + P(E|H') × (1 - P(H))</p>
            <p>P(E) = {likelihood.toFixed(4)} × {prior.toFixed(4)} + {falseLikelihood.toFixed(4)} × {(1 - prior).toFixed(4)} = {calculateTotalProbability().toFixed(4)}</p>
            <h2>后验概率 P(H|E) = {calculatePosterior().toFixed(4)}</h2>
        </div>
    );
}

export default BayesianCalculator;
