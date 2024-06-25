import { TextField } from "@mui/material";
import { FormikProps } from "formik";

interface FormikTextFieldProps<T> {
  name: keyof T;
  label: string;
  formik: FormikProps<T>;
  variant?: "outlined" | "filled" | "standard";
  type?: "text" | "password";
  autoComplete?: "new-password";
}

// フォーム処理においてFormikライブラリとMUIを組み合わせたカスタムフォームフィールドコンポーネントを定義している。ジェネリック型Tを使用することで、任意のフォームデータ型に対応するように実装している。
export const FormikTextField = <T extends {}>(
  props: FormikTextFieldProps<T>
) => {
  return (
    <TextField
      size="small"
      id={String(props.name)}
      name={String(props.name)}
      label={String(props.label)}
      type={String(props.type)}
      autoComplete={String(props.autoComplete)}
      variant={props.variant}
      fullWidth
      value={props.formik.values[props.name]}
      onChange={props.formik.handleChange}
      onBlur={props.formik.handleBlur}
      error={
        !!(props.formik.touched[props.name] && props.formik.errors[props.name])
      }
      helperText={String(
        props.formik.touched[props.name] && props.formik.errors[props.name]
          ? props.formik.errors[props.name]
          : ""
      )}
      InputProps={{
        style: {
          backgroundColor: '#eee', // フィールドの背景色
          borderRadius: '10px',
          border: '1px solid #eee', // 外側の枠線を灰色に設定
          height: "11vw",
          paddingLeft: "5vw",
          paddingTop: "1.5vw",
        },
        disableUnderline: true // アンダーラインを無効にする
      }}
      InputLabelProps={{
        style: {
          color: '#eee', // ラベルの色を灰色に設定
        },
      }}
    />
  );
};
