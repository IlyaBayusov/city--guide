import { useEffect, useState } from "react";

export const useValidation = (value: string, valids: object) => {
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

export const useInput = (initValue: string, valids: object) => {
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
