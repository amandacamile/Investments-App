import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import StockList from "./pages/StockList";

const App = () => {
  return (
      <Routes>
        <Route exact path="/" element={ <Login /> } />
        <Route path="/stocks" element={ <StockList /> } />
      </Routes>
  )
}

export default App;