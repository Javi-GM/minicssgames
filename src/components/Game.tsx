import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface BallProps {
    ballYAxis: number;
}

export const Game = () => {

    const [inputValue, setInputValue] = useState('');
    const [cssRule, setCssRule] = useState({});
    const [ballYAxis, setBallYAxis] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);

    const ballRef = useRef<HTMLDivElement>(null);
    const block1 = useRef<HTMLDivElement>(null);
    const finishLine = useRef<HTMLDivElement>(null);

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const transformStringWithHyphensToCamelCase = (inputValue: string) => {
        return inputValue.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    }

    const areColliding = (ball: HTMLDivElement | null, block: HTMLDivElement | null) => {
        if (!ball || !block) return false;

        const ballRect = ball.getBoundingClientRect();
        const blockRect = block.getBoundingClientRect();
        return !(
            ballRect.bottom < blockRect.top ||
            ballRect.top > blockRect.bottom ||
            ballRect.right < blockRect.left ||
            ballRect.left > blockRect.right
        );
    }

    useEffect(() => {
        if (!inputValue) return;

        const [rule, value] = inputValue.replace(";", "").split(':');

        setCssRule({
            [transformStringWithHyphensToCamelCase(rule?.trim())]: value?.trim() 
        });
    }, [inputValue]);

    useLayoutEffect(() => {
        if (gameOver || gameWon) return;

        const listener = setInterval(() => {
            setBallYAxis(prev => prev + 1);
            const isGameOver = areColliding(ballRef.current, block1.current);
            const isGameWon = areColliding(ballRef.current, finishLine.current);
            setGameOver(isGameOver);
            setGameWon(isGameWon);
        }, 100);

        return () => clearInterval(listener);

    }, [gameOver, gameWon]);

    return (<>
        { gameOver ? 
            (<h1> Game Over </h1>) :
            
            (<div>

                <Field >
                    <Ball ballYAxis={ballYAxis} ref={ballRef}/>
                    <div></div>
                    <MainBlock style={{
                        ...cssRule,
                    }}>
                        <Block ref={block1}>
                        </Block>
                        <Block>
                        </Block>
                    </MainBlock>
                    <FinishLine ref={finishLine}/>
                </Field>
                <h1> {gameWon ? "You Won!" : "Keep going!"} </h1>

                <input 
                    type="text" 
                    value={inputValue} 
                    onChange={onInputChange}
                />

            </div>) 
        }
    </>);
}

const Field = styled.div`
    width: 400px;
    height: 650px;
    background-color: lightgray;
    display: flex;;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    position: relative;
`;

const MainBlock = styled.div`
    border-color: red;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    gap: 2px;

`;

const Block = styled.div`
    background-color: blue;
    height: 100%;
    border-radius: 4px;
    width: 120px;
`;

const Ball = styled.div<BallProps>`
    background-color: red;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    position: absolute;
    top: ${props => props.ballYAxis}%;
    left: 50%;
    transform: translateX(-50%);
`;

const FinishLine = styled.div`
    height: 1px;
    width: 100%;
`;
