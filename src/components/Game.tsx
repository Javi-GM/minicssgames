import { useEffect, useState } from 'react';
import styled from 'styled-components';

export const Game = () => {

    const [inputValue, setInputValue] = useState('');
    const [cssRule, setCssRule] = useState({});

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const transformStringWithHyphensToCamelCase = (inputValue: string) => {
        return inputValue.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    }

    useEffect(() => {
        if (!inputValue) return;

        const [rule, value] = inputValue.replace(";", "").split(':');

        setCssRule({
            [transformStringWithHyphensToCamelCase(rule?.trim())]: value?.trim() 
        });
    }, [inputValue]);

    return (
        <div>
            <Field >
                <MainBlock style={{
                    ...cssRule,
                }}>
                    <Block>
                    </Block>
                    <Block>
                    </Block>
                </MainBlock>
            </Field>
            <input 
                type="text" 
                value={inputValue} 
                onChange={onInputChange}
            />
            <code> { JSON.stringify(inputValue) } </code>
            <code> { JSON.stringify(cssRule) } </code>
        </div>
    );
}

const Field = styled.div`
    width: 400px;
    height: 650px;
    background-color: lightgray;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px;
`;

const MainBlock = styled.div`
    background-color: white;
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
