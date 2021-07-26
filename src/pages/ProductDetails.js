import {useParams} from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import {useContext, useEffect, useState} from "react";
import ProductsContext from "../context/ProductsContext";
import Grid from '@material-ui/core/Grid';
import Product from "../components/Product";
import CreateAndEditProduct from "../components/CreateAndEditProduct";

const ProductDetails = () => {
  let {id} = useParams();
  const {products} = useContext(ProductsContext);
  const [data, setData] = useState();
  const [OpenCreateDialog, setOpenCreateDialog] = useState(false);

  useEffect(() => {
    const find = products.find(el => el.id === id);
    if (find) {
      setData(find);
    }
    // eslint-disable-next-line
  }, [products]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className="flex1">Details</Typography>
          <Button color="inherit" className="t_t_n" onClick={() => setOpenCreateDialog(true)}>Edit</Button>
        </Toolbar>
      </AppBar>

      <div className="m_12">
        <Grid container justifyContent="center" spacing={3}>
          <Grid item sm={12} md={6}>{data && <Product data={data} details/>}</Grid>
        </Grid>
      </div>

      <CreateAndEditProduct open={OpenCreateDialog} onClose={() => setOpenCreateDialog(false)} product={data}/>
    </>
  );
};

export default ProductDetails;
