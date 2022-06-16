import React, { useEffect, useState } from "react";
import styles from "styles/HomePage.module.scss";
import { BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

interface User {
  firstname: string;
  lastname: string;
  phone: string;
  code: string;
}

// const Form: React.FC<Props> = () => {
//     return (  );
// }

interface tableProps {
  users: User[];
}

const Table: React.FC<tableProps> = ({ users }) => {
  return (
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
              <button className={styles.btn}>{<BiTrash />}</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

interface HomePageProps {
  isAuth: Boolean;
}

const HomePage: React.FC<HomePageProps> = ({ isAuth }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) navigate("/login");
  }, []);

  const [users, setUsers] = useState<User[]>([
    {
      firstname: "علی",
      lastname: "محمودی",
      phone: "656465545651",
      code: "464646456",
    },
  ]);
  return (
    <div className={`container ${styles.container}`}>
      {users.length ? <Table users={users} /> : ""}
    </div>
  );
};

export default HomePage;
