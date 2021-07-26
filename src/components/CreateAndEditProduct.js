import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import CreateProductInput from "./CreateProductInput";
import {useContext} from "react";
import ProductsContext from "../context/ProductsContext";
import GenerateId from "../common/GenerateId";

const validationSchema = Yup.object({
  imageUrl: Yup.string().required().url(),
  name: Yup.string().required(),
  count: Yup.number().required().min(0).integer(),
  size: Yup.object({
    width: Yup.number().required().positive(),
    height: Yup.number().required().positive()
  }),
  weight: Yup.string().required(),
  description: Yup.string().required()
});

const CreateAndEditProduct = props => {
  const {open, product} = props;
  const {addProduct, updateProduct} = useContext(ProductsContext);
  const initialValues = {imageUrl: '', name: '', count: '', size: {width: '', height: ''}, weight: '', description: ''};

  if (product) {
    initialValues.imageUrl = product.imageUrl;
    initialValues.name = product.name;
    initialValues.count = product.count;
    initialValues.size = product.size;
    initialValues.weight = product.weight;
    initialValues.description = product.description;
  }

  const onSubmit = values => {
    if (product) {
      updateProduct({...product, ...values});

    } else {
      values.count = +values.count;
      values.size.width = +values.size.width;
      values.size.height = +values.size.height;

      addProduct({id: GenerateId(), ...values, comments: []});
    }

    props.onClose();
  };

  return (
    <Dialog open={open} onClose={props.onClose} fullWidth maxWidth="xs">
      <DialogTitle>Create Product</DialogTitle>

      <DialogContent>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {formik => (
            <Form>
              <CreateProductInput name="imageUrl" label="Image Url"/>

              <CreateProductInput name="name" label="Name"/>

              <CreateProductInput name="count" label="Count"/>

              <CreateProductInput name="size.width" label="Width"/>

              <CreateProductInput name="size.height" label="Height"/>

              <CreateProductInput name="weight" label="Weight"/>

              <CreateProductInput name="description" label="Description" multiline/>

              <br/>

              <div className="flex">
                <Button onClick={props.onClose} variant="outlined" className="t_t_n">Cancel</Button>

                <div className="flex1"/>

                <Button type="submit" color="primary" disabled={!formik.isValid} variant="contained" className="t_t_n">
                  {product ? 'Save' : 'Add'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>

      <br/>
    </Dialog>
  );
};

export default CreateAndEditProduct;
