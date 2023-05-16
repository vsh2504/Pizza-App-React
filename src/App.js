// Root component
// We can create components in react in 2 ways (Class components & Functional components)

// Import libs
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navigation from './components/Navigation';

// Functional component
// Name of func in capital and same as file name
const App = () => {
    // return the JSX from the function
    // It can only return only a single elem
    // Add a wrapper of div or we can use react framgments (<> tag)
    return (
        <>
            <Router>
                {/* Navbar */}
                <Navigation />
                <Routes>
                    {/* Each component in React takes html attributes called props or properties */}
                    <Route path="/" element={<Home />} exact></Route>
                    <Route path="/about" element={<About />}></Route>
                </Routes>
            </Router>
        </>
    )
}

export default App;