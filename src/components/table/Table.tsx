import { User } from "../../DataTypes";

interface Props {
    users: User[];
    background: boolean;
    deleteUser: (email: string) => void;
}

const Table = ({ users, background, deleteUser } : Props) => {
    return (
        <table width='100%'>
            <thead>
                <tr>
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Pais</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => {
                    const style = index % 2 == 0 ? '#333' : '#555'
                    const backgroundColor = background ? style : 'transparent'


                    return(
                        <tr key={user.email} style={{backgroundColor: backgroundColor}}>
                            <td><img src={user.picture.thumbnail} alt="user" /></td>
                            <td>{user.name.first}</td>
                            <td>{user.name.last}</td>
                            <td>{user.location.country}</td>
                            <td><button onClick={() => {deleteUser(user.email)}}>Borrar</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table;
