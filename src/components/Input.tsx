const Input = (props: any) => {
  return (
    <>
      <label htmlFor={props.label}>{props.label}</label>
      <input
        key={props.label}
        value={props.value}
        onChange={props.onChange}
        type={props.type ? props.type : "number"}
      ></input>
    </>
  );
};

export default Input;
