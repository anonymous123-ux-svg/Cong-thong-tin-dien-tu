export default function TopNavbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl h-16 flex justify-between items-center px-8 shadow-sm">

      <div className="flex items-center gap-8">

        <span className="text-xl font-bold text-indigo-700">
          Academic Curator
        </span>

        <div className="hidden md:flex gap-6">

          <a className="text-indigo-700 border-b-2 border-indigo-600 pb-1 font-medium text-sm">
            Dashboard
          </a>

          <a className="text-slate-500 hover:text-indigo-600 text-sm font-medium">
            Courses
          </a>

          <a className="text-slate-500 hover:text-indigo-600 text-sm font-medium">
            Library
          </a>

          <a className="text-slate-500 hover:text-indigo-600 text-sm font-medium">
            Reports
          </a>

        </div>

      </div>

      <div className="flex items-center gap-4">

        <span className="material-symbols-outlined text-slate-500 hover:text-indigo-600 cursor-pointer">
          notifications
        </span>

        <span className="material-symbols-outlined text-slate-500 hover:text-indigo-600 cursor-pointer">
          settings
        </span>

        <div className="w-8 h-8 rounded-full bg-indigo-100 overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqNRUwRR4aK9yVVlPkgddp0ivohCsi6wc9F0QTR9sz0aydFBZ47b4Xl1c6yhK_XJssbfzpJcD7TI37aJUSpH6B-L19BvJvMIVGeomgCwRrnR8Awgafjb-mXCxHnusu4g1Hc2Lq6Bjnn5VprgIFAbA1HDbhFJD3mqkJHTefVnubZ9Dj76SO89CF0vRmaJ25-CY5NK2592HSIQmyXX_wvHN-oPphdFngRvEXfSBTWvcZC27DYpwL5tHn9TbDSNPhMuZRkeBUDOgoJ2Fs"
            alt="avatar"
          />
        </div>

      </div>

    </nav>
  )
}