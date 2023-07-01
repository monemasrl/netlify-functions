import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import netlifyLogo from './assets/netlify.svg'
import formikLogo from './assets/formik.svg'
import './App.css'
import { ContactForm } from './components/ContactForm'
import { CookiesProvider, useCookies } from "react-cookie";
import '@fontsource/public-sans';

function App() {
  const query = new URLSearchParams(window.location.search);
  // @ts-ignore
  const [cookies, setCookie] = useCookies(['utm_campaign', 'utm_source', 'utm_medium']);

  const utm = {
    utm_campaign: query.has('utm_campaign') ? query.get('utm_campaign') : cookies.utm_campaign !== undefined ? cookies.utm_campaign : undefined,
    utm_source: query.has('utm_source') ? query.get('utm_source') : cookies.utm_source !== undefined ? cookies.utm_source : undefined,
    utm_medium: query.has('utm_medium') ? query.get('utm_medium') : cookies.utm_medium !== undefined ? cookies.utm_medium : undefined,
  }


  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://formik.org" target="_blank" >
          <img src={formikLogo} className="logo formik-logo" alt="Formik logo" />
        </a>
        <a href="https://yup.dev" target="_blank">
          <img src="https://avatars.githubusercontent.com/u/339286?v=4" className="logo" alt="Yup logo" />
        </a>
        <a href="https://www.netlify.com/products/functions/" target="_blank">
          <img src={netlifyLogo} className="logo" alt="Netlify logo" />
        </a>
      </div>
      <h1>Vite + React + Formik + Yup + Netlify Functions</h1>

      <CookiesProvider>
        <ContactForm {...utm} />
      </CookiesProvider>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
