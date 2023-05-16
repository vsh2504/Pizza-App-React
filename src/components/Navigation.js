import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <>
        {/* Anchor tags will refresh the page & don't update the components dynamically 
                which defeats the purpose of using react */}
        {/* <a href="/">Home</a> 
        <a href="/about">About</a> */}
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
    </>
  )
}

export default Navigation