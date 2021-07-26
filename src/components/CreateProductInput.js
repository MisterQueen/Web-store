import {FastField} from "formik";
import TextField from "@material-ui/core/TextField";

const CreateProductInput = props => {
  const {name, label, multiline} = props;

  return (
    <div className="min_h_55">
      <FastField name={name}>
        {({field, meta}) => (
          <TextField label={label} helperText={meta.touched && meta.error ? meta.error : ''} variant="outlined" required
                     error={meta.touched && !!meta.error} {...field} size="small" fullWidth multiline={multiline}/>
        )}
      </FastField>
    </div>
  );
};

export default CreateProductInput;
