import { Fragment } from "react";
// utils
const { ipcRenderer } = window.electron;

function Home(): JSX.Element {
    async function clickHandler() {
        console.log("start");
        await ipcRenderer.invoke("move-mouse");
        console.log("end");
    }
    return (
        <Fragment>
            <h1>Home</h1>
            <button onClick={clickHandler}>click</button>
        </Fragment>
    );
}

export default Home;
