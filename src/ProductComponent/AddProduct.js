import * as yup from 'yup'
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import { useHistory } from "react-router-dom";
import { AppState } from "../provider/provider"
import Sidebar from "../sidebar/sidebar";
import {mainurl} from "../App"

const userSchemaValidation = yup.object({
  productName: yup.string().required("Please fill in your product Name"),
  image: yup.string().required("please write proper image sorce"),
  model: yup.string().required("Please fill model?"),
  categories: yup.string().required("Please fill categories."),
 price: yup.string().required("Please fill categories.")
})

export function AddProduct() {
  const history = useHistory();
  const { productData, setProductData } = AppState();
  const addNewprodu = async ({ newproduct }) => {
    try {
      const response = await fetch(`${mainurl}/add/product`, {
        method: "POST",
        body: JSON.stringify(newproduct),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.json();
      console.log(data);
      setProductData([...productData, data])
      history.push("/admin")

    } catch (error) {
      console.log(error)
    }


  }


  const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
    initialValues: {
      productName: "",
      image: "",
      model: "",
      categories: "",
      price: ""
    },
    validationSchema: userSchemaValidation,
    onSubmit: (newproduct) => {
      console.log("on submit called :", newproduct)
      addNewprodu({ newproduct });

    }

  })

  return (
    <Sidebar>
      <div className='issued-container'>

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
            label="image Sorce"
            variant="outlined"
            onBlur={handleBlur}
            name="image"
            value={values.image}
            onChange={handleChange}
          />
          {touched.image && errors.image ? <p style={{ color: "crimson" }}>{errors.image}</p> : ""}

          <TextField
            fullWidth
            id="fullWidth"
            label="model"
            variant="outlined"
            onBlur={handleBlur}
            name="model"
            value={values.model}
            onChange={handleChange}
          />
          {touched.model && errors.model ? <p style={{ color: "crimson" }}>{errors.model}</p> : ""}
          <TextField
            fullWidth
            id="fullWidth"
            label="categories"
            variant="outlined"
            onBlur={handleBlur}
            name="categories"
            value={values.categories}
            onChange={handleChange}
          />
          {touched.categories && errors.categories ? <p style={{ color: "crimson" }}>{errors.categories}</p> : ""}
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
    </Sidebar>


  )
}