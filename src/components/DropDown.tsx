const DropDown = (props: any) => {
  return (
    <>
      <label htmlFor={props.key} key={props.key}>
        {props.label}
      </label>
      <select onChange={props.handleChange}>
        {props.items.map((item: any) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </>
  );
};

export default DropDown;
