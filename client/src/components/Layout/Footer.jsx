const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black py-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-500 text-sm mb-4">© 2023 Loginly. All rights reserved.</p>
        <div className="flex justify-center gap-6 text-sm text-gray-600">
          <a href="#" className="hover:text-green-500 transition-colors duration-200">Terms</a>
          <a href="#" className="hover:text-green-500 transition-colors duration-200">Privacy</a>
          <a href="#" className="hover:text-green-500 transition-colors duration-200">Contact</a>
        </div>
      </div>
    </footer>
  );
};
//101828

export default Footer;