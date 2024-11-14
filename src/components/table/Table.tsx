import { User } from "../../DataTypes";

interface Props {
    users: User[];
    background: boolean;
    deleteUser: (email: string) => void;
}

const Table = ({ users, background, deleteUser } : Props) => {
    const customStyle = (background: boolean, index: number) => {
        if (!background) return 'transparent'
        return index % 2 === 0 ? '#333' : '#555'
    }

    const renderRows = () => {
        return users.map((user, index) => {
            const rowBackground = customStyle(background, index)

            return (
                <tr key={user.email} style={{ backgroundColor: rowBackground }}>
                    <td><img src={user.picture.thumbnail} alt={`${user.name.first}'s thumbnail`} /></td>
                    <td>{user.name.first}</td>
                    <td>{user.name.last}</td>
                    <td>{user.location.country}</td>
                    <td>
                        <button onClick={() => deleteUser(user.email)} aria-label={`Delete ${user.name.first}`}>
                            Borrar
                        </button>
                    </td>
                </tr>
            )
        })
    }

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
            <tbody>{renderRows()}</tbody>
        </table>
    )
}

export default Table