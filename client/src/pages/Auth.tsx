import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useInput } from "../hooks/useInput";
import { Context } from "../context";
import AuthInput from "../components/AuthInput/AuthInput";

export default function Auth() {
  const email = useInput("", { empty: true, minLength: 4 });
  const password = useInput("", { empty: true, minLength: 8 });

  const { store } = useContext(Context);

  const handleLogin = async (email: string, password: string) => {
    try {
      const auth = getAuth();
      const req = await signInWithEmailAndPassword(auth, email, password);

      store.login();
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
            <p className="mb-3 font-medium md:text-base text-sm">Авторизация</p>

            <div className="mb-2 flex flex-col items-center">
              <div className="mb-2">
                <AuthInput
                  inputName={email}
                  placeholder="Введите email"
                  type="text"
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
              <div className="mb-1">
                <AuthInput
                  inputName={password}
                  placeholder="Введите пароль"
                  type="password"
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
              <Link to="/forgotPass" className="mb-3 md:mb-5 text-sm">
                Забыли пароль?
              </Link>{" "}
              <button
                className="px-4 py-2 md:px-6 text-white bg-blue-500 rounded-lg font-medium text-sm"
                onClick={() => handleLogin(email.value, password.value)}
              >
                Войти
              </button>
            </div>

            <Link to="/reg" className="text-sm">
              Регистрация
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
