import { TextField } from '@mui/material';

const TextInput = ({ type, title, disabled, error, helperText, onChange, name }) => {
    return (
        <TextField
            type={type || 'text'}
            id="filled-basic"
            label={title}
            disabled={disabled}
            variant="outlined"
            error={error}
            helperText={error && helperText}
            onChange={onChange}
            name={name}
        />
    );
};

export default TextInput;
