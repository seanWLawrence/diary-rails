import React, { ChangeEvent, FC, useState } from 'react';

import './index.sass';

interface InputGroupProps {
  label: string;
  name: string;
  setState: React.Dispatch<React.SetStateAction<{ [name: string]: any }>>;
  state: { [name: string]: any };
  required?: boolean;
  groupName: string;
}

export let InputGroup: FC<InputGroupProps> = ({
  setState,
  state,
  name,
  label,
  required = false,
  groupName,
}) => {
  let [editMode, setEditMode] = useState<boolean>(false);

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

  let hasMoreThanOneInput = state[name].length > 1;

  let shouldDisplayRemoveButton = hasMoreThanOneInput && editMode;

  return (
    <>
      <h2 className="input-group__title">
        {groupName}

        {hasMoreThanOneInput && (
          <button
            type="button"
            onClick={() => setEditMode(!editMode)}
            className="input-group__button--edit"
          >
            {editMode ? 'Done' : 'Edit'}
          </button>
        )}
      </h2>

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
                autoFocus={isLastInput}
              />
              {shouldDisplayRemoveButton && (
                <button
                  type="button"
                  className="input-group__button--remove"
                  onClick={removeInput(index)}
                  data-testid="input-group-remove-button"
                >
                  &times;
                </button>
              )}
            </div>
            <div
              className={`input-group__button-wrapper--${
                shouldDisplayRemoveButton ? 'space-between' : 'flex-end'
              }`}
            ></div>
          </label>
        );
      })}
      <div className="input-group__button-wrapper--flex-end">
        <button
          type="button"
          className="input-group__button--add"
          onClick={addNewInput}
        >
          Add new
        </button>
      </div>
    </>
  );
};

export default InputGroup;
