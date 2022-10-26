import { useCallback, useState } from "react";
import ChildComponent from "./components/ChildComponent";

function App() {
  const [users, setUsers] = useState([]);

  /**
   * Lúc đầu getData được gọi 1 lần khi ChildComponent được render (do dùng useEffect sẽ chạy getData lần đầu)
   * Sau khi nhấn nút để gọi đến getData đối với users thì getData trong ChildComponent được gọi thêm lần nữa. Giải thích
   * + getData là 1 hàm được định nghĩa trong AppComponent và được gán theo kiểu tham chiếu (giá trị hàm/định nghĩa hàm y hệt nhưng tham chiếu trong bộ nhớ thay đổi). Cụ thể:
   * + Lần 1: Khi App được khởi tạo, getData được gán 1 tham chiếu địa chỉ 'a'
   * + Lần 2: Khi state users trong App thay đổi sau click button getUser thì app được render lại, khi đó getData được gán 1 tham chiếu mới là 'b'
   * + Do đó useEffect trong ChildComponent lắng nghe sự thay đổi của getData thì sẽ gọi lại useEffect của nó một lần nữa
   *
   * Giải pháp: useCallback() giúp getData được định nghĩa 1 lần !
   * Giúp tránh trường hợp useEffect trong các function con được gọi lại khi component cha bị render
   */
  const getData = useCallback((type) => {
    return fetch(`https://reqres.in/api/${type}`);
    /**
     * Giá trị trả về là 1 promise
     * Mất 1 khoảng thời gian để server trả về dữ liệu
     * Do đó: khi call cần method là then() để lấy dữ liệu trả về
     */
  }, []);

  const handleClick = () => {
    getData("users")
      .then((res) => res.json())
      .then((res) => {
        const users = res.data;
        setUsers(users);
      });
  };

  return (
    <>
      <p>Data:</p>
      <button onClick={handleClick}>Get Users Data</button>
      <p>{JSON.stringify(users)}</p>
      <ChildComponent getData={getData} />
    </>
  );
}

export default App;
