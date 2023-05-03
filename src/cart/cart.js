import * as yup from 'yup'
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import { AppState } from '../provider/provider';
import { toast } from "react-toastify";
import Sidebar from '../sidebar/sidebar';



const userSchemaValidation = yup.object({
  productName: yup.string().required("Please fill in your product Name"),
  productId: yup.string().required("Please fill in your product Id"),
  userId: yup.string().required("please write proper userId"),
  startingDate: yup.string().required("Please fill startingDate?"),
  endingDate: yup.string().required("Please fill endingDate."),
  price: yup.string().required("Please fill categories.")
})

export function Cart() {
  const { productData } = AppState();
  const { productId, index } = useParams();
  console.log(productId, productData)
  const books = productData[index];
  const productDatas = productData[index];
  const history = useHistory()
  const sign = async ({ newuser }) => {
    console.log(newuser);
    try {
      const response = await fetch(`http://localhost:7000/cart/create/${productId}`, {
        method: "POST",
        body: JSON.stringify(newuser),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.json();
      history.push("/detail/cart")
      toast("User Data Add")

    } catch (error) {
      console.log(error)
      toast("error")
    }
  }
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
    initialValues: {
      productName: productDatas.productName,
      productId: productId,
      userId: "",
      startingDate: "",
      endingDate: "",
      price: ""
    },
    validationSchema: userSchemaValidation,
    onSubmit: (newuser) => {
      sign({ newuser });
      console.log(newuser)
    }

  })

  return (
    <Sidebar>

      <div className='issued-cart-container'>

        <div className="Detail-card">
          <h1 style={{ color: "darkgreen" }}>{productDatas.productName}</h1>
          <img style={{ width: "300px", height: "300px" }} src={productDatas.image} title={productDatas.productName} alt={productDatas.productName}></img>
          <p style={{ color: "blue", fontSize: "40px" }}>model:{productDatas.model}</p>
          <p style={{ fontSize: "30px" }}>categories: {productDatas.categories}</p>
          <p style={{ fontSize: "30px" }}>price: {productDatas.price}</p>
          <p style={{ fontSize: "30px" }}>id: {productDatas.id}</p>



          <form onSubmit={handleSubmit} className="text-areas">
            <TextField
              fullWidth
              id="fullWidth"
              label="product Name"
              variant="outlined"
              onBlur={handleBlur}
              name="productName"
              value={values.productName}
              onChange={handleChange}
            />
            {touched.productName && errors.productName ? <p style={{ color: "crimson" }}>{errors.productName}</p> : ""}
            <TextField
              fullWidth
              id="fullWidth"
              name="productId"
              onBlur={handleBlur}
              label="productId"
              variant="outlined"
              value={values.productId}
              onChange={handleChange}
            />
            {touched.productId && errors.productId ? <p style={{ color: "crimson" }}>{errors.productId}</p> : ""}
            <TextField
              fullWidth
              id="fullWidth"
              label="userId"
              variant="outlined"
              onBlur={handleBlur}
              name="userId"
              value={values.userId}
              onChange={handleChange}
            />
            {touched.userId && errors.userId ? <p style={{ color: "crimson" }}>{errors.userId}</p> : ""}

            <TextField
              fullWidth
              id="fullWidth"
              type='datetime-local'
              label="startingDate"
              variant="outlined"
              onBlur={handleBlur}
              name="startingDate"
              value={values.startingDate}
              onChange={handleChange}
            />
            {touched.startingDate && errors.startingDate ? <p style={{ color: "crimson" }}>{errors.startingDate}</p> : ""}

            <TextField
              fullWidth
              id="fullWidth"
              type='datetime-local'
              label="endingDate"
              variant="outlined"
              onBlur={handleBlur}
              name="endingDate"
              value={values.endingDate}
              onChange={handleChange}
            />
            {touched.endingDate && errors.endingDate ? <p style={{ color: "crimson" }}>{errors.endingDate}</p> : ""}
            <TextField
              fullWidth
              id="fullWidth"
              label="price"
              variant="outlined"
              onBlur={handleBlur}
              name="price"
              value={values.price}
              onChange={handleChange}
            />
            {touched.price && errors.price ? <p style={{ color: "crimson" }}>{errors.price}</p> : ""}
            <Button
              variant="contained"
              type="submit"
              color="success"
            >
              Add a product
            </Button>
          </form>
        </div>
      </div>
    </Sidebar>
  );
}
