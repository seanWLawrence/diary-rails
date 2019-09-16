import React, { ChangeEvent, FC } from 'react';

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

  return (
    <>
      {state[name].map((value: string, index: number) => {
        let isLastInput = state[name].length - 1 === index;

        return (
          <label className="new-entry__label" key={index}>
            {required && '*'}
            {label} #{index + 1}
            <input
              type="text"
              className="new-entry__input"
              value={value}
              required={required}
              onChange={onInputChange(index)}
            />
            <div className="new-entry__button-wrapper--space-between">
              {state[name].length > 1 && (
                <button
                  type="button"
                  className="new-entry__button--remove"
                  onClick={removeInput(index)}
                >
                  Remove
                </button>
              )}

              {isLastInput && (
                <div className="new-entry__button-wrapper">
                  <button
                    type="button"
                    className="new-entry__button--add"
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
