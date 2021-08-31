import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
    const {
        value: enteredName,
        isValid: nameIsValid,
        hasError: nameInputHasError,
        valueChangeHandler: nameInputChangeHandler,
        valueBlurHandler: nameInputBlurHandler,
        reset: resetNameInput,
    } = useInput((value) => value.trim() !== '');

    const {
        value: enteredEmail,
        isValid: emailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailInputChangeHandler,
        valueBlurHandler: emailInputBlurHandler,
        reset: resetEmailInput,
    } = useInput((value) => {
        const re =
            /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

        return re.test(String(value).toLowerCase());
    });

    let formIsValid = false;

    if (nameIsValid && emailIsValid) {
        formIsValid = true;
    }

    const formSubmissionHandler = (e) => {
        e.preventDefault();

        if (nameInputHasError || emailInputHasError) {
            return;
        }

        resetNameInput();
        resetEmailInput();
    };

    const nameInputClasses = nameInputHasError
        ? 'form-control invalid'
        : 'form-control';

    const emailInputClasses = emailInputHasError
        ? 'form-control invalid'
        : 'form-control';

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className={nameInputClasses}>
                <label htmlFor="name">Your Name</label>
                <input
                    onChange={nameInputChangeHandler}
                    onBlur={nameInputBlurHandler}
                    type="text"
                    id="name"
                    value={enteredName}
                />
                {nameInputHasError && (
                    <p className="error-text">Entered name is invalid.</p>
                )}
            </div>
            <div className={emailInputClasses}>
                <label htmlFor="email">Your email</label>
                <input
                    type="email"
                    onChange={emailInputChangeHandler}
                    onBlur={emailInputBlurHandler}
                    id="email"
                    value={enteredEmail}
                />
                {emailInputHasError && (
                    <p className="error-text">Entered email is invalid.</p>
                )}
            </div>
            <div className="form-actions">
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
