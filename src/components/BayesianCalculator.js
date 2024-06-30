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

    return (
        <div>
            <h1>贝叶斯后验概率计算器</h1>
            <div>
                <p>针对命题H,和新证据E, 请你估测以下概率: </p>
                <label className="先验概率">
                    先验概率 P(H):
                    <input
                        type="number"
                        value={prior}
                        className="先验概率"
                        min="0"
                        max="1"
                        step="0.01"
                        onChange={e => setPrior(parseFloat(e.target.value))}
                    />
                </label>
                <br />
                <label className="证据可能性">
                    证据可能性 P(E|H):
                    <input
                        type="number"
                        value={likelihood}
                        className="证据可能性"
                        min="0"
                        max="1"
                        step="0.01"
                        onChange={e => setLikelihood(parseFloat(e.target.value))}
                    />
                </label>
                <br />
                <label className="证伪项">
                    证伪项 P(E|H'):
                    <input
                        type="number"
                        value={falseLikelihood}
                        className="证伪项"
                        min="0"
                        max="1"
                        step="0.01"
                        onChange={e => setFalseLikelihood(parseFloat(e.target.value))}
                    />
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
            {/* <p>P(E) = P(E|H) × P(H) + P(E|H') × (1 - P(H))</p>
                <p>
                    {'       '}
                    = {likelihood.toFixed(4)} × {prior.toFixed(4)} + {falseLikelihood.toFixed(4)} × {(1 - prior).toFixed(4)}

                </p>
                <p>
                    {'       '}
                    = {calculateTotalProbability().toFixed(4)}
                </p> */}
            {/* <div>
                <p>换一种表示方法就是:</p>
                <p>
                    <ProbabilityTerm label="P(E)" value={NaN} className="全概率" />
                    =
                    <ProbabilityTerm label="P(E|H)" value={likelihood} className="证据可能性" />
                    <ProbabilityTerm label=" * P(H)" value={prior} className="先验概率" />
                    <ProbabilityTerm label=" + P(E|H'))" value={falseLikelihood} className="证伪项" />
                    {" x (1 - "}
                    <ProbabilityTerm label="P(H)" value={NaN} className="先验概率" />
                    {")"}
                    <ProbabilityTerm label="" value={(falseLikelihood * (1 - prior)).toFixed(4)} />
                    = {calculateTotalProbability().toFixed(4)}
                </p>
            </div> */}
            <h2>证据鉴别力 = 证据可能性 / 证据普遍性</h2>
            <p> 证据鉴别力 =
                <ProbabilityTerm label="P(E|H)" value={NaN} className="证据可能性" />  {'/ '}
                <ProbabilityTerm label="P(E)" value={NaN} className="证据普遍性" />
                =
                <ProbabilityTerm label="" value={likelihood} className="证据可能性" />  {'/ '}
                <ProbabilityTerm label="" value={calculateTotalProbability().toFixed(4)} className="证据普遍性" />
                =
                <h2 className="result">{(likelihood / calculateTotalProbability()).toFixed(4)}</h2>
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
                {calculatePosterior().toFixed(4)}
            </h2>
        </div>
    );
}

export default BayesianCalculator;
