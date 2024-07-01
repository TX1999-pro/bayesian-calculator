import React, { useState } from 'react';
import '../App.css';
import ProbabilityTerm from './ProbabilityTerm';

function BayesianCalculator() {
    const [prior, setPrior] = useState(0.4);     // P(H)
    const [likelihood, setLikelihood] = useState(0.8); // P(E|H)
    const [falseLikelihood, setFalseLikelihood] = useState(0.15); // P(E|H')

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

    const handleInputChange = (setter) => (event) => {
        const value = parseFloat(event.target.value);
        setter(value >= 0 && value <= 1 ? value : 1.0);
    };

    return (
        <div>
            <h1>贝叶斯后验概率计算器</h1>

            <div>
                <p>针对命题H,和新证据E, 请你估测以下概率: </p>
                <label className="先验概率">
                    <input
                        type="number"
                        value={prior}
                        className="先验概率 inputbox"
                        min="0"
                        max="1"
                        step="0.01"
                        onChange={handleInputChange(setPrior)}
                    />
                </label>
                <label className="先验概率">
                    <input
                        type="range"
                        value={prior}
                        min="0"
                        max="1"
                        step="0.001"
                        onChange={handleInputChange(setPrior)}
                    />
                    - 先验概率 P(H)
                </label>
                <br />
                <label className="证据可能性">
                    <input
                        type="number"
                        value={likelihood}
                        className="证据可能性 inputbox"
                        min="0"
                        max="1"
                        step="0.01"
                        onChange={handleInputChange(setLikelihood)}
                    />
                </label>
                <label className="证据可能性">
                    <input
                        type="range"
                        value={likelihood}
                        min="0"
                        max="1"
                        step="0.001"
                        onChange={handleInputChange(setLikelihood)}
                    />
                    - 证据可能性 P(E|H)
                </label>
                <br />
                <label className="证伪项">
                    <input
                        type="number"
                        value={falseLikelihood}
                        className="证伪项 inputbox"
                        min="0"
                        max="1"
                        step="0.01"
                        onChange={handleInputChange(setFalseLikelihood)}
                    />
                </label>
                <label className="证伪项">
                    <input
                        type="range"
                        value={falseLikelihood}
                        min="0"
                        max="1"
                        step="0.001"
                        onChange={handleInputChange(setFalseLikelihood)}
                    />
                    - 证伪项 P(E|H')
                </label>
            </div>
            <hr />
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
                    <ProbabilityTerm label="" value={(prior)} className="先验概率" />
                    {")"}
                </p>
                <p>
                    {'         = '}
                    {calculateTotalProbability().toFixed(4)}
                </p>
            </div>
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
}

export default BayesianCalculator;
