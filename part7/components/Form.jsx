import { useField } from '../hooks/formHook';

const Form = () => {
  const name = useField('name');
  const date = useField('bday');
  const height = useField('height');

  return (
    <div>
      <form>
        name:
        <input {...name} />
        <br />
        birthdate:
        <input {...date} />
        <br />
        height:
        <input {...height} />
      </form>
      <div>
        {name.value} {date.value} {height.value}
      </div>
    </div>
  );
};

export default Form;
