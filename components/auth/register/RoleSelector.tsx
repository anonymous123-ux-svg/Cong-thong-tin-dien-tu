export default function RoleSelector() {
  return (
    <div>

      <label className="block text-sm font-semibold uppercase mb-2">
        I am a...
      </label>

      <div className="grid grid-cols-2 gap-4">

        {/* STUDENT */}

        <label className="cursor-pointer">

          <input
            type="radio"
            name="role"
            value="student"
            defaultChecked
            className="hidden peer"
          />

          <div className="p-4 rounded-xl bg-gray-100 border-2 border-transparent
          peer-checked:border-indigo-600 text-center text-gray-800">

            Student

          </div>

        </label>

        {/* LECTURER */}

        <label className="cursor-pointer">

          <input
            type="radio"
            name="role"
            value="lecturer"
            className="hidden peer"
          />

          <div className="p-4 rounded-xl bg-gray-100 border-2 border-transparent
          peer-checked:border-indigo-600 text-center text-gray-800">

            Lecturer

          </div>

        </label>

      </div>

    </div>
  )
}