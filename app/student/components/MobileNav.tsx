export default function MobileNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white px-6 py-3 flex justify-around items-center shadow">

      <button className="flex flex-col items-center text-indigo-600">
        <span className="material-symbols-outlined">school</span>
        <span className="text-[10px] font-bold">Learning</span>
      </button>

      <button className="flex flex-col items-center text-slate-400">
        <span className="material-symbols-outlined">explore</span>
        <span className="text-[10px] font-bold">Explore</span>
      </button>

      <button className="flex flex-col items-center text-slate-400">
        <span className="material-symbols-outlined">chat_bubble</span>
        <span className="text-[10px] font-bold">Messages</span>
      </button>

      <button className="flex flex-col items-center text-slate-400">
        <span className="material-symbols-outlined">person</span>
        <span className="text-[10px] font-bold">Profile</span>
      </button>

    </div>
  )
}