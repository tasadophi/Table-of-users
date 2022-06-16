import { useFormik, FormikProps } from "formik";
import styles from "styles/LoginPage.module.scss";
import { useNavigate } from "react-router-dom";
import data from "data.json";
import { useState } from "react";
import Modal from "common/Modal";
import Input from "common/Input";

interface LoginPageProps {
  setAuth: any;
}

const LoginPage: React.FC<LoginPageProps> = ({ setAuth }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);

  // handler
  const cancelHandler = () => {
    setShowModal(false);
  };

  interface formValues {
    username: string;
    password: string;
  }

  const handleSubmit = ({ username, password }: formValues) => {
    const user = data.users.find((user: any) => user.username === username);
    if (user) {
      if (user.password === password) {
        setAuth(true);
        navigate("/", { replace: true });
      }
    }
    setShowModal(true);
  };

  const formik: FormikProps<formValues> = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: handleSubmit,
  });

  return (
    <div className={`container ${styles.container}`}>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div>نام کاربری یا رمز عبور اشتباه است</div>
        <button onClick={cancelHandler} className={styles.btn}>
          باشه
        </button>
      </Modal>
      <h1 className={styles.title}>فرم ورود</h1>
      <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
        <div className={styles.inputs}>
          <Input
            formik={formik}
            name="username"
            placeholder="نام کاربری"
            type="text"
          />
          <Input
            formik={formik}
            name="password"
            placeholder="رمز عبور"
            type="text"
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
