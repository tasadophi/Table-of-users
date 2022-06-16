import React from "react";
import styles from "styles/Input.module.scss";

interface Props {
  formik: any;
  name: string;
  placeholder: string;
  type: string;
}

const Input: React.FC<Props> = ({ formik, name, placeholder, type }) => {
  return (
    <input
      className={styles.input}
      type={type}
      name={name}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
