import { Link } from "react-router-dom";

interface BackToHomeLinkProps {
  className?: string;
}

const BackToHomeLink = ({ className = "" }: BackToHomeLinkProps) => (
  <Link
    to="/"
    className={`inline-block px-6 py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition no-underline shadow ${className}`}
  >
    Volver al inicio
  </Link>
);

export default BackToHomeLink;