import * as yup from 'yup'
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import Sidebar from "../sidebar/sidebar";
import { mainurl } from '../App';
import { AppState } from '../provider/provider';


const userSchemaValidation = yup.object({
    // id: yup.string().required("please specify Book ID"),
    productName: yup.string().required("Please fill in your product Name"),
    image: yup.string().required("please write proper image sorce"),
    model: yup.string().required("Please fill model?"),
    categories: yup.string().required("Please fill categories."),
    price: yup.string().required("Please fill categories.")
})


export function EditProducts() {
    const { productData, setProductData } = AppState();
    console.log(productData)
    const history = useHistory();
    const { id } = useParams();
    console.log(id)
    const selectedProduct = productData.find((bk) => bk._id === id);

    console.log(selectedProduct)
    const Editedlibrarybook = async ({ editproduct }) => {

        try {
            const response = await fetch(`${mainurl}/product/edit/${id}`, {
                method: "PUT",
                body: JSON.stringify(editproduct),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await response.json();
            console.log(data);
            setProductData([...productData])
            history.push("/admin")

        } catch (error) {
            console.log(error)
        }

    }


    const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({

        initialValues: {
            _id:selectedProduct._id,
            productName: selectedProduct.productName,
            image: selectedProduct.image,
            model: selectedProduct.model,
            categories: selectedProduct.categories,
            price: selectedProduct.price,
        },
        validationSchema: userSchemaValidation,
        onSubmit: (editproduct) => {
            console.log("on submit called :", editproduct)
            const editindex = productData.findIndex(bk => bk._id === id);
            productData[editindex] = editproduct;
            Editedlibrarybook({ editproduct })


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
                        Edit product
                    </Button>
                </form>
            </div>
        </Sidebar>

    )
}