import { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import styles from "../../styles/Form.module.css";
import {
  getToken,
  handleChangeEmail,
  handleChangePassword,
  handleChangeVisual,
} from "../../redux/slices/formSlice";
import remove from "../../images/close.svg.svg";
import visual from "../../images/eyeInvisible.svg";
import { regexp } from "../../utils/constant";

const Form: FC = () => {
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.form.email);
  const password = useSelector((state: RootState) => state.form.password);
  const visualBtn = useSelector((state: RootState) => state.form.visual);
  const [valid, setIsValid] = useState<boolean>(false);

  let regex = {
    reg: regexp,
    toString: function () {
      return this.reg;
    },
  };

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(handleChangeEmail(e.target.value));
    setIsValid(e.target.closest("form")?.checkValidity()!);
  };

  const changePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(handleChangePassword(e.target.value));
    setIsValid(e.target.closest("form")?.checkValidity()!);
  };

  return (
    <>
      <form
        name="form-auth"
        autoComplete="off"
        className={styles.formAuth}
        onSubmit={() =>
          dispatch(getToken())
            .then((token: string) => {
              console.log(token);
            })
            .catch((err: string) => {
              console.log(err);
            })
        }
        noValidate
      >
        <h2 className={styles.formTitle}>Вход</h2>
        <div className={styles.inputContainer}>
          <input
            type="email"
            placeholder="Электронная почта"
            className={styles.email}
            required
            id="email"
            name="email"
            onChange={(e) => {
              changeEmail(e);
            }}
            value={email}
            minLength={1}
            pattern={regex.reg.source}
          />
          {email ? (
            <button
              className={styles.remove}
              type="button"
              onClick={() => dispatch(handleChangeEmail(" "))}
            >
              <img src={remove} alt="удалить" className={styles.removeBtn} />
            </button>
          ) : (
            " "
          )}
          <input
            type={visualBtn ? "text" : "password"}
            placeholder="Пароль"
            className={styles.password}
            required
            onChange={(e) => {
              changePass(e);
            }}
            minLength={8}
            maxLength={16}
            id="password"
            name="password"
            value={password}
          />
          {password ? (
            <button
              className={styles.visual}
              type="button"
              onClick={() => dispatch(handleChangeVisual(true))}
            >
              <img src={visual} alt="показать" className={styles.visualBtn} />
            </button>
          ) : (
            " "
          )}
          <a href="#" className={styles.linkAuth}>
            <span className={styles.forget}>Забыли пароль?</span>
          </a>
        </div>
      </form>
      <button
        type="submit"
        className={valid ? styles.buttonAuth_valid : styles.buttonAuth_disabled}
        onClick={() => dispatch(getToken())}
        disabled={!valid}
      >
        <span
          className={
            valid ? styles.buttonSpan_valid : styles.buttonSpan_disabled
          }
        >
          Войти
        </span>
      </button>
    </>
  );
};

export default Form;
