import styled from "styled-components"

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    text-align: center;
    margin: 0 auto;
    align-items: center;
`;

export const WorkersList = styled.div`
    width: 50%;
    @media only screen and (width < 800px){
        width: 80%;
    }
    margin: 20px 0px;
    display: flex;
    flex-direction: column;
    
`;

export const WorkerItem = styled.div`
    width: 100%;
    padding: 2px 0;
    border: 2px solid black;
    font-weight: 600;
    color: rgb(34,51,59);
    background-color: rgb(201,173,167);
    &:nth-child(even){
        background-color: rgb(34,51,59);
        color: rgb(201,173,167);
    }
`;

export const Button = styled.button`
    border: none;
    padding: 10px;
    cursor: pointer;
`;

export const ButtonAdd = styled(Button)`
    background-color: rgb(34,51,59);
    color: rgb(201,173,167);
    margin-left: auto;
`;

export const ButtonDelete = styled(Button)`
    background-color: transparent;
    margin: 0 10px;
    padding: 0;
    color: red;
    font-weight: bolder;
    font-size: larger;

`;

export const ButtonReset = styled(Button)`
    background-color: #afafff;
    padding: 4px;
`;

export const WorkerForm = styled(WorkersList)`
    flex-direction: row;
    @media only screen and (width < 800px){
        flex-direction: column;
        align-items: center;
        button {
            margin-left: 0;
        }
    }
`;

export const Input = styled.input`
    background-color: rgb(201,173,167);
    border: 2px solid;
    padding: 10px;
    margin: 0 10px 10px 0;
    max-width: 200px;
`;

export const InputGender = styled.div`
    font-weight: 600;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const TabList = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 50%;
    @media only screen and (width < 800px){
        width: 80%;
    }
    cursor: pointer;
`;

export const ButtonTab = styled(Button)`
    width: 48%;
    margin-top: 15px;
    border: 2px solid black;
    color: rgb(201,173,167);
    background-color: rgb(34,51,59);
    ${(props) => {
        if (props.name === props["data-active"]) {
            return `
            color: rgb(34,51,59);
            background-color: rgb(201,173,167);
            text-decoration: underline;
            text-transform: uppercase;
            font-weight: bold;
             `;
        }
    }}
`;

export const TaskList = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 0;
    align-items: center;
`;

export const ButtonPlan = styled(Button)`
    width: 10rem;
    background-color: darkgreen;
    color: white;
    border: 2px solid;
    padding: 10px;
    ${(props) => {
        if (props.disabled === true) {
            return `
            color: black;
            background-color: red;
            cursor: default;
             `;
        }
    }}
`;