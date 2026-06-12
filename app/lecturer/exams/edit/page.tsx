export default function LecturerUpdateExamPage() {
    return (
      <div className="mx-auto max-w-5xl">
        {/* Header & Actions */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
              Update Exam
            </h1>
            <p className="text-slate-500 font-medium">
              Edit the information and structure of your current exam set.
            </p>
          </div>
  
          <div className="flex items-center gap-3">
            <button className="px-6 py-2.5 rounded-full font-semibold text-slate-600 hover:bg-slate-100 transition-all">
              Cancel
            </button>
            <button className="px-8 py-2.5 rounded-full font-semibold bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:translate-y-[-1px] active:translate-y-0 transition-all">
              Update
            </button>
          </div>
        </header>
  
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Section: Basic Information */}
            <section className="bg-white rounded-[1.5rem] p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-indigo-600">info</span>
                <h2 className="text-lg font-bold text-slate-900">Basic Information</h2>
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Subject
                  </label>
                  <select className="bg-slate-100 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-200 transition-all">
                    <option>Advanced Mathematics</option>
                    <option>Nuclear Physics</option>
                    <option>Advanced Web Development</option>
                  </select>
                </div>
  
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Exam Code
                  </label>
                  <input
                    className="bg-slate-100 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-200 transition-all"
                    type="text"
                    defaultValue="MATH-2024-QT1"
                  />
                </div>
  
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Number of Questions
                  </label>
                  <input
                    className="bg-slate-100 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-200 transition-all"
                    type="number"
                    defaultValue={40}
                  />
                </div>
              </div>
            </section>
  
            {/* Section: Question Content */}
            <section className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-indigo-600">quiz</span>
                  <h2 className="text-lg font-bold text-slate-900">Question Content</h2>
                </div>
  
                <span className="text-xs font-bold text-indigo-700 bg-indigo-600/10 px-3 py-1 rounded-full uppercase">
                  1/40 Created
                </span>
              </div>
  
              {/* Question Card 01 */}
              <div className="bg-white rounded-[1.5rem] p-8 shadow-sm border-l-4 border-indigo-600">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                    QUESTION 01
                  </h3>
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                      <span className="material-symbols-outlined">content_copy</span>
                    </button>
                  </div>
                </div>
  
                <div className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-slate-500">
                      Question Text
                    </label>
                    <textarea
                      className="bg-slate-100 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-200 transition-all resize-none"
                      placeholder="Enter the question here..."
                      rows={4}
                      defaultValue={`Given the integral I = ∫ f(x) dx, determine the convergence of the numeric series as it varies with parameter m...`}
                    />
                  </div>
  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-500">Difficulty</label>
                      <select defaultValue="Medium" className="bg-slate-100 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-200 transition-all">
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                      </select>
                    </div>
  
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-500">Topic</label>
                      <input
                        className="bg-slate-100 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-200 transition-all"
                        type="text"
                        defaultValue="Improper Integrals"
                      />
                    </div>
                  </div>
                </div>
              </div>
  
              {/* Add Button */}
              <button className="w-full py-6 border-2 border-dashed border-slate-200 rounded-[1.5rem] flex items-center justify-center gap-2 text-indigo-700 font-bold hover:bg-indigo-50 hover:border-indigo-300 transition-all">
                <span className="material-symbols-outlined">add_circle</span>
                <span>Add Question</span>
              </button>
            </section>
          </div>
  
          {/* Right Column */}
          <div className="space-y-8">
            {/* Section: Advanced Settings */}
            <section className="bg-white rounded-[1.5rem] p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-8">
                <span className="material-symbols-outlined text-indigo-600">
                  settings_suggest
                </span>
                <h2 className="text-lg font-bold text-slate-900">Advanced Settings</h2>
              </div>
  
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-900">Auto-shuffle Questions</span>
                    <span className="text-xs text-slate-400">Randomize question order</span>
                  </div>
  
                  {/* purely visual toggle */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input defaultChecked className="sr-only peer" type="checkbox" />
                    <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:border-slate-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600" />
                  </label>
                </div>
  
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Time Limit (minutes)
                  </label>
                  <div className="relative">
                    <input
                      className="w-full bg-slate-100 border-none rounded-xl pl-4 pr-12 py-3 focus:ring-2 focus:ring-indigo-200 transition-all"
                      type="number"
                      defaultValue={90}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">
                      MIN
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 italic">
                    The system will auto-submit when time runs out.
                  </p>
                </div>
              </div>
            </section>
  
            {/* Preview Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-500 rounded-[1.5rem] p-6 text-white overflow-hidden relative">
              <div className="relative z-10">
                <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-4">
                  Preview Profile
                </p>
                <h4 className="text-xl font-bold mb-1">Advanced Mathematics</h4>
                <p className="text-sm opacity-80 mb-6">MATH-2024-QT1 • 40 Questions</p>
  
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {/* keep as placeholders; replace with Next/Image later if desired */}
                    <div className="w-8 h-8 rounded-full border-2 border-indigo-200 bg-white/20" />
                    <div className="w-8 h-8 rounded-full border-2 border-indigo-200 bg-white/20" />
                  </div>
                  <span className="text-xs font-medium">+124 Students</span>
                </div>
              </div>
  
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-12 translate-x-12 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-4 blur-2xl" />
            </div>
          </div>
        </div>
  
        {/* Footer (optional) */}
        <footer className="mt-20 py-10 border-t border-slate-200/50 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm font-medium">
          <div className="flex items-center gap-2">
            <span className="font-bold text-indigo-700/50">Academic Curator</span>
            <span>© 2024 Academic Portfolio System</span>
          </div>
          <div className="flex gap-6">
            <a className="hover:text-indigo-600 transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-indigo-600 transition-colors" href="#">
              Terms of Service
            </a>
            <a className="hover:text-indigo-600 transition-colors" href="#">
              Help Center
            </a>
          </div>
        </footer>
      </div>
    )
  }