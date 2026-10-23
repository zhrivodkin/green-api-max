import { BrowserRouter, Routes, Route } from 'react-router'
import AuthPage from "./pages/AuthPage/AuthPage.tsx";
import {AuthLayout} from "./layouts/AuthLayout.tsx";
import routes from "./shared/routes.ts";
import MessagingPage from "./pages/MessagingPage/MessagingPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />} path={routes.root}>
          <Route element={<AuthPage />} path={routes.auth} />
        </Route>
        <Route element={<MessagingPage />} path={routes.messaging} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
