type ClassesHeaderProps = {
  title: string;
  subtitle: string;
};

export default function ClassesHeader({ title, subtitle }: ClassesHeaderProps) {
  return (
    <header className="mb-10">
      <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-indigo-600">
        Departmental Directory
      </span>
      <h1 className="mb-2 text-4xl font-bold tracking-tight text-slate-900">
        {title}
      </h1>
      <p className="max-w-2xl text-lg text-slate-500">{subtitle}</p>
    </header>
  );
}
