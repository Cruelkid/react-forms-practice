import { useReducer } from 'react';

const initialState = {
    value: '',
    isTouched: false,
};

const inputStateReducer = (state, action) => {
    if (action.type === 'INPUT') {
        return {
            value: action.value,
            isTouched: state.isTouched
        };
    }

    if (action.type === 'BLUR') {
        return {
            value: state.value,
            isTouched: true
        };
    }

    if (action.type === 'RESET') {
        return {
            value: '',
            isTouched: false
        };
    }

    return inputStateReducer;
};

const useInput = (validateValue) => {
    const [inputState, dispatch] = useReducer(inputStateReducer, initialState);
    // const [enteredValue, setEnteredValue] = useState('');
    // const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(inputState.value);
    const hasError = inputState.isTouched && !valueIsValid;

    const valueChangeHandler = (e) => {
        dispatch({ type: 'INPUT', value: e.target.value });
    };

    const valueBlurHandler = () => {
        dispatch({ type: 'BLUR', value: initialState.value });
    };

    const reset = () => {
        dispatch({ type: 'RESET' });
    };

    return {
        value: inputState.value,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        valueBlurHandler,
        reset,
    };
};

export default useInput;
