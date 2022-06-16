import React, { useEffect, useState } from "react";
import styles from "styles/HomePage.module.scss";
import { BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { FormikProps, useFormik } from "formik";
import Input from "common/Input";
import * as yup from "yup";
import Modal from "common/Modal";

interface User {
  firstname: string;
  lastname: string;
  phone: string;
  code: string;
}

interface TableProps {
  users: User[];
  setUsers: any;
}

interface FormProps {
  formik: any;
}

interface HomePageProps {
  isAuth: Boolean;
}

interface checkNumbersInterface {
  [key: string]: any;
}
const Form: React.FC<FormProps> = ({ formik }) => {
  return (
    <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
      <div className={styles.inputs}>
        <div className={styles.inputBox}>
          <Input
            formik={formik}
            name="firstname"
            value={formik.values.firstname}
            placeholder="نام"
            type="text"
          />
          {formik.touched.firstname && <span>{formik.errors.firstname}</span>}
        </div>
        <div className={styles.inputBox}>
          <Input
            formik={formik}
            name="lastname"
            value={formik.values.lastname}
            placeholder="نام خانوادگی"
            type="text"
          />
          {formik.touched.lastname && <span>{formik.errors.lastname}</span>}
        </div>
        <div className={styles.inputBox}>
          <Input
            formik={formik}
            name="phone"
            value={formik.values.phone}
            placeholder="تلفن همراه"
            type="tel"
          />
          {formik.touched.phone && <span>{formik.errors.phone}</span>}
        </div>
        <div className={styles.inputBox}>
          <Input
            formik={formik}
            name="code"
            value={formik.values.code}
            placeholder="کد ملی"
            type="tel"
          />
          {formik.touched.code && <span>{formik.errors.code}</span>}
        </div>
      </div>
      <button
        className={styles.submitBtn}
        type="submit"
        disabled={formik.isValid ? false : true}
      >
        افزودن کاربر
      </button>
    </form>
  );
};

const Table: React.FC<TableProps> = ({ users, setUsers }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userCode, setUserCode] = useState<string>("");

  // handlers
  const deleteUserHandler = (code: string) => {
    const newUsers = users.filter((user) => user.code !== code);
    setUsers(newUsers);
  };

  const cancelHandler = () => {
    setShowModal(false);
  };

  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div>آیا از حذف کاربر اطمینان دارید؟</div>
        <div className={styles.btns}>
          <button className={styles.cancelBtn} onClick={cancelHandler}>
            نگهدار
          </button>
          <button
            className={styles.removeBtn}
            onClick={() => deleteUserHandler(userCode)}
          >
            حذف
          </button>
        </div>
      </Modal>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>نام</th>
            <th>نام خانوادگی</th>
            <th>شماره موبایل</th>
            <th>کد ملی</th>
            <th></th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {users.map((user) => (
            <tr key={user.code}>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.phone}</td>
              <td>{user.code}</td>
              <td>
                <button
                  onClick={() => {
                    setShowModal(true);
                    setUserCode(user.code);
                  }}
                  className={styles.btn}
                >
                  {<BiTrash />}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const HomePage: React.FC<HomePageProps> = ({ isAuth }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    if (!isAuth) navigate("/login");
  }, []);

  // handler
  const cancelHandler = () => {
    setShowModal(false);
  };

  // formik
  const validateCode = (code: string) => {
    const checkNumbers: checkNumbersInterface = {
      0: 10,
      1: 9,
      2: 8,
      3: 7,
      4: 6,
      5: 5,
      6: 4,
      7: 3,
      8: 2,
    };
    let result = 0;
    for (let index = 0; index < code.length - 1; index++) {
      result += parseInt(code[index]) * checkNumbers[index];
    }
    result += parseInt(code[code.length - 1]);
    if (result % 11 === 0) return true;
    return false;
  };

  const validation = () => {
    return yup.object({
      firstname: yup.string().required("این فیلد اجباری است"),
      lastname: yup.string().required("این فیلد اجباری است"),
      phone: yup
        .string()
        .matches(/^09/, "با 09 شروع کنید!")
        .matches(/[0-9]{11}/, "لطفا ۱۱ رقم وارد کنید!")
        .max(11, "شماره موبایل اشتباه است!")
        .required("این فیلد اجباری است!"),
      code: yup
        .string()
        .matches(/[0-9]/, "کد ملی باید عدد باشد")
        .min(10, "کد ملی باید 10 رقم باشد!")
        .max(10, "کد ملی باید 10 رقم باشد!")
        .required("این فیلد اجباری است!"),
    });
  };

  const handleSubmit = ({ firstname, lastname, phone, code }: User) => {
    const isUserExist = users.some((user) => user.code === code);
    if (!isUserExist) {
      const isCodeValid = validateCode(code);
      if (isCodeValid) {
        setUsers([...users, { firstname, lastname, phone, code }]);
        formik.resetForm({
          values: { firstname: "", lastname: "", phone: "", code: "" },
        });
      } else {
        setShowModal(true);
        setError("کدملی معتبر نیست!");
      }
    } else {
      setShowModal(true);
      setError("این کاربر وجود دارد!");
    }
  };

  const formik: FormikProps<User> = useFormik({
    initialValues: { firstname: "", lastname: "", phone: "", code: "" },
    onSubmit: handleSubmit,
    validationSchema: validation,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
  });

  return (
    <div className={`container ${styles.container}`}>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div>{error}</div>
        <button onClick={cancelHandler} className={styles.submitBtn}>
          باشه
        </button>
      </Modal>
      {users.length ? <h1 className={styles.title}>جدول کاربران</h1> : ""}
      {users.length ? <Table users={users} setUsers={setUsers} /> : ""}
      <h2 className={styles.title}>فرم افزودن کاربر</h2>
      <Form formik={formik} />
    </div>
  );
};

export default HomePage;
