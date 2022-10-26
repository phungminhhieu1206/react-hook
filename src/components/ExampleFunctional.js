import React, { useState } from "react";

export default function ExampleFunctional() {
  const initialValues = () => {
    let total = 0;
    for (let i = 0; i < 10000000; i++) {
      total += i;
    }

    console.log("initialValue");
    return total;
  };

  // Nếu muộn gọi hàm initialValue 1 lần ! (Vì mỗi lần thay đổi event sẽ render lại giao diện)
  const [count, setCount] = useState(() => {
    return initialValues();
  });

  const [user, setUser] = useState({
    name: "Test",
    age: 12,
  });

  //   Nếu muốn gọi hàm inititalValue mỗi khi thay đổi giao diện
  //   const [count, setCount] = useState(initialValues());

  const handleClick = () => {
    // Trường hợp count không tăng thêm 2
    // setCount(count + 1);
    // setCount(count + 1);

    // Sửa !
    setCount((prevState) => {
      return prevState + 1;
    });
    setCount((prevState) => {
      return prevState + 1;
    });

    // setState not merge
    // setUser({name:'update'})

    // setState merge the same class component
    setUser({
      ...user,
      name: "update",
    });
  };

  return (
    <div>
      <pre>Functional Component</pre>
      <p>You clicked {count} times</p>
      <p>User: {JSON.stringify(user)}</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
