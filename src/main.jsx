
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from 'store'

//antd
import { StyleProvider } from '@ant-design/cssinjs';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <StyleProvider hashPriority="high">
        <App />
      </StyleProvider>
    </BrowserRouter>
  </Provider>
  ,
)
