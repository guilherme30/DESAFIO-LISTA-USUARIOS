import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #2D3748;
  padding: 20px;
  box-shadow: 0px 0px 5px ##2D3748;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2D3796;
  color: #fff;
  height: 42px;
`;

const Form = ({onEdit, setOnEdit, getUsers}) => {
  const ref = useRef()

  useEffect(() => {
    if(onEdit) {
      const user = ref.current;

      user.name.value = onEdit.name;
      user.lastname.value = onEdit.lastname;
      user.email.value = onEdit.email;
      user.date.value = onEdit.date;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if(
      !user.name?.value ||
      !user.lastname?.value ||
      !user.email?.value ||
      !user.date?.value
    ) {
      return toast.warn("PREENCHA TODOS OS CAMPOS, POR FAVOR!");
    }

    if (onEdit) {
      await axios.put("http://localhost:5000/" + onEdit.id, {
          name: user.name.value,
          lastname: user.lastname.value,
          email: user.email.value,
          date: user.date.value,
        })
        .then(({data}) => toast.success(data))
        .catch(({data}) => toast.error(data))
    } else {
      await axios.post("http://localhost:5000", {
          name: user.name.value,
          lastname: user.lastname.value,
          email: user.email.value,
          date: user.date.value,
        })
        .then(({data}) => toast.success(data))
        .catch(({data}) => toast.error(data))
    };

      user.name.value = "";
      user.lastname.value = "";
      user.email.value = "";
      user.date.value = "";

      setOnEdit(null);
      getUsers();
    };

  return (
    <FormContainer ref = {ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="name"/>
      </InputArea>

      <InputArea>
        <Label>Sobrenome</Label>
        <Input name="lastname"/>
      </InputArea>

      <InputArea>
        <Label>E-mail</Label>
        <Input name="email" type="email"/>
      </InputArea>

      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input name="date" type="date"/>
      </InputArea>

      <Button type="submit">Cadastrar Usuário</Button>

    </FormContainer>
  );
};

export default Form;