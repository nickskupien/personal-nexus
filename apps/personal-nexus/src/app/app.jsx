import Home from '../modules/Home'
import { Route, Routes, Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../theme'

export function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* START: routes */}
      {/* <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div> */}
      <Routes>
        <Route
          path="/"
          element={
            <Home></Home>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </ThemeProvider>
  );
}

export default App;
