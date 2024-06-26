import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { useInput } from "../hooks/Validations";
import { Context } from "../context";

export default function Registr() {
  const email = useInput("", { empty: true, minLength: 4 });
  const password = useInput("", { empty: true, minLength: 8 });
  const passwordSecond = useInput("", { empty: true, minLength: 8 });

  const { store } = useContext(Context);

  const handleRegistr = async (email: string, password: string) => {
    try {
      const auth = getAuth();
      const req = await createUserWithEmailAndPassword(auth, email, password);

      store.registration();
      console.log(req);
    } catch (error) {
      console.error("Ошибка", error);
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="w-full h-full flex justify-center items-center bg-black/50">
          <div className="p-4 md:p-5 flex flex-col items-center bg-white rounded-xl">
            <p className="mb-3 font-medium text-sm md:text-base">Регистрация</p>

            <div className="flex flex-col items-center">
              <div className="mb-2 ">
                <input
                  className="md:min-w-60 px-4 py-2 text-sm font-medium text-v-black border-2 border-gray-300 rounded-lg"
                  type="text"
                  placeholder="Введите Email"
                  value={email.value}
                  onChange={(e) => {
                    email.onChange(e);
                  }}
                  onBlur={(e) => {
                    email.onBlur(e);
                  }}
                />
                {email.dirty && email.empty ? (
                  <p className="text-red-500 font-medium text-xs">
                    Поле пустое
                  </p>
                ) : (
                  false
                )}
                {email.dirty && email.minLength ? (
                  <p className="text-red-500 font-medium text-xs">
                    Мин. 4 символа
                  </p>
                ) : (
                  false
                )}
              </div>

              <div className="mb-2 ">
                <input
                  className="md:min-w-60 px-4 py-2 text-sm font-medium text-v-black border-2 border-gray-300 rounded-lg"
                  type="password"
                  placeholder="Введите пароль"
                  value={password.value}
                  onChange={(e) => {
                    password.onChange(e);
                  }}
                  onBlur={(e) => {
                    password.onBlur(e);
                  }}
                />
                {password.dirty && password.empty ? (
                  <p className="text-red-500 font-medium text-xs">
                    Поле пустое
                  </p>
                ) : (
                  false
                )}
                {password.dirty && password.minLength ? (
                  <p className="text-red-500 font-medium text-xs">
                    Мин. 8 символа
                  </p>
                ) : (
                  false
                )}
              </div>

              <div className="mb-3 md:mb-5">
                <input
                  className="md:min-w-60 px-4 py-2 text-sm font-medium text-v-black border-2 border-gray-300 rounded-lg"
                  type="password"
                  placeholder="Повторите пароль"
                  value={passwordSecond.value}
                  onChange={(e) => {
                    passwordSecond.onChange(e);
                  }}
                  onBlur={(e) => {
                    passwordSecond.onBlur(e);
                  }}
                />
                {passwordSecond.dirty && passwordSecond.empty ? (
                  <p className="text-red-500 font-medium text-xs">
                    Поле пустое
                  </p>
                ) : (
                  false
                )}
                {passwordSecond.dirty && passwordSecond.minLength ? (
                  <p className="text-red-500 font-medium text-xs">
                    Мин. 8 символа
                  </p>
                ) : (
                  false
                )}
              </div>
              <button
                className="px-4 py-2 md:px-6 mb-2 text-white bg-blue-500 rounded-lg font-medium text-sm"
                onClick={() => handleRegistr(email.value, password.value)}
              >
                Зарегистрироваться
              </button>

              <Link to="/email" className="text-sm">
                Авторизация
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
