import './App.scss';
import {useState} from 'react';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';
import {ToastContainer, toast} from 'react-toastify';
import Home from './components/Home';
import {Routes, Route, Link} from 'react-router-dom';
import TableUsers from './components/TableUser';
import Login from './components/Login';
function App() {
  return (
    <>
    <div className="app-container">
      <Header/>
      <Container>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/users" element={<TableUsers/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Container>
    </div>
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    </>
  );
}
export default App;
