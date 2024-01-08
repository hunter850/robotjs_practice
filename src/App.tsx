import AllProviders from "./contexts/AllProviders";
import Home from "./components/Home";

function App(): JSX.Element {
    return (
        <AllProviders>
            <Home />
        </AllProviders>
    );
}

export default App;
