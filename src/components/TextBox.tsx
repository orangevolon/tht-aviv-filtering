type Base = Omit<React.HTMLAttributes<HTMLInputElement>, "onChange">;

interface TextBoxPropsBase<T> extends Base {
  value: T | undefined;
  onChange: (value: T | undefined) => void;
}

type TextBoxProps =
  | ({
      type: "number";
    } & TextBoxPropsBase<number>)
  | ({
      type: "text";
    } & TextBoxPropsBase<string>);

export const TextBox = ({ value, onChange, type, ...rest }: TextBoxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const changeValue = event.target.value;

    if (changeValue === "") {
      onChange(undefined);
      return;
    }

    if (type === "number") {
      onChange(Number(changeValue));
      return;
    }

    onChange(changeValue);
  };

  const inputValue = value ?? "";

  return (
    <input type={type} value={inputValue} onChange={handleChange} {...rest} />
  );
};
