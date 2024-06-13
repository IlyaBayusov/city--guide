export default function Registr() {
  return (
    <>
      <div className="wrapper">
        <div className="w-full h-full flex justify-center items-center bg-black/50">
          <div className="p-4 flex flex-col items-center bg-white rounded-xl">
            <p className="mb-3 font-medium text-sm">Регистрация</p>

            <div className="flex flex-col items-center">
              <input
                className="mb-2 px-4 py-2 text-sm font-medium text-v-black border-2 border-gray-300 rounded-lg"
                type="text"
                placeholder="Введите логин"
              />
              <input
                className="mb-2 px-4 py-2 text-sm font-medium text-v-black border-2 border-gray-300 rounded-lg"
                type="password"
                placeholder="Введите пароль"
              />
              <input
                className="mb-3 px-4 py-2 text-sm font-medium text-v-black border-2 border-gray-300 rounded-lg"
                type="password"
                placeholder="Повторите пароль"
              />
              <button className="px-4 py-2 text-white bg-blue-500 rounded-lg font-medium text-sm">
                Зарегистрироваться
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
