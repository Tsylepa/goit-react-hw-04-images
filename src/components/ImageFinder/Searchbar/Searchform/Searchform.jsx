import { Form, Button, Label, Input } from './Searchform.styled';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';

const Searchform = ({ onSearch }) => {
  function search(e) {
    e.preventDefault();
    onSearch(e.target.query.value);
  }

  return (
    <Form onSubmit={search}>
      <Button type="submit">
        <Label>
          <BsSearch />
        </Label>
      </Button>

      <Input
        type="text"
        autocomplete="off"
        autoFocus
        placeholder="Search images and photos"
        name="query"
      />
    </Form>
  );
};

Searchform.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Searchform;
