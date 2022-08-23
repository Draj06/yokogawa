import NavBar from './Components/NavBar';
import Dashboard from './View/Dashboard';
import { GlobaldProvider } from './Context/CommanCOntext';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './App.css';

function App() {
	return (
		<GlobaldProvider>
			<div className="App">
				<NavBar />
				<Dashboard />
			</div>
		</GlobaldProvider>
	);
}

export default App;
