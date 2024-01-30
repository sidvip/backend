export default function History({ data }) {

    return (
        <table style={{ marginTop: '40px', width: '100%' }}>
            <th style={{ textAlign: 'center' }}>
                <td>URL</td>
            </th>
            {
                data?.length === 0 ? <>Your history is empty</> :
                    data?.map(({ url }, id) => (
                        <tr style={{ background: 'black', color: 'white', height: '40px' }} key={id}>
                            <td>{url}</td>
                        </tr>
                    ))
            }
        </table>
    )
}