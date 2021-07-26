import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CreateAndEditProduct from "../components/CreateAndEditProduct";
import {useContext, useState} from "react";
import ProductsContext from "../context/ProductsContext";
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from "react-router-dom";
import Product from "../components/Product";

const Products = () => {
  const [OpenCreateDialog, setOpenCreateDialog] = useState(false);
  const {products} = useContext(ProductsContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortKey, setSortKey] = useState('name');
  const sortKeyList = [{label: 'Name', value: 'name'}, {label: 'Count', value: 'count'}];

  const closeFilterMenu = () => {
    setAnchorEl(null);
  };

  const selectSortKey = val => () => {
    setSortKey(val);
    closeFilterMenu();
  };

  const sortProducts = (a, b) => {
    if (a[sortKey] > b[sortKey]) {
      return 1;
    }

    if (a[sortKey] < b[sortKey]) {
      return -1;
    }

    // a должно быть равным b
    return 0;
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className="flex1">Home</Typography>

          <Button color="inherit" className="t_t_n" onClick={() => setOpenCreateDialog(true)}>New Product</Button>

          <IconButton color="inherit" onClick={e => setAnchorEl(e.currentTarget)}><FilterListIcon/></IconButton>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeFilterMenu}>
            {sortKeyList.map(item => (
              <MenuItem key={item.value} selected={sortKey === item.value} onClick={selectSortKey(item.value)}>
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>

      <div className="m_12">
        <Grid container justifyContent="center" spacing={3}>
          {products.sort(sortProducts).map(item => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Link to={`/products/${item.id}`} className="t_d_none"><Product data={item}/></Link>
            </Grid>
          ))}
        </Grid>
      </div>

      <CreateAndEditProduct open={OpenCreateDialog} onClose={() => setOpenCreateDialog(false)}/>
    </>
  );
};

export default Products;
