import Table from 'react-bootstrap/Table';
import { useHistory } from 'react-router-dom';
import { AppState } from '../provider/provider';
import Sidebar from '../sidebar/sidebar';

function DarkExample() {
  return (
    <Sidebar>
      <ListTable
        heading="List Of Product"
        sty="bg-info text-white"
      />
      <Isstable
        heading="List of Issued Product"
        sty="bg-warning text-dark"
      />
    </Sidebar>
  );
}

export default DarkExample;

function ListTable({ heading, sty }) {
  const { productData, setProductData } = AppState();
  const history = useHistory();
  const productDelete = async (idx) => {
    try {
      const response = await fetch(`http://localhost:7000/product/delete/${idx}`, {
        method: "Delete"
      })
      const data = await response.json();
      console.log(data);
      const productAlterList = productData.filter((bk) => bk.id !== idx);
      setProductData(productAlterList)

    } catch (error) {
      console.log(error)
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
                  onClick={() => history.push(`/edit/productData/${prod.id}`)}
                >Edit
                </button>
                <button
                  className='button button-delete'
                  onClick={() => productDelete(prod.id)}
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


export function Isstable({ heading, sty }) {
  const { issuesdata, setIssueddata } = AppState();
  const productDelete = async (idx) => {
    try {
      const response = await fetch(`http://localhost:7000/cart/delete/${idx}`, {
        method: "Delete"
      })
      const data = await response.json();
      console.log(data);
      const productAlterList = issuesdata.filter((bk) => bk.id !== idx);
      setIssueddata(productAlterList)

    } catch (error) {
      console.log(error)
    }


  }

  return (
    <div>
      <h1 className={sty}>{heading}</h1>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>  
            <th>product Name</th>
            <th>price</th>
            <th>BUTTON</th>
          </tr>
        </thead>
        {issuesdata.map((issuedbooks, index) => (
          <tbody>
            <tr key={index}>
              <td>{issuedbooks.productName}</td>
              <td>{issuedbooks.price}</td>
              <td><div className='btn-group'>
                <button
                  className='button button-delete'
                  onClick={() => productDelete(issuedbooks._id)}
                >Remove Card
                </button>
              </div></td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  )

}