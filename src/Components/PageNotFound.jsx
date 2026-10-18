import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="notFound w-50 m-auto mt-5 text-center">
      <h2 className="h1 bg-danger p-2 text-white rounded-5">PAGE NOT FOUND</h2>
      <h3 className="h2">Nothing to see here</h3>
      <p className="text-muted">
        The page you are trying to open doesn't exist. You may have mistyped the address, or the page has been moved.
      </p>
      <Link to="/home" className="btn btn-outline-dark">
        Take me back to the home page
      </Link>
    </div>
  );
}
