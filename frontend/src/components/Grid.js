import React from "react";
import styled from "styled-components";
import { FaTrash, FaEdit} from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const Table = styled.table`
    width: 100%;
    background-color: #2D3748;
    padding: 20px;
    box-shadow: 0px 0px 5px #2D3748;
    border-radius: 5px;
    max-width: 800px;
    margin: 20px auto;
    word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;
export const Tr = styled.tr``;

export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px; 
`;

export const Td  = styled.td`
    padding-top: 15px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width : "auto")};
`;


const Grid = ({ users, setUsers, setOnEdit }) => {

    const handleDelete = async (id) => {
        console.log(id);
        await axios.delete("http://localhost:5000/" + id)
            .then(({data}) => {
                const newArray = users.filter((user) => user.id !== id);

                setUsers(newArray);
                toast.success(data);

            })
            .catch(({ data }) => toast.error(data));

        setOnEdit(null);
    }

    const handleEdit = (item) => {
        setOnEdit(item);
    }
    return(
        <Table>
            <Thead>
                <Tr>
                    <Th>Nome</Th>
                    <Th>Sobrenome</Th>
                    <Th>E-mail</Th>
                    <Th>Data de nascimento</Th>
                    
                </Tr>
            </Thead>
            <Tbody>
                {
                    users.map((item, i) => (
                        <Tr key={i}>
                            <Td width="20%">{item.name}</Td>
                            <Td width="25%">{item.lastname}</Td>
                            <Td width="25%">{item.email}</Td>
                            <Td width="24%">{item.date}</Td>

                            <Td alignCenter width="7%">
                                <FaEdit onClick={() => handleEdit(item)}/>
                            </Td>

                            <Td alignCenter width="7%">
                                <FaTrash onClick={() => handleDelete(item.id)} />
                            </Td>
                        </Tr>
                    ))
                }
            </Tbody>
        </Table>
    );
};

export default Grid;