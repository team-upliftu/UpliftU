// import { Googlemap } from './Googlemap';
// import { ActionButton } from './ActionButton';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { indigo, pink } from '@mui/material/colors';

// /*
// 共通テーマ
// */
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: indigo[500],
//       light: '#757de8',
//       dark: '#002984',
//     },
//     secondary: {
//       main: pink[500],
//       light: '#ff6090',
//       dark: '#b0003a',
//     },
//   },
// });

// export const App = () => {
//   return(
//     <ThemeProvider theme={theme}>
//       <Googlemap />
//       <ActionButton />
//     </ThemeProvider>
//   );
// };

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signin from "./features/auth/Signin";
import AppLayout from "./layout/AppLayout";
import { PrivateRoute } from "./features/auth/PrivateRoute";
import Home from "./features/home/Home";
import Signup from "./features/auth/Signup";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "./theme";

function App() {
  const theme = createTheme();
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<PrivateRoute element={<AppLayout />} />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;