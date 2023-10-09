import { FC, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
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
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/store";


const Form: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const email = useAppSelector((state: RootState) => state.form.email);
  const password = useAppSelector((state: RootState) => state.form.password);
  const visualBtn = useAppSelector((state: RootState) => state.form.visual);
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

  const hadleSubmit = (e: any) => {
    e.preventDefault();

    dispatch(getToken({ password, email }))
      .then((token: any) => {
        let jwt: string = token.payload.auth_token;
        if (jwt) {
          localStorage.setItem("jwt", jwt);
          navigate("/");
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };

  return (
    <>
      <form
        name="form-auth"
        autoComplete="off"
        className={styles.formAuth}
        onSubmit={(e) => hadleSubmit(e)}
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
            // value="frontend@lenta.com"
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
            // 061020YWGV
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
        onClick={hadleSubmit}
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
