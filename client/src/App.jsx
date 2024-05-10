import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Form from './components/forms';
import Header from './layout/header';
import { ListCourses } from './components/courses';
import './scss/App.css';
import { Detail } from './components/detail';
import { ChangeTheme } from './config/changeTheme';
import { Update } from './components/update';


function App() {


  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Header />
          <div className='row'>
            <div className=''>
              <Routes>
                <Route path='/' element={<ListCourses />} />
                <Route path='/forms' element={<Form />} />
                <Route path='/course/detail/:id' element={<Detail />} />
                <Route path='/course/update/:id' element={<Update />} />
              </Routes>
            </div>
          </div>
          <ChangeTheme />
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
