import logo from './logo.svg';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import './App.css';
import Categories from './components/Categories';
import Place from './components/Place';
import Login from './components/Login';
import Signup from './components/Signup';
import React,{useState, useEffect} from "react"
import PrivateRoute from './components/PrivateRoute';

export const UserContext = React.createContext();

function App() {
    const [userData,setUserData] = useState({});
    const [loading,setLoading] = useState(true);


    const updateUserData = (action) =>{
        switch (action.type) {
            case "LOGOUT":
                setUserData(null);
                localStorage.clear();
                break;
            case "LOGIN":
                setUserData(action.payload);
                break;
            default:
                break;
        }
    }
    useEffect(() =>{
        setUserData(JSON.parse(localStorage.getItem("user_data")))
        setLoading(false);
    },[]);
    return loading ?(<h1>Loading</h1>
    ) : (
        <>  
            <UserContext.Provider value={{ userData, updateUserData }}>
            <Router>
                <Routes>
                    <Route path='auth/create/' element={<Signup />}/>
                    <Route path='auth/login/' element={<Login />}/>
                    <Route path='/' element={<Categories />}/>
                    <Route path='places/:id/' element={<PrivateRoute/>} />
                </Routes>
            </Router>
            </UserContext.Provider>
        </>
  );
}

export default App;
