const Form = (props: any) => {
  return (
    <>
      <form onSubmit={props.onSubmit}>{props.children}</form>
      <button type="submit">Accept Changes</button>
    </>
  );
};

export default Form;
