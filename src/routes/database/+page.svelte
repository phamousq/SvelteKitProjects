<script lang="ts">
    export let data;
</script>

<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Date</th>
        </tr>
    </thead>
    <tbody>
        {#each data.records as record}
            <tr>
                <td>{record.id}</td>
                <td>{new Date(record.Datetime).toLocaleString()}</td>
            </tr>
        {/each}
    </tbody>
</table>