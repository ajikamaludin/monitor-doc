<style>
    table {
        border-collapse: collapse;
    }
    table, th, td {
        border: 1px solid;
    }
    th, td {
        padding: 5px;
    }
    .header {
        width: 100%;
        margin: auto;
        text-align: center;
    }
</style>
<div class="header">
    <h1>Dokumen Monitoring</h1>
</div>
<table>
    <thead>
        <tr>
            <th >group</th>
            <th >region</th>
            <th >nama perusahaan</th>
            <th >jenis</th>
            <th >kategori</th>
            <th >no</th>
            <th >nama</th>
            <th >penerbit</th>
            <th >tipe</th>
            <th >tanggal terbit</th>
            <th >tanggal jatuh tempo</th>
            <th >keterangan</th>
            <th >file</th>
            <th >status</th>
            <th >catatan</th>
        </tr>
    </thead>
    <tbody>
        @foreach($collections as $collec)
        <tr>
            <td >{{ $collec["group"] }}</td>
            <td >{{ $collec["region"] }}</td>
            <td >{{ $collec["nama perusahaan"] }}</td>
            <td >{{ $collec["jenis"] }}</td>
            <td >{{ $collec["kategori"] }}</td>
            <td >{{ $collec["no"] }}</td>
            <td >{{ $collec["nama"] }}</td>
            <td >{{ $collec["penerbit"] }}</td>
            <td >{{ $collec["tipe"] }}</td>
            <td style="width: 7%;">{{ $collec["tanggal terbit"] }}</td>
            <td style="width: 7%;">{{ $collec["tanggal jatuh tempo"] }}</td>
            <td >{{ $collec["keterangan"] }}</td>
            <td >
                @if($collec["file"] != null)
                <a href='{{ $collec["file"] }}'>Download</a>
                @else 
                Belum ada file
                @endif
            </td>
            <td >{{ $collec["status"] }}</td>
            <td >{{ $collec["catatan"] }}</td>
        </tr>
        @endforeach
    </tbody>
</table>
<script>
    window.print()
</script>