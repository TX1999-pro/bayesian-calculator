// calculationProcess.js
import React from 'react';
import ProbabilityTerm from './ProbabilityTerm'; // Assuming this component is defined elsewhere

const CalculationProcess = ({ prior, likelihood, falseLikelihood }) => {
    // Function to calculate total probability
    const calculateTotalProbability = () => {
        return (likelihood * prior) + (falseLikelihood * (1 - prior));
    };

    // Function to calculate posterior probability
    const calculatePosterior = () => {
        const totalProbability = calculateTotalProbability();
        return (likelihood * prior) / totalProbability;
    };

    return (
        <div className="calculation">
            <h2>下面开始计算</h2>
            <p> 已知： <ProbabilityTerm label="P(H)" value={prior} className="先验概率" /> {" , "}
                <ProbabilityTerm label="P(E|H)" value={likelihood} className="证据可能性" /> {" , "}
                <ProbabilityTerm label="P(E|H')" value={falseLikelihood} className="证伪项" />
            </p>

            <h2>证据普遍性</h2>
            <p><ProbabilityTerm label="P(E)" value={NaN} className="全概率" /> {' = '}
                <ProbabilityTerm label="P(E|H)" value={NaN} className="证据可能性" />
                {' x '} <ProbabilityTerm label="P(H)" value={NaN} className="先验概率" />
                {' + '} <ProbabilityTerm label="P(E|H'))" value={NaN} className="证伪项" />
                {" x (1 - "}
                <ProbabilityTerm label="P(H)" value={NaN} className="先验概率" />
                {")"}
            </p>
            <p>
                {'         = '}
                <ProbabilityTerm label="" value={likelihood} className="证据可能性" />
                {' x '} <ProbabilityTerm label="" value={prior} className="先验概率" />
                {' + '} <ProbabilityTerm label="" value={falseLikelihood} className="证伪项" />
                {" x (1 - "}
                <ProbabilityTerm label="" value={prior} className="先验概率" />
                {")"}
            </p>
            <p>
                {'         = '}
                {calculateTotalProbability().toFixed(4)}
            </p>
            <h2>证据鉴别力 = 证据可能性 / 证据普遍性</h2>
            <p> 证据鉴别力 =
                <ProbabilityTerm label="P(E|H)" value={NaN} className="证据可能性" />  {'/ '}
                <ProbabilityTerm label="P(E)" value={NaN} className="证据普遍性" />
                =
                <ProbabilityTerm label="" value={likelihood} className="证据可能性" />  {'/ '}
                <ProbabilityTerm label="" value={calculateTotalProbability().toFixed(4)} className="证据普遍性" />
                =
                <h2 className="result">{(likelihood / calculateTotalProbability()).toPrecision(4)}</h2>
            </p>
            <h2>后验概率计算 = 先验概率 x （证据鉴别力）</h2>
            <p>
                <ProbabilityTerm label="P(H|E)" value={NaN} className="后验概率" />  {'= '}
                <ProbabilityTerm label="P(H)" value={NaN} className="先验概率" />  {'* '}
                <ProbabilityTerm label="P(E|H)" value={NaN} className="证据可能性" /> {'/ '}
                <ProbabilityTerm label="P(E)" value={NaN} className="证据普遍性" />
            </p>
            <p>
                {'             = '}
                <ProbabilityTerm label="" value={prior} className="先验概率" /> {'* '}
                <ProbabilityTerm label="" value={likelihood} className="证据可能性" /> {'/ '}
                <ProbabilityTerm label="" value={calculateTotalProbability().toFixed(4)} className="证据普遍性" />

            </p>
            <h2> {' = '}
                {calculatePosterior().toPrecision(4)}
            </h2>
        </div>
    );
};

export default CalculationProcess;