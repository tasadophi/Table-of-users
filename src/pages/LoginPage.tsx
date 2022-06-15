import styles from "styles/LoginPage.module.scss";

const LoginPage: React.FC = () => {
  return (
    <div className={`container ${styles.container}`}>
      <h1 className={styles.title}>فرم ورود</h1>
      <form className={styles.formContainer}>
        <div className={styles.inputs}>
          <input
            type="text"
            placeholder="نام کاربری"
          />
          <input
            type="text"
            placeholder="رمز عبور"
          />
        </div>
        <button className={styles.btn} type="submit">
          ورود
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
