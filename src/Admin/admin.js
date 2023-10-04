import Table from 'react-bootstrap/Table';
import { useHistory } from 'react-router-dom';
import { AppState } from '../provider/provider';
import Sidebar from '../sidebar/sidebar';
import { mainurl } from '../App';
import { UserList } from './userlist';

function DarkExample() {
  return (
    <Sidebar>
      <ListTable
        heading="List Of Product"
        sty="bg-info text-white"
      />
      <UserList/>
    </Sidebar>
  );
}

export default DarkExample;

function ListTable({ heading, sty }) {
  const { productData, setProductData } = AppState();
  const history = useHistory();
  const token = sessionStorage.getItem('token');
  //delete product
  const productDelete = async (idx) => {
    try {
      const response = await fetch(`${mainurl}/product/delete/${idx}`, {
        method: "Delete",
        headers: { "Authorization": `Bearer ${token}` }
      })
      const data = await response.json();
      // console.log(data);
      const productAlterList = productData.filter((bk) => bk._id !== idx);
      setProductData(productAlterList)

    } catch (error) {
      console.log(error);
      alert(error)
    }

  }

  return (
    <div>
      <h1 className={sty}>{heading}</h1>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>product ID</th>
            <th>product NAME</th>
            <th>model</th>
            <th>price</th>
            <th>BUTTON</th>
          </tr>
        </thead>
        {productData.map((prod, index) => (
          <tbody>
            <tr key={index}>
              <td>{prod._id}</td>
              <td>{prod.productName}</td>
              <td>{prod.model}</td>
              <td>{prod.price}</td>
              <td><div className='btn-group'>
                <button
                  className='button button-edit'
                  onClick={() => history.push(`/edit/product/${prod._id}`)}
                >Edit
                </button>
                <button
                  className='button button-delete'
                  onClick={() => productDelete(prod._id)}
                >Delete
                </button>
              </div></td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  )
}
