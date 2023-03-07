import OrdersPageComponent from "./components/OrdersPageComponent";
import axios from "axios"

const getOrders = async (req, res) => {
  const {data} = await axios.get("/api/orders/admin")
  return data
}

const AdminOrdersPage = () => {
  return (
    <OrdersPageComponent getOrders={getOrders}/>
  )
};

export default AdminOrdersPage;
