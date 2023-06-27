import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import netlifyLogo from './assets/netlify.svg'
import formikLogo from './assets/formik.svg'
import './App.css'
import { ContactForm } from './components/ContactForm'
import '@fontsource/public-sans';

function App() {
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

      <ContactForm />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
