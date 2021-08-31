import useInput from '../hooks/use-input';

const BasicForm = (props) => {
    const nameIsNotEmpty = (value) => value.trim() !== '';

    const {
        value: enteredFirstName,
        isValid: firstNameIsValid,
        hasError: enteredFirstNameHasError,
        valueChangeHandler: firstNameChangeHandler,
        valueBlurHandler: firstNameBlurHandler,
        reset: resetFirstNameInput,
    } = useInput(nameIsNotEmpty);

    const {
        value: enteredLastName,
        isValid: lastNameIsValid,
        hasError: enteredLastNameHasError,
        valueChangeHandler: lastNameChangeHandler,
        valueBlurHandler: lastNameBlurHandler,
        reset: resetLastNameInput,
    } = useInput(nameIsNotEmpty);

    const {
        value: enteredEmail,
        isValid: emailIsValid,
        hasError: enteredEmailHasError,
        valueChangeHandler: emailChangeHandler,
        valueBlurHandler: emailBlurHandler,
        reset: resetEmailInput,
    } = useInput((value) => {
        const re =
            /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

        return re.test(String(value).toLowerCase());
    });

    let formIsValid = false;

    if (firstNameIsValid && lastNameIsValid && emailIsValid) {
        formIsValid = true;
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();

        if (!formIsValid) {
            return;
        }

        resetFirstNameInput();
        resetLastNameInput();
        resetEmailInput();
    };

    const firstNameInputClasses = enteredFirstNameHasError
        ? 'form-control invalid'
        : 'form-control';

    const lastNameInputClasses = enteredLastNameHasError
        ? 'form-control invalid'
        : 'form-control';

    const emailInputClasses = enteredEmailHasError
        ? 'form-control invalid'
        : 'form-control';

    return (
        <form onSubmit={formSubmitHandler}>
            <div className="control-group">
                <div className={firstNameInputClasses}>
                    <label htmlFor="first-name">First Name</label>
                    <input
                        type="text"
                        id="first-name"
                        value={enteredFirstName}
                        onChange={firstNameChangeHandler}
                        onBlur={firstNameBlurHandler}
                    />
                    {enteredFirstNameHasError && (
                        <p className="error-text">
                            Entered first name is invalid.
                        </p>
                    )}
                </div>
                <div className={lastNameInputClasses}>
                    <label htmlFor="last-name">Last Name</label>
                    <input
                        type="text"
                        id="last-name"
                        value={enteredLastName}
                        onChange={lastNameChangeHandler}
                        onBlur={lastNameBlurHandler}
                    />
                    {enteredLastNameHasError && (
                        <p className="error-text">
                            Entered last name is invalid.
                        </p>
                    )}
                </div>
            </div>
            <div className={emailInputClasses}>
                <label htmlFor="email">E-Mail Address</label>
                <input
                    type="text"
                    id="email"
                    value={enteredEmail}
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                />
                {enteredEmailHasError && (
                    <p className="error-text">Entered email is invalid.</p>
                )}
            </div>
            <div className="form-actions">
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default BasicForm;
