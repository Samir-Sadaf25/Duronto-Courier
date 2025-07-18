import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-10">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Brand */}
        <div>
          <h2 className="font-bold text-xl text-primary mb-2">CareerCrafters</h2>
          <p className="text-sm">
            Empowering professionals and employers to craft their future through smart job connections.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold mb-2">Explore</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="link link-hover">Home</Link></li>
            <li><Link to="/jobs" className="link link-hover">All Jobs</Link></li>
            <li><Link to="/add-jobs" className="link link-hover">Post a Job</Link></li>
            <li><Link to="/application/me" className="link link-hover">My Applications</Link></li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className="font-semibold mb-2">Connect</h3>
          <p className="text-sm mb-2">contact@careercrafters.dev</p>
          <div className="flex gap-4 text-xl">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-primary">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-primary">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-primary">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-base-300 py-4 text-center text-sm">
        © {new Date().getFullYear()} CareerCrafters. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
