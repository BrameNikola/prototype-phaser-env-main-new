const Form = (props: any) => {
  return (
    <form onSubmit={props.onSubmit}>
      {props.children}
      <button type="submit">Accept Changes</button>
    </form>
  );
};

export default Form;
