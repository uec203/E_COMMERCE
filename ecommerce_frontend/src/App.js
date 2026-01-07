
import './App.css';

import { Route, Routes } from 'react-router-dom';
import CustomerRoutes from './Routes/CustomerRoutes';
import { Provider } from 'react-redux';
import { store } from './State/store';
import AdminRoutes from './Routes/AdminRoutes';

function App() {
  return (
    <div className="App">
    <Provider store={store}>
    <Routes>
      <Route path='/*' element={<CustomerRoutes/>}></Route>
      <Route path='/admin/*' element={<AdminRoutes/>}></Route>
    </Routes>
    </Provider>
    </div>
  );
}

export default App;
