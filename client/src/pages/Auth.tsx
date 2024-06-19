import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context";

const useValidation = (value, valids) => {
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

const useInput = (initValue, valids) => {
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
  const login = useInput("", { empty: true, minLength: 4 });
  const password = useInput("", { empty: true, minLength: 8 });

  const { store } = useContext(Context);

  return (
    <>
      <div className="wrapper">
        <div className="w-full h-full flex justify-center items-center bg-black/50">
          <div className="p-4 flex flex-col items-center bg-white rounded-xl">
            <p className="mb-3 font-medium text-sm">Авторизация</p>

            <div className="mb-2 flex flex-col items-center">
              <div className="mb-2">
                <input
                  className=" px-4 py-2 text-sm font-medium text-v-black border-2 border-gray-300 rounded-lg"
                  type="text"
                  placeholder="Введите логин"
                  value={login.value}
                  onChange={(e) => {
                    login.onChange(e);
                  }}
                  onBlur={(e) => {
                    login.onBlur(e);
                  }}
                />
                {login.dirty && login.empty ? (
                  <p className="text-red-500 font-medium text-xs">
                    Поле пустое
                  </p>
                ) : (
                  false
                )}
                {login.dirty && login.minLength ? (
                  <p className="text-red-500 font-medium text-xs">
                    Мин. 4 символа
                  </p>
                ) : (
                  false
                )}
              </div>
              <div className="mb-1">
                <input
                  className="px-4 py-2 text-sm font-medium text-v-black border-2 border-gray-300 rounded-lg"
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
              <Link to="/forgotPass" className="mb-3 text-sm">
                Забыли пароль?
              </Link>{" "}
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded-lg font-medium text-sm"
                onClick={() => store.login(login.value, password.value)}
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
