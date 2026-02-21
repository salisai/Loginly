const Footer = () => {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-background)] section-spacing" role="contentinfo">
      <div className="container-wide">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-caption text-[var(--text-muted)] order-2 sm:order-1">
            © {new Date().getFullYear()} Loginly. All rights reserved.
          </p>
          <nav className="flex items-center gap-8 order-1 sm:order-2" aria-label="Footer">
            <a href="#" className="text-caption text-[var(--text-body)] hover:text-[var(--color-primary)] transition-colors">Terms</a>
            <a href="#" className="text-caption text-[var(--text-body)] hover:text-[var(--color-primary)] transition-colors">Privacy</a>
            <a href="#" className="text-caption text-[var(--text-body)] hover:text-[var(--color-primary)] transition-colors">Contact</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;