import Image from "next/image"

export default function OAuthButtons() {

  return (
    <div className="grid grid-cols-2 gap-4">

      {/* Google */}

      <button className="flex items-center justify-center gap-3 py-3.5 px-4 
      bg-white border border-gray-200 rounded-xl
      hover:bg-gray-50 hover:shadow-sm
      transition">

        <Image
          src="/icons/google.svg"
          alt="Google"
          width={20}
          height={20}
        />

        <span className="text-sm font-semibold text-gray-700">
          Google
        </span>

      </button>

      {/* Microsoft */}

      <button className="flex items-center justify-center gap-3 py-3.5 px-4 
      bg-white border border-gray-200 rounded-xl
      hover:bg-gray-50 hover:shadow-sm
      transition">

        <Image
          src="/icons/microsoft.svg"
          alt="Microsoft"
          width={20}
          height={20}
        />

        <span className="text-sm font-semibold text-gray-700">
          Microsoft
        </span>

      </button>

    </div>
  )
}