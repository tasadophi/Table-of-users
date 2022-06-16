import React from "react";
import styles from "styles/Input.module.scss";

interface Props {
  formik: any;
  name: string;
  placeholder: string;
}

const Input: React.FC<Props> = ({ formik, name, placeholder }) => {
  return (
    <input
      className={styles.input}
      type="text"
      name={name}
      onChange={formik.handleChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
