import React, { ChangeEvent, FC } from 'react';

import './index.sass';

interface InputGroupProps {
  label: string;
  name: string;
  setState: React.Dispatch<React.SetStateAction<{ [name: string]: any }>>;
  state: { [name: string]: any };
  required?: boolean;
}

export let InputGroup: FC<InputGroupProps> = ({
  setState,
  state,
  name,
  label,
  required = false,
}) => {
  let addNewInput = () =>
    setState({
      ...state,
      [name]: [...state[name], ''],
    });

  let removeInput = (index: number) => () =>
    setState({
      ...state,
      [name]: state[name].filter(
        (_: string, existingIndex: number) => existingIndex !== index,
      ),
    });

  let onInputChange = (index: number) => (
    event: ChangeEvent<HTMLInputElement>,
  ): void =>
    setState({
      ...state,
      [name]: state[name].map((existingValue: string, existingIndex: number) =>
        index === existingIndex ? event.target.value : existingValue,
      ),
    });

  let shouldDisplayRemoveButton = state[name].length > 1;

  return (
    <>
      {state[name].map((value: string, index: number) => {
        let isLastInput = state[name].length - 1 === index;

        return (
          <label className="input-group__label" key={index}>
            {required && '*'}
            {label} #{index + 1}
            <div className="input-group__input-wrapper">
              <input
                type="text"
                className="input-group__input"
                value={value}
                required={required}
                onChange={onInputChange(index)}
              />
              {shouldDisplayRemoveButton && (
                <button
                  type="button"
                  className="input-group__button--remove"
                  onClick={removeInput(index)}
                >
                  &times;
                </button>
              )}
            </div>
            <div
              className={`input-group__button-wrapper--${
                shouldDisplayRemoveButton ? 'space-between' : 'flex-end'
              }`}
            >
              {isLastInput && (
                <div className="input-group__button-wrapper--flex-end">
                  <button
                    type="button"
                    className="input-group__button--add"
                    onClick={addNewInput}
                  >
                    Add new
                  </button>
                </div>
              )}
            </div>
          </label>
        );
      })}
    </>
  );
};

export default InputGroup;
