import Navbar from './Navbar'
import Footer from './footer/footer'

const Layout = ({children}) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
)

export default Layout
