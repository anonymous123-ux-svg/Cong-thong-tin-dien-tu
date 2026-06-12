import Link from "next/link";
import { getStudentCourses } from "@/lib/actions/student";
import { connection } from "next/server";

export default async function StudentDashboard() {
  await connection();
  const courses = await getStudentCourses();

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-12 text-white shadow-2xl animate-gradient bg-[length:200%_200%]">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-white/10 blur-3xl rounded-full" />
        
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold mb-6 border border-white/30 shadow-sm">
            Welcome Back 👋
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-sm">
            Ready to shape <br/> your future?
          </h1>
          <p className="text-indigo-100 text-lg md:text-xl font-medium max-w-xl">
            You have {courses.length} active courses. Dive back into your materials and keep your streak alive!
          </p>
        </div>
      </section>

      {/* Courses Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Your Learning Hub</h2>
          <Link href="/student/courses" className="text-indigo-600 font-semibold hover:text-indigo-700 transition">
            View All &rarr;
          </Link>
        </div>

        {courses.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white text-center">
            <span className="material-symbols-outlined text-indigo-300 text-7xl mb-6">
              auto_stories
            </span>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">No active courses yet</h3>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">
              Your curriculum is currently empty. Check back later or contact your administrator.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, idx) => (
              <div 
                key={course.id} 
                className="group relative bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Decorative Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 flex-1">
                  <div className="h-16 w-16 bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined text-3xl">school</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-800 mb-3 leading-tight group-hover:text-indigo-600 transition-colors">
                    {course.title}
                  </h3>
                  
                  <p className="text-slate-500 text-sm mb-8 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="relative z-10 pt-6 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Course</span>
                  <Link 
                    href="/student/assignments" 
                    className="inline-flex items-center gap-2 text-indigo-600 font-bold text-sm bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl transition-colors"
                  >
                    Assignments
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}