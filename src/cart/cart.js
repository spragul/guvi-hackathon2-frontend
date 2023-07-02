import * as yup from 'yup'
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import { AppState } from '../provider/provider';
import { toast } from "react-toastify";
import Sidebar from '../sidebar/sidebar';
import { mainurl } from '../App';


const userSchemaValidation = yup.object({
  productName: yup.string().required("Please fill in your product Name"),
  productId: yup.string().required("Please fill in your product Id"),
  userId: yup.string().required("please write proper userId"),
  startingDate: yup.string().required("Please fill startingDate?"),
  endingDate: yup.string().required("Please fill endingDate."),

})

export function Cart() {
  const { productData, issuesdata, setIssueddata } = AppState();
  const { productId, index } = useParams();
  const productDatas = productData[index];
  console.log(productDatas.price,productDatas)
  const UserId = sessionStorage.getItem('myid')
  const history = useHistory()
  const sign = async ({ newuseradd }) => { 
    try {
         if(newuseradd.price !==0){
          const response = await fetch(`${mainurl}/cart/create/${productId}`, {
            method: "POST",
            body: JSON.stringify(newuseradd),
            headers: {
              "Content-Type": "application/json",
            },
          })
          const data = await response.json();
          setIssueddata([...issuesdata, data])
          history.push("/detail/cart")
          toast("User Data Add")
         }else{
          toast("minmum select 1 hr")
         }

    } catch (error) {
      console.log(error)
      toast("error")
    }
  }
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
    initialValues: {
      productName: productDatas.productName,
      productId: productId,
      userId: UserId,
      startingDate: "",
      endingDate: ""
    },
    validationSchema: userSchemaValidation,
    onSubmit: (newuser) => {
      let zero=0;
      //starting date decode
      let a = newuser.startingDate.split("T");
      let b = a[0].split("-");
      let date1 = b[0] + '/' + b[1] + '/' + b[2];
      let c = a[1].split(':');
      let time1 = c[0] + ":" + zero;
      let day1 = date1 + " " + time1;
     //ending date decode
     let x = newuser.endingDate.split("T");
     let y = x[0].split("-");
     let date2 = y[0] + '/' + y[1] + '/' + y[2];
     let z = x[1].split(':');
     let time2 = z[0] + ":" +zero;
     let day2 = date2 + " " + time2;

     //time difrence calculated
     var diff = Math.abs(new Date(day1) - new Date(day2));
     var hr = Math.floor((diff/1000)/(60*60));
     let totalPrice =hr*(productDatas.price)

      let newuseradd = {
        productName: newuser.productName,
        productId: newuser.productId,
        userId: newuser.userId,
        startingDate: newuser.startingDate,
        endingDate: newuser.endingDate,
        price: totalPrice
      }
      console.log(newuseradd);

      sign({ newuseradd });
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
