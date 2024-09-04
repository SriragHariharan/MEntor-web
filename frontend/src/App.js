import {GoogleOAuthProvider} from '@react-oauth/google';
import { ToastContainer } from "react-toastify";
import useRoutes from './hooks/useRoutes';
import { RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

function App() {
	const router = useRoutes();
	const isDarkTheme = useSelector((store) => store?.isDark?.isThemeDark);

  return (
		<GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}>
			<ToastContainer />
			<Toaster toastOptions={{duration: 1000}} position="bottom-right" />
			<div className={isDarkTheme && "dark"}>
				<RouterProvider router={router} />
			</div>
		</GoogleOAuthProvider>
  );
}

export default App;
