type Base = Omit<React.HTMLAttributes<HTMLSelectElement>, "onChange">;

export interface ComboBoxProps<TKey extends string, TValue> extends Base {
  options: Record<TKey, TValue>;
  value: TKey | undefined;
  onChange: (key: TKey | undefined) => void;
}

export const ComboBox = <TKey extends string, TValue>({
  onChange,
  value,
  options,
  ...rest
}: ComboBoxProps<TKey, TValue>) => {
  const optionsList = Object.entries(options) as [TKey, TValue][];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    if (value === "") {
      onChange(undefined);
      return;
    }

    onChange(value as TKey);
  };

  const selectValue = value ?? "";

  return (
    <select value={selectValue} onChange={handleChange} {...rest}>
      <option value="">No preference</option>
      {optionsList.map(([key, value]) => (
        <option key={key} value={key}>
          {String(value)}
        </option>
      ))}
    </select>
  );
};
