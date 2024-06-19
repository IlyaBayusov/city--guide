import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const useValidation = (value: string, valids: object) => {
  const [empty, setEmpty] = useState(true);
  const [minLength, setMinLength] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    for (const valid in valids) {
      switch (valid) {
        case "minLength":
          value.length < valids[valid]
            ? setMinLength(true)
            : setMinLength(false);
          break;
        case "empty":
          value ? setEmpty(false) : setEmpty(true);
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (empty || minLength) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [empty, minLength]);

  return {
    empty,
    minLength,
    inputValid,
  };
};

const useInput = (initValue: string, valids: object) => {
  const [value, setValue] = useState(initValue);
  const [dirty, setDirty] = useState(false);
  const valid = useValidation(value, valids);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = (e) => {
    setDirty(true);
  };

  return { value, onChange, onBlur, dirty, ...valid };
};

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
                <input
                  className="md:min-w-60 px-4 py-2 text-sm font-medium text-v-black border-2 border-gray-300 rounded-lg"
                  type="text"
                  placeholder="Введите логин"
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
              <div className="mb-1">
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
