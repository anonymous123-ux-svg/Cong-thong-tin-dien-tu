export default function LecturerCoursesPage() {
  return (
    <div className="max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <div className="relative mb-8 group">
        <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full group-hover:bg-purple-500/30 transition-all duration-500"></div>
        <div className="relative h-24 w-24 bg-white/80 backdrop-blur-xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] flex items-center justify-center">
          <span className="material-symbols-outlined text-purple-600 text-5xl">
            menu_book
          </span>
        </div>
      </div>
      <h1 className="text-4xl font-extrabold mb-4 text-slate-800 tracking-tight">Course Management</h1>
      <p className="text-lg text-slate-500 max-w-md font-medium">
        This feature is currently under development. Soon you will be able to create, edit, and publish your course curriculum here.
      </p>
      <div className="mt-8 px-6 py-2 bg-purple-50 text-purple-700 font-bold text-sm rounded-full tracking-widest uppercase">
        Coming Soon
      </div>
    </div>
  );
}
