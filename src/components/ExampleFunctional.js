import React, { useEffect, useState } from "react";

export default function ExampleFunctional() {
  const [count, setCount] = useState(0);
  const [action, setAction] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);

  /**
   * Khi state trong component thay đổi giá trị thì component sẽ được render lại
   * Và khi component render lại thì useEffect sẽ được gọi và thực hiện hàm trong nó
   * Array dependencies: Chỉ định rõ state tác động đến useEffect
   */

  useEffect(() => {
    document.title = `You clicked ${count} times`;
    console.log("useEffect");

    // clean-up function truoc khi 1 useEffect duoc chay
    return () => {
      console.log("useEffect - count - cleanup");
    };
  }, [count]);

  /**
   * Khi có thay đổi state `action` thì useEffect dưới đây được gọi !
   * Tức nếu nhấn button "Get Users" > 1 lần thì useEffect cũng chỉ được gọi 1 lần !
   */
  useEffect(() => {
    fetch(`https://reqres.in/api/${action}`)
      .then((res) => console.log({ res }))
      .catch((err) => console.log({ err }));
  }, [action]);

  /**
   * Chỉ định []: tức là sẽ chỉ dùng useEffect này 1 lần khi page init
   * Vì: state thay đổi thì page render lại
   * Không chỉ định array dependencies thì useEffect luôn tự gọi khi state thay đổi
   * Chỉ định cụ thể thì được gọi phụ thuộc vào thay đổi của state nhất định
   * Chỉ định rỗng [] thì chỉ được gọi 1 lần lúc init page
   */

  const handleScroll = () => {
    setScrollPosition(window.screenY);
  };

  useEffect(() => {
    // componentDidMount
    document.addEventListener("scroll", handleScroll);

    // clean up event
    return () => {
      /**
       * componentWillUnmount
       * Nhiệm vụ: Thực hiện việc dọn dẹp những thứ trong useEffect trước đó làm
       */
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div style={{ height: "3000px" }}>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={() => setAction("users")}>Get Users</button>
      <button onClick={() => setAction("comments")}>Get Comments</button>

      <p style={{ position: "fixed", bottom: "20px", left: "20px" }}>{scrollPosition}</p>
    </div>
  );
}
